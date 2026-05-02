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
  const source = 'landing-tieng-trung-v2';

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

    if (typeof fbq !== 'undefined') {
      fbq('track', 'CompleteRegistration', { content_name: selectedPackage, value: selectedPackage.includes('199') ? 199000 : selectedPackage.includes('149') ? 149000 : 99000, currency: 'VND' });
    }

    await new Promise(r => setTimeout(r, 1500));

    window.location.href = 'thanks.html?name=' + encodeURIComponent(name) + '&pkg=' + encodeURIComponent(selectedPackage);
  } catch (err) {
    console.error(err);
    if (typeof fbq !== 'undefined') fbq('track', 'CompleteRegistration');
    window.location.href = 'thanks.html?name=' + encodeURIComponent(name) + '&pkg=' + encodeURIComponent(selectedPackage);
  }
}
