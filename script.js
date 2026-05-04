// ===== SLIDER =====
let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const counter = document.getElementById('currentSlide');
const slidesContainer = document.querySelector('.slides');
let ytPlaying = false;

function goToSlide(i) {
  currentIndex = i;
  slidesContainer.style.transform = `translateX(-${i * 100}%)`;
  dots.forEach((d, idx) => d.classList.toggle('active', idx === i));
  counter.textContent = i + 1;
  // pause YouTube if leaving video slide
  if (i !== 0) {
    ytPlaying = false;
  }
}

dots.forEach(d => d.addEventListener('click', () => goToSlide(+d.dataset.index)));

// Touch swipe
let startX = 0;
const sliderEl = document.querySelector('.hero-slider');
sliderEl.addEventListener('touchstart', e => { startX = e.touches[0].clientX; });
sliderEl.addEventListener('touchend', e => {
  const diff = startX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 40) {
    if (diff > 0 && currentIndex < slides.length - 1) goToSlide(currentIndex + 1);
    else if (diff < 0 && currentIndex > 0) goToSlide(currentIndex - 1);
  }
});

// Auto slide (skip when YouTube is playing)
setInterval(() => {
  if (ytPlaying) return;
  goToSlide(currentIndex < slides.length - 1 ? currentIndex + 1 : 0);
}, 5000);

// ===== YOUTUBE LAZY EMBED =====
const ytLazy = document.getElementById('ytLazy');
const playBtn = document.getElementById('playBtn');

function loadYouTube() {
  if (!ytLazy) return;
  // Don't load again if already loaded
  if (ytLazy.querySelector('iframe')) { ytPlaying = true; return; }
  const videoId = ytLazy.dataset.id;
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
  iframe.allowFullscreen = true;
  ytLazy.appendChild(iframe);
  playBtn.classList.add('playing');
  ytLazy.querySelector('.yt-poster').style.display = 'none';
  ytPlaying = true;
}

if (playBtn && ytLazy) {
  playBtn.addEventListener('click', loadYouTube);
  ytLazy.querySelector('.yt-poster').addEventListener('click', loadYouTube);
}

function playDemo() {
  goToSlide(0);
  window.scrollTo({ top: 0, behavior: 'smooth' });
  setTimeout(() => { loadYouTube(); }, 500);
}

// ===== FLASH SALE COUNTDOWN =====
function updateCountdown() {
  const now = new Date();
  // End time = midnight tonight (Vietnam time)
  const end = new Date(now);
  end.setHours(23, 59, 59, 0);
  
  const diff = end - now;
  if (diff <= 0) return;

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((diff % (1000 * 60)) / 1000);

  const cdH = document.getElementById('cdHours');
  const cdM = document.getElementById('cdMins');
  const cdS = document.getElementById('cdSecs');
  if (cdH) cdH.textContent = String(hours).padStart(2, '0');
  if (cdM) cdM.textContent = String(mins).padStart(2, '0');
  if (cdS) cdS.textContent = String(secs).padStart(2, '0');
}

// Sold percentage: consistent per day, changes daily (82-92%)
function initFlashSold() {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const pct = 82 + (seed % 11); // 82-92%
  const el = document.getElementById('flashSold');
  const bar = document.getElementById('flashProgress');
  if (el) el.textContent = pct;
  if (bar) bar.style.width = pct + '%';
}

updateCountdown();
setInterval(updateCountdown, 1000);
initFlashSold();

// ===== MODAL =====
let selectedPackage = '';
let customerName = '';
let customerPhone = '';

function openModal() {
  document.getElementById('modalOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
  showStep('step1');
  // FB Pixel: khách mở modal xem sản phẩm
  if (typeof fbq !== 'undefined') fbq('track', 'ViewContent', { content_name: 'Mở modal chọn gói' });
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('active');
  document.body.style.overflow = '';
}

function showStep(id) {
  document.querySelectorAll('.modal-step').forEach(s => s.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
  // Reset checkbox & zalo btn when going back to QR step
  if (id === 'step3') {
    const cb = document.getElementById('confirmPaid');
    if (cb) {
      cb.checked = false;
      toggleZaloBtn();
    }
  }
}

function selectPackage(pkg) {
  selectedPackage = pkg;
  document.getElementById('selectedPkg').textContent = '📦 ' + pkg;
  showStep('step2');
}

function goBack() { showStep('step1'); }

// Toggle Zalo button based on payment confirmation checkbox
function toggleZaloBtn() {
  const cb = document.getElementById('confirmPaid');
  const btn = document.getElementById('zaloPaymentBtn');
  const hint = document.getElementById('zaloUnlockHint');
  if (!cb || !btn) return;

  if (cb.checked) {
    // Build Zalo link with customer info
    const msg = `Xin chào, mình là ${customerName} (SĐT: ${customerPhone}). Mình vừa chuyển khoản đơn hàng: ${selectedPackage}. Mình gửi ảnh xác nhận thanh toán ạ.`;
    btn.href = 'https://zalo.me/0528786710';
    btn.target = '_blank';
    btn.onclick = null;
    btn.classList.remove('qr-zalo-btn-disabled');
    btn.innerHTML = '<i class="fas fa-comment-dots"></i> Gửi ảnh CK qua Zalo — Nhận FILE tài liệu ngay';
    if (hint) hint.style.display = 'none';

    // FB Pixel: khách xác nhận đã thanh toán
    if (typeof fbq !== 'undefined') {
      const priceMatch = selectedPackage.match(/(\d+)K/);
      const val = priceMatch ? parseInt(priceMatch[1]) * 1000 : 0;
      fbq('track', 'Purchase', { content_name: selectedPackage, value: val, currency: 'VND' });
    }
  } else {
    btn.removeAttribute('href');
    btn.removeAttribute('target');
    btn.onclick = function() { return false; };
    btn.classList.add('qr-zalo-btn-disabled');
    btn.innerHTML = '<i class="fas fa-lock"></i> Vui lòng xác nhận đã thanh toán ở trên';
    if (hint) hint.style.display = '';
  }
}

// ===== FORM SUBMIT =====
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyuK1o1PdjrfvhJwutbSzn7y3-TVP4qWl8tDvgKALnJyCyaNlTHWCh8SJM2kGgWVeY/exec';

// Package → QR data mapping
const PACKAGE_DATA = {
  'Cấu trúc + Luyện dịch - 69K':       { amount: 69000,  content: 'tai lieu tieng trung 1' },
  'Từ vựng HSK1-HSK6 - 39K':            { amount: 39000,  content: 'tai lieu tieng trung 2' },
  'Luyện gõ Hán tự HSK1-HSK3 - 39K':    { amount: 39000,  content: 'tai lieu tieng trung 3' },
  '1200 câu giao tiếp + Video - 99K':   { amount: 99000,  content: 'tai lieu tieng trung 4' },
  '60 bộ thủ chữ Hán - 39K':            { amount: 39000,  content: 'tai lieu tieng trung 5' },
  'Full trọn bộ - 199K':                { amount: 199000, content: 'tai lieu tieng trung 6' }
};

function generateQR(pkg) {
  const data = PACKAGE_DATA[pkg];
  if (!data) return;

  const bankId = 'TCB';
  const accountNo = '19032738533021';
  const template = 'compact2';
  const qrUrl = `https://img.vietqr.io/image/${bankId}-${accountNo}-${template}.png?amount=${data.amount}&addInfo=${encodeURIComponent(data.content)}&accountName=${encodeURIComponent('PHAM NGOC TRAI')}`;

  document.getElementById('qrImage').src = qrUrl;
  document.getElementById('qrAmount').textContent = data.amount.toLocaleString('vi-VN') + '₫';
  document.getElementById('qrContent').textContent = data.content;
  document.getElementById('qrPkgInfo').textContent = '📦 ' + pkg;
}

function downloadQR() {
  const img = document.getElementById('qrImage');
  const link = document.createElement('a');
  link.href = img.src;
  link.download = 'QR_thanhtoan.png';
  link.target = '_blank';
  // On mobile, open in new tab so user can long-press to save
  window.open(img.src, '_blank');
}

function copyText(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert('Đã sao chép: ' + text);
  });
}

function copyTransferContent() {
  const content = document.getElementById('qrContent').textContent;
  navigator.clipboard.writeText(content).then(() => {
    alert('Đã sao chép nội dung CK: ' + content);
  });
}

async function submitOrder(e) {
  e.preventDefault();
  const name = document.getElementById('fullName').value.trim();
  const phone = document.getElementById('phone').value.trim();
  if (!name || !phone) return alert('Vui lòng nhập đầy đủ thông tin!');

  // Save customer info for Zalo message
  customerName = name;
  customerPhone = phone;

  const btn = document.getElementById('submitBtn');
  btn.disabled = true;
  document.getElementById('btnText').classList.add('hidden');
  document.getElementById('btnLoading').classList.remove('hidden');

  const now = new Date();
  const timestamp = now.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });

  try {
    const payload = {
      submittedAt: timestamp,
      name: name,
      phone: phone,
      package: selectedPackage,
      source: 'landing-tieng-trung-v2'
    };

    fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    // FB Pixel: khách điền form = Lead + Hoàn tất đăng ký
    if (typeof fbq !== 'undefined') {
      const priceMatch = selectedPackage.match(/(\d+)K/);
      const value = priceMatch ? parseInt(priceMatch[1]) * 1000 : 0;
      fbq('track', 'Lead', { content_name: selectedPackage, value: value, currency: 'VND' });
      fbq('track', 'CompleteRegistration', { content_name: selectedPackage, value: value, currency: 'VND' });
    }

    await new Promise(r => setTimeout(r, 1000));

    // Show QR payment step
    generateQR(selectedPackage);
    showStep('step3');

    // FB Pixel: khách thấy QR = sẵn sàng thanh toán
    if (typeof fbq !== 'undefined') {
      const priceMatch2 = selectedPackage.match(/(\d+)K/);
      const val2 = priceMatch2 ? parseInt(priceMatch2[1]) * 1000 : 0;
      fbq('track', 'InitiateCheckout', { content_name: selectedPackage, value: val2, currency: 'VND' });
    }

    // Reset button
    btn.disabled = false;
    document.getElementById('btnText').classList.remove('hidden');
    document.getElementById('btnLoading').classList.add('hidden');

  } catch (err) {
    console.error(err);
    generateQR(selectedPackage);
    showStep('step3');
    btn.disabled = false;
    document.getElementById('btnText').classList.remove('hidden');
    document.getElementById('btnLoading').classList.add('hidden');
  }
}

// ===== LIGHTBOX =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCounter = document.getElementById('lightboxCounter');
let lbImages = [];
let lbIndex = 0;

function openLightbox(imgEl) {
  // Get all images in the same group
  const parent = imgEl.closest('.catalog-preview, .review-slider, .qr-proof-scroll');
  if (!parent) return;
  lbImages = Array.from(parent.querySelectorAll('img')).map(img => img.src);
  lbIndex = lbImages.indexOf(imgEl.src);
  if (lbIndex === -1) lbIndex = 0;
  showLightboxImage();
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function showLightboxImage() {
  lightboxImg.src = lbImages[lbIndex];
  lightboxCounter.textContent = (lbIndex + 1) + ' / ' + lbImages.length;
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
document.getElementById('lightboxPrev').addEventListener('click', () => {
  lbIndex = (lbIndex - 1 + lbImages.length) % lbImages.length;
  showLightboxImage();
});
document.getElementById('lightboxNext').addEventListener('click', () => {
  lbIndex = (lbIndex + 1) % lbImages.length;
  showLightboxImage();
});

// Close on background click
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox || e.target.id === 'lightboxWrap') closeLightbox();
});

// Swipe support for lightbox
let lbStartX = 0;
const lbWrap = document.getElementById('lightboxWrap');
lbWrap.addEventListener('touchstart', e => { lbStartX = e.touches[0].clientX; });
lbWrap.addEventListener('touchend', e => {
  const diff = lbStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) {
    if (diff > 0) { lbIndex = (lbIndex + 1) % lbImages.length; }
    else { lbIndex = (lbIndex - 1 + lbImages.length) % lbImages.length; }
    showLightboxImage();
  }
});

// Attach click events to all catalog preview images
document.querySelectorAll('.catalog-preview img').forEach(img => {
  img.addEventListener('click', () => openLightbox(img));
});

// ===== SOCIAL PROOF TOAST =====
const PROOF_DATA = [
  { name: 'Nguyễn *** Minh', pkg: 'Full trọn bộ', letter: 'N' },
  { name: 'Trần *** Hương', pkg: 'Full trọn bộ', letter: 'T' },
  { name: 'Lê *** Dũng', pkg: 'Cấu trúc + Luyện dịch', letter: 'L' },
  { name: 'Phạm *** Thảo', pkg: 'Full trọn bộ', letter: 'P' },
  { name: 'Hoàng *** Anh', pkg: '1200 câu giao tiếp', letter: 'H' },
  { name: 'Vũ *** Hải', pkg: 'Full trọn bộ', letter: 'V' },
  { name: 'Đỗ *** Linh', pkg: 'Từ vựng HSK1-HSK6', letter: 'Đ' },
  { name: 'Bùi *** Trang', pkg: 'Full trọn bộ', letter: 'B' },
  { name: 'Nguyễn *** Thắng', pkg: 'Luyện gõ Hán tự', letter: 'N' },
  { name: 'Trần *** Yến', pkg: '1200 câu giao tiếp', letter: 'T' },
  { name: 'Lý *** Quân', pkg: 'Full trọn bộ', letter: 'L' },
  { name: 'Phan *** Mai', pkg: '60 bộ thủ chữ Hán', letter: 'P' },
  { name: 'Đặng *** Huy', pkg: 'Cấu trúc + Luyện dịch', letter: 'Đ' },
  { name: 'Võ *** Ngọc', pkg: 'Full trọn bộ', letter: 'V' },
  { name: 'Đinh *** Nam', pkg: 'Từ vựng HSK1-HSK6', letter: 'Đ' },
];

const PHONE_PREFIXES = ['096', '097', '098', '086', '032', '033', '034', '035', '036', '037', '038', '039', '070', '079', '077', '076', '078', '089', '090', '093', '088'];

let toastTimeout;
let proofIndex = 0;
let toastPaused = false;

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Shuffle on load so it's different each session
shuffleArray(PROOF_DATA);

function showToast() {
  if (toastPaused) return;
  const toast = document.getElementById('socialProofToast');
  if (!toast) return;

  const data = PROOF_DATA[proofIndex % PROOF_DATA.length];
  const prefix = PHONE_PREFIXES[Math.floor(Math.random() * PHONE_PREFIXES.length)];
  const last2 = String(Math.floor(Math.random() * 100)).padStart(2, '0');
  const maskedPhone = prefix + '*****' + last2;
  const minutes = Math.floor(Math.random() * 15) + 1;

  document.getElementById('toastAvatar').textContent = data.letter;
  document.getElementById('toastName').textContent = data.name + ' — ' + maskedPhone;
  document.getElementById('toastPkg').innerHTML = 'vừa mua <strong>' + data.pkg + '</strong>';
  document.getElementById('toastTime').textContent = minutes + ' phút trước';

  toast.classList.add('show');
  proofIndex++;

  // Auto hide after 5s
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 5000);
}

function closeToast() {
  const toast = document.getElementById('socialProofToast');
  if (toast) toast.classList.remove('show');
  clearTimeout(toastTimeout);
}

// Start showing toasts after 8s, then every 15-25s
setTimeout(() => {
  showToast();
  setInterval(() => {
    const delay = Math.floor(Math.random() * 10000) + 15000; // 15-25s
    setTimeout(showToast, delay % 10000);
  }, 20000);
}, 8000);

// Pause toasts when modal is open
const origOpenModal = openModal;
openModal = function() {
  toastPaused = true;
  closeToast();
  origOpenModal();
};
const origCloseModal = closeModal;
closeModal = function() {
  toastPaused = false;
  origCloseModal();
};
