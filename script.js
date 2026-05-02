// ===== SLIDER =====
let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const counter = document.getElementById('currentSlide');
const slidesContainer = document.querySelector('.slides');

function goToSlide(i) {
  currentIndex = i;
  slidesContainer.style.transform = `translateX(-${i * 100}%)`;
  dots.forEach((d, idx) => d.classList.toggle('active', idx === i));
  counter.textContent = i + 1;
  // pause video if not on video slide
  const video = document.getElementById('heroVideo');
  if (i !== 0 && video) { video.pause(); document.getElementById('playBtn').classList.remove('playing'); }
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

// Auto slide (skip video slide)
setInterval(() => {
  const video = document.getElementById('heroVideo');
  if (video && !video.paused) return;
  goToSlide(currentIndex < slides.length - 1 ? currentIndex + 1 : 0);
}, 5000);

// ===== VIDEO =====
const playBtn = document.getElementById('playBtn');
const heroVideo = document.getElementById('heroVideo');
if (playBtn && heroVideo) {
  playBtn.addEventListener('click', () => {
    if (heroVideo.paused) { heroVideo.play(); playBtn.classList.add('playing'); }
    else { heroVideo.pause(); playBtn.classList.remove('playing'); }
  });
  heroVideo.addEventListener('click', () => {
    heroVideo.pause(); playBtn.classList.remove('playing');
  });
  heroVideo.addEventListener('ended', () => { playBtn.classList.remove('playing'); });
}

function playDemo() {
  goToSlide(0);
  window.scrollTo({ top: 0, behavior: 'smooth' });
  setTimeout(() => { if (heroVideo) { heroVideo.play(); playBtn.classList.add('playing'); } }, 500);
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

    // FB Pixel: khách điền form = Lead
    if (typeof fbq !== 'undefined') {
      const priceMatch = selectedPackage.match(/(\d+)K/);
      const value = priceMatch ? parseInt(priceMatch[1]) * 1000 : 0;
      fbq('track', 'Lead', { content_name: selectedPackage, value: value, currency: 'VND' });
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
