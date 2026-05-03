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

// ===== MODAL =====
let selectedPackage = '';

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
}

function selectPackage(pkg) {
  selectedPackage = pkg;
  document.getElementById('selectedPkg').textContent = '📦 ' + pkg;
  showStep('step2');
}

function goBack() { showStep('step1'); }

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
  // Get all images in the same .catalog-preview group
  const parent = imgEl.closest('.catalog-preview');
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
