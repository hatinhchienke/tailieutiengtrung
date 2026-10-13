/*!
 * ===== LDP TRACKING (dùng chung cho mọi trang) =====
 * - Bắt tham số tracking trên URL (utm_*, campaign_id, id_campaign, fbclid, ttclid, ...)
 * - Lưu vào localStorage + Cookie (hạn 30 ngày) để không mất khi khách chuyển trang,
 *   mở tab mới hoặc quay lại sau.
 * - CHỈ ghi đè khi URL có tham số tracking mới. URL không có tham số => giữ nguyên dữ liệu cũ.
 * - Khi submit form: ưu tiên URL hiện tại -> dữ liệu đã lưu -> cuối cùng mới là "organic".
 *
 * API:  window.LDPTracking.getData()  -> object tracking để gắn vào payload
 *       window.LDPTracking.clear()    -> xóa dữ liệu đã lưu (dùng khi test)
 */
(function (window, document) {
  'use strict';

  var STORAGE_KEY = 'ldp_tracking_v1';
  var COOKIE_KEY = 'ldp_trk';
  var TTL_DAYS = 30; // >= 7 ngày theo yêu cầu
  var TTL_MS = TTL_DAYS * 24 * 60 * 60 * 1000;

  // Các tham số được coi là "tracking" (có 1 trong số này trên URL => ghi đè dữ liệu cũ)
  var TRACKING_KEYS = [
    'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'utm_id',
    'campaign_id', 'id_campaign', 'adset_id', 'ad_id',
    'fbclid', 'ttclid', 'gclid'
  ];

  function safeGetParams(search) {
    try { return new URLSearchParams(search || window.location.search); }
    catch (e) { return null; }
  }

  // Đọc toàn bộ tham số tracking từ URL. Trả về null nếu URL không có tham số tracking nào.
  function readFromUrl() {
    var params = safeGetParams();
    if (!params) return null;
    var data = {}, found = false;
    for (var i = 0; i < TRACKING_KEYS.length; i++) {
      var k = TRACKING_KEYS[i];
      var v = params.get(k);
      if (v && String(v).trim()) {
        data[k] = String(v).trim().slice(0, 500);
        found = true;
      }
    }
    return found ? data : null;
  }

  // ---------- Storage helpers (localStorage + cookie fallback) ----------
  function getCookieDomain() {
    var host = window.location.hostname || '';
    // Chia sẻ giữa tailieutiengtrung.com và www.tailieutiengtrung.com
    if (/(^|\.)tailieutiengtrung\.com$/i.test(host)) return '; domain=.tailieutiengtrung.com';
    return '';
  }

  function writeCookie(value) {
    try {
      var expires = new Date(Date.now() + TTL_MS).toUTCString();
      document.cookie = COOKIE_KEY + '=' + encodeURIComponent(value) +
        '; expires=' + expires + '; path=/' + getCookieDomain() + '; SameSite=Lax';
    } catch (e) { /* ignore */ }
  }

  function readCookie() {
    try {
      var parts = document.cookie ? document.cookie.split('; ') : [];
      for (var i = 0; i < parts.length; i++) {
        var idx = parts[i].indexOf('=');
        if (parts[i].slice(0, idx) === COOKIE_KEY) return decodeURIComponent(parts[i].slice(idx + 1));
      }
    } catch (e) { /* ignore */ }
    return null;
  }

  function deleteCookie() {
    try {
      document.cookie = COOKIE_KEY + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/' + getCookieDomain();
      document.cookie = COOKIE_KEY + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    } catch (e) { /* ignore */ }
  }

  function save(data) {
    var record = {
      data: data,
      savedAt: Date.now(),
      landing_page: (window.location.pathname || '') + (window.location.search || ''),
      referrer: document.referrer || ''
    };
    var json = JSON.stringify(record);
    try { window.localStorage.setItem(STORAGE_KEY, json); } catch (e) { /* ignore */ }
    writeCookie(json);
  }

  function parseRecord(raw) {
    if (!raw) return null;
    try {
      var rec = JSON.parse(raw);
      if (!rec || !rec.data || typeof rec.data !== 'object') return null;
      if (rec.savedAt && (Date.now() - rec.savedAt) > TTL_MS) return null; // hết hạn
      return rec;
    } catch (e) { return null; }
  }

  function load() {
    var rec = null;
    try { rec = parseRecord(window.localStorage.getItem(STORAGE_KEY)); } catch (e) { /* ignore */ }
    if (!rec) {
      rec = parseRecord(readCookie());
      // Khôi phục lại localStorage nếu chỉ còn cookie
      if (rec) { try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(rec)); } catch (e) { /* ignore */ } }
    }
    return rec;
  }

  function clear() {
    try { window.localStorage.removeItem(STORAGE_KEY); } catch (e) { /* ignore */ }
    deleteCookie();
  }

  // ---------- Chuẩn hóa dữ liệu gửi về Google Sheet ----------
  function inferSource(d) {
    if (d.utm_source) return d.utm_source;
    if (d.fbclid) return 'facebook';
    if (d.ttclid) return 'tiktok';
    if (d.gclid) return 'google';
    if (d.campaign_id || d.id_campaign || d.utm_id || d.adset_id || d.ad_id) return 'ads';
    return '';
  }

  function normalize(raw, origin, rec) {
    raw = raw || {};
    var campaignId = raw.campaign_id || raw.id_campaign || raw.utm_id || '';
    var source = inferSource(raw);
    return {
      utm_source: source || 'organic',
      utm_medium: raw.utm_medium || '',
      // Nếu link chỉ có campaign_id (không có utm_campaign) thì vẫn hiển thị ở cột "Chiến dịch"
      utm_campaign: raw.utm_campaign || campaignId || '',
      utm_content: raw.utm_content || '',
      utm_term: raw.utm_term || '',
      campaign_id: campaignId,
      adset_id: raw.adset_id || '',
      ad_id: raw.ad_id || '',
      fbclid: raw.fbclid || '',
      ttclid: raw.ttclid || '',
      gclid: raw.gclid || '',
      tracking_origin: origin, // 'url' | 'storage' | 'none'
      landing_page: rec && rec.landing_page ? rec.landing_page : '',
      first_referrer: rec && rec.referrer ? rec.referrer : '',
      tracked_at: rec && rec.savedAt ? new Date(rec.savedAt).toISOString() : ''
    };
  }

  // Lấy dữ liệu tracking khi submit: URL hiện tại -> storage -> organic
  function getData() {
    var fromUrl = readFromUrl();
    if (fromUrl) {
      return normalize(fromUrl, 'url', {
        landing_page: (window.location.pathname || '') + (window.location.search || ''),
        referrer: document.referrer || '',
        savedAt: Date.now()
      });
    }
    var rec = load();
    if (rec) return normalize(rec.data, 'storage', rec);
    return normalize({}, 'none', null);
  }

  // ---------- Chạy ngay khi trang load ----------
  var initial = readFromUrl();
  if (initial) save(initial); // Chỉ ghi đè khi URL có tham số tracking mới

  window.LDPTracking = { getData: getData, clear: clear, keys: TRACKING_KEYS.slice() };
})(window, document);
