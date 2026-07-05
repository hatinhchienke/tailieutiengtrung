// ===== HƯỚNG DẪN SETUP GOOGLE APPS SCRIPT (CẬP NHẬT - THÊM UTM TRACKING) =====
// 
// Bước 1: Mở Google Sheet: https://docs.google.com/spreadsheets/d/1D4aOiSAufIZVgSd1_Nv9sJQSErUaGJeKOf6hXoEexig/edit?gid=0#gid=0
// Bước 2: Vào menu Extensions > Apps Script
// Bước 3: Xóa hết code cũ, paste đoạn code dưới đây:
//
// ====== BẮT ĐẦU CODE APPS SCRIPT ======

function doPost(e) {
  try {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  
  // 1. Lưu vào Sheet (thêm 3 cột UTM ở cuối)
  sheet.appendRow([
    data.submittedAt,
    data.name,
    data.phone,
    data.package,
    data.type || 'file',
    data.address || '',
    data.source,
    data.utm_source || 'organic',     // facebook, tiktok, hoặc organic
    data.utm_medium || '',            // cpc, cpm, social...
    data.utm_campaign || ''           // tên chiến dịch ads
  ]);
  
  // 2. Gửi email thông báo (HTML)
  var isBook = data.type === 'book';
  var utmLabel = data.utm_source || 'organic';
  var subject = (isBook ? '📚' : '📄') + ' Đơn hàng mới - ' + data.name + ' [' + utmLabel + ']';
  var zaloLink = 'https://zalo.me/' + data.phone;
  
  var htmlBody = '<div style="font-family:Arial,sans-serif;max-width:500px">'
    + '<h3>📦 ĐƠN HÀNG MỚI TỪ LANDING PAGE</h3>'
    + '<hr>'
    + '<p>📋 Loại: <strong>' + (isBook ? '📚 Sách giấy' : '📄 File số') + '</strong></p>'
    + '<p>👤 Họ tên: <strong>' + data.name + '</strong></p>'
    + '<p>📞 SĐT/Zalo: <strong>' + data.phone + '</strong></p>'
    + '<p>📦 Gói: <strong>' + data.package + '</strong></p>'
    + (data.address ? '<p>🏠 Địa chỉ: <strong>' + data.address + '</strong></p>' : '')
    + '<p>🕐 Thời gian: ' + data.submittedAt + '</p>'
    + '<p>🌐 Nguồn: ' + data.source + '</p>'
    + '<p>📢 Nguồn QC: <strong style="color:#e65100;">' + utmLabel + '</strong>'
    + (data.utm_campaign ? ' — Chiến dịch: ' + data.utm_campaign : '') + '</p>'
    + '<hr>'
    + '<p>Liên hệ khách ngay qua Zalo: <a href="' + zaloLink + '">' + zaloLink + '</a></p>'
    + '</div>';
  
  MailApp.sendEmail({
    to: 'ngoctrainh@gmail.com',
    subject: subject,
    htmlBody: htmlBody
  });
  
  return ContentService.createTextOutput(JSON.stringify({status: 'success'}))
    .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    // Log lỗi vào Sheet để debug
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.appendRow([new Date().toLocaleString('vi-VN'), 'ERROR', err.message, e.postData ? e.postData.contents : 'no postData', e.postData ? e.postData.type : 'no type']);
    return ContentService.createTextOutput(JSON.stringify({status: 'error', message: err.message}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ====== KẾT THÚC CODE APPS SCRIPT ======
//
// Bước 4: Bấm Deploy > Manage deployments > Chỉnh sửa (icon bút chì)
// Bước 5: Chọn Version = New version
// Bước 6: Bấm Deploy
//
// ===== CẬP NHẬT HEADER GOOGLE SHEET =====
// Thêm 3 cột mới vào cuối hàng header (sau cột "source"):
//
//   ... | source | Nguồn QC | Kênh QC | Chiến dịch
//
// ===== CÁCH ĐẶT LINK ADS =====
// 
// Facebook Ads:
//   https://tailieutiengtrung.com/sp/tron-bo?utm_source=facebook&utm_medium=cpc&utm_campaign=ten_chien_dich
//
// TikTok Ads:
//   https://tailieutiengtrung.com/sp/tron-bo?utm_source=tiktok&utm_medium=cpc&utm_campaign=ten_chien_dich
//
// View tự nhiên (không cần thêm gì):
//   https://tailieutiengtrung.com/sp/tron-bo
//   → Tự động ghi "organic" vào cột Nguồn QC
