// ============ PRODUCT DATA ============
const PRODUCTS = {
  'tron-bo': {
    title: 'BỘ TÀI LIỆU TỰ HỌC TIẾNG TRUNG — COMBO 6 TRONG 1',
    desc: 'Combo trọn bộ: Cấu trúc + Luyện dịch, Từ vựng HSK1-6, 1200 câu giao tiếp + Video, Luyện gõ Hán tự, 60 bộ thủ, Video phát âm.',
    priceSale: '199,000₫', priceOld: '450,000₫', discount: 'Tiết kiệm 56%',
    sold: 'Đã bán 3.1K+', headerTitle: 'Combo 6 trong 1',
    videoId: 'g8p1BpPhAUY',
    slides: ['/images/combo-overview.webp','/ảnh slider/5.webp','/ảnh slider/1.webp','/ảnh slider/9.webp','/ảnh slider/11.webp','/ảnh slider/13.webp'],
    features: [
      'Cấu trúc câu + Luyện dịch tiếng Trung (30+ cấu trúc)',
      'Từ vựng HSK1 – HSK6 đầy đủ (5000+ từ)',
      'Luyện gõ Hán tự HSK1 – HSK3 (check tự động)',
      '1200 câu giao tiếp + Video hướng dẫn',
      '60 bộ thủ thường gặp trong chữ Hán',
      '🎁 TẶNG: Video phát âm chuẩn bản xứ',
      '🎁 TẶNG: Vào nhóm Facebook hỗ trợ học tập'
    ],
    pkgKey: 'full',
    file: { amount: 199000, label: '199K', content: 'tai lieu tieng trung 6' },
    book: { amount: 499000, label: '499K', content: 'sach giay tieng trung 6' }
  },
  'cau-truc': {
    title: 'CẤU TRÚC VÀ LUYỆN DỊCH TIẾNG TRUNG',
    desc: 'Tổng hợp 34 cấu trúc ngữ pháp HSK1-HSK3 + bài luyện dịch 2 chiều Trung ↔ Việt kèm đáp án.',
    priceSale: '69,000₫', priceOld: '150,000₫', discount: 'Tiết kiệm 54%',
    sold: 'Đã bán 1.8K+', headerTitle: 'Cấu trúc + Luyện dịch',
    videoId: 'fBMha7GPcmY',
    slides: ['/ảnh slider/5.webp','/ảnh slider/6.webp','/ảnh slider/7.webp','/ảnh slider/8.webp'],
    features: [
      '34 cấu trúc ngữ pháp HSK1–HSK3 thường gặp nhất',
      'Mỗi cấu trúc: công thức + giải thích + ví dụ + lưu ý',
      'Luyện dịch Trung → Việt và Việt → Trung',
      'Đáp án đi kèm cuối file để đối chiếu',
      'Xem trên điện thoại hoặc in ra sách'
    ],
    pkgKey: 'cautruc',
    file: { amount: 69000, label: '69K', content: 'tai lieu tieng trung 1' },
    book: { amount: 189000, label: '189K', content: 'sach giay tieng trung 1' }
  },
  '1200-cau': {
    title: '1200 CÂU GIAO TIẾP THÔNG DỤNG + VIDEO',
    desc: '1200 câu giao tiếp tiếng Trung chia theo 100+ chủ đề thực tế, kèm video hướng dẫn phát âm.',
    priceSale: '99,000₫', priceOld: '200,000₫', discount: 'Tiết kiệm 50%',
    sold: 'Đã bán 2.3K+', headerTitle: '1200 câu giao tiếp',
    videoId: 'kgH3MEUr6CY',
    slides: ['/ảnh slider/1.webp','/ảnh slider/2.webp','/ảnh slider/3.webp','/ảnh slider/4.webp'],
    features: [
      '1200 câu giao tiếp chia theo 100+ chủ đề thực tế',
      'Có âm bồi (phiên âm) đi kèm từng câu',
      'Kèm video hướng dẫn đọc — nghe và nói ngay',
      'Câu ngắn, đơn giản, tính thực chiến cao',
      'Phù hợp người cần giao tiếp nhanh cho công việc'
    ],
    pkgKey: 'giaotiep',
    file: { amount: 99000, label: '99K', content: 'tai lieu tieng trung 4' },
    book: { amount: 219000, label: '219K', content: 'sach giay tieng trung 4' }
  },
  'tu-vung': {
    title: 'TỪ VỰNG TIẾNG TRUNG HSK1 – HSK6',
    desc: 'Full từ vựng HSK1 đến HSK6, có Pinyin + ví dụ câu thực tế. Tra cứu nhanh trên điện thoại.',
    priceSale: '39,000₫', priceOld: '100,000₫', discount: 'Tiết kiệm 61%',
    sold: 'Đã bán 1.5K+', headerTitle: 'Từ vựng HSK1-HSK6',
    videoId: 'FQPgp6mjnEM',
    slides: ['/ảnh slider/9.webp','/ảnh slider/10.webp'],
    features: [
      'Full từ vựng HSK1–HSK6 chia theo cấp độ',
      'Mỗi từ có Pinyin + ví dụ câu thực tế',
      'Tra cứu cực nhanh trên điện thoại',
      'Hỗ trợ ôn thi HSK các cấp',
      'Học mọi lúc mọi nơi'
    ],
    pkgKey: 'tuvung',
    file: { amount: 39000, label: '39K', content: 'tai lieu tieng trung 2' },
    book: { amount: 159000, label: '159K', content: 'sach giay tieng trung 2' }
  },
  'luyen-go': {
    title: 'LUYỆN GÕ HÁN TỰ HSK1 – HSK3',
    desc: 'File luyện gõ Hán tự có tính năng check tự động: gõ đúng = xanh, sai = đỏ. Nhớ lâu hơn gấp 3 lần.',
    priceSale: '39,000₫', priceOld: '100,000₫', discount: 'Tiết kiệm 61%',
    sold: 'Đã bán 980+', headerTitle: 'Luyện gõ Hán tự',
    videoId: 'FbMDnTSfHF4',
    slides: ['/ảnh slider/11.webp','/ảnh slider/12.webp'],
    features: [
      'Chia rõ từ vựng 3 cấp: HSK1, HSK2, HSK3',
      'Tính năng check tự động: đúng = xanh, sai = đỏ',
      'Vừa gõ vừa ôn tập — nhớ cả mặt chữ lẫn phiên âm',
      'Luyện gõ trên máy tính hoặc điện thoại'
    ],
    pkgKey: 'luyen',
    file: { amount: 39000, label: '39K', content: 'tai lieu tieng trung 3' },
    book: null // chỉ có file số
  },
  '60-bo-thu': {
    title: '60 BỘ THỦ THƯỜNG GẶP TRONG CHỮ HÁN',
    desc: '60 bộ thủ cốt lõi — gốc rễ của chữ Hán. Nhớ mặt chữ nhanh và lâu hơn qua ý nghĩa từng bộ.',
    priceSale: '39,000₫', priceOld: '100,000₫', discount: 'Tiết kiệm 61%',
    sold: 'Đã bán 1.2K+', headerTitle: '60 bộ thủ chữ Hán',
    videoId: 'SwL2V_aaxu4',
    slides: ['/ảnh slider/13.webp','/ảnh slider/14.webp'],
    features: [
      '60 bộ thủ thường gặp nhất — gốc rễ của chữ Hán',
      'Giải thích ý nghĩa rõ ràng, dễ hiểu',
      'Nhớ mặt chữ có logic — nhanh và lâu hơn',
      'Nền tảng vững chắc cho HSK3 trở lên'
    ],
    pkgKey: 'bothu',
    file: { amount: 39000, label: '39K', content: 'tai lieu tieng trung 5' },
    book: { amount: 159000, label: '159K', content: 'sach giay tieng trung 5' }
  }
};

// ============ DETECT PRODUCT FROM URL ============
const slug = window.location.pathname.split('/sp/')[1]?.replace(/\.html$/,'').replace(/\/$/,'') || '';
const P = PRODUCTS[slug];
if (!P) { window.location.href = '/'; }

// ============ RENDER PAGE ============
document.getElementById('pageTitle').textContent = P.title + ' — Tiếng Trung Hoàng Diễm';
document.getElementById('pageMeta').content = P.desc;
document.getElementById('headerTitle').textContent = P.headerTitle;
document.getElementById('priceSale').textContent = P.priceSale;
document.getElementById('priceOld').textContent = P.priceOld;
document.getElementById('priceDisc').textContent = P.discount;
document.getElementById('productTitle').textContent = P.title;
document.getElementById('productDesc').textContent = P.desc;
document.getElementById('soldCount').textContent = P.sold;
document.getElementById('totalSlides').textContent = P.slides.length;

// Features
const fl = document.getElementById('featuresList');
P.features.forEach(f => {
  const li = document.createElement('li');
  li.innerHTML = '<i class="fas fa-check" style="color:#ee4d2d;margin-right:6px;"></i>' + f;
  li.style.cssText = 'list-style:none;padding:6px 0;font-size:14px;color:#333;border-bottom:1px solid #f0f0f0;';
  fl.appendChild(li);
});

// Slides
const slidesEl = document.getElementById('heroSlides');
const dotsEl = document.getElementById('heroDots');
P.slides.forEach((src, i) => {
  const div = document.createElement('div');
  div.className = 'slide' + (i===0?' active':'');
  div.innerHTML = '<img src="'+src+'" alt="'+P.headerTitle+'" loading="'+(i<2?'eager':'lazy')+'">';
  slidesEl.appendChild(div);
  const dot = document.createElement('span');
  dot.className = 'dot'+(i===0?' active':'');
  dot.dataset.index = i;
  dotsEl.appendChild(dot);
});

// Hide book option if not available
if (!P.book) {
  const bookBtn = document.getElementById('bookTypeBtn');
  if (bookBtn) bookBtn.style.display = 'none';
}

// ============ SLIDER ============
let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const counter = document.getElementById('currentSlide');
const slidesContainer = document.querySelector('.slides');

function goToSlide(i) {
  currentIndex = i;
  slidesContainer.style.transform = 'translateX(-'+i*100+'%)';
  dots.forEach((d,idx) => d.classList.toggle('active', idx===i));
  counter.textContent = i+1;
}
dots.forEach(d => d.addEventListener('click', () => goToSlide(+d.dataset.index)));

// Touch swipe
let startX = 0;
const sliderEl = document.querySelector('.hero-slider');
sliderEl.addEventListener('touchstart', e => { startX = e.touches[0].clientX; });
sliderEl.addEventListener('touchend', e => {
  const diff = startX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 40) {
    if (diff > 0 && currentIndex < slides.length-1) goToSlide(currentIndex+1);
    else if (diff < 0 && currentIndex > 0) goToSlide(currentIndex-1);
  }
});
setInterval(() => { goToSlide(currentIndex < slides.length-1 ? currentIndex+1 : 0); }, 5000);

// ============ COUNTDOWN ============
function updateCountdown() {
  const now = new Date();
  const end = new Date(now); end.setHours(23,59,59,0);
  const diff = end - now; if(diff<=0) return;
  const h = Math.floor(diff/3600000), m = Math.floor((diff%3600000)/60000), s = Math.floor((diff%60000)/1000);
  const cdH=document.getElementById('cdHours'),cdM=document.getElementById('cdMins'),cdS=document.getElementById('cdSecs');
  if(cdH)cdH.textContent=String(h).padStart(2,'0');
  if(cdM)cdM.textContent=String(m).padStart(2,'0');
  if(cdS)cdS.textContent=String(s).padStart(2,'0');
}
updateCountdown(); setInterval(updateCountdown,1000);

// Flash sold
(function(){const d=new Date(),seed=d.getFullYear()*10000+(d.getMonth()+1)*100+d.getDate(),pct=82+(seed%11);
const el=document.getElementById('flashSold'),bar=document.getElementById('flashProgress');
if(el)el.textContent=pct;if(bar)bar.style.width=pct+'%';})();

// ============ MODAL & PAYMENT ============
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyuK1o1PdjrfvhJwutbSzn7y3-TVP4qWl8tDvgKALnJyCyaNlTHWCh8SJM2kGgWVeY/exec';
let selectedPackage = '';
let customerName = '';
let customerPhone = '';
let currentType = 'file';

function openModal() {
  document.getElementById('modalOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
  showStep('step1');
  updateVariantSummary();
  if(typeof fbq!=='undefined') fbq('track','ViewContent',{content_name:P.headerTitle});
}
function closeModal() {
  document.getElementById('modalOverlay').classList.remove('active');
  document.body.style.overflow = '';
}
function showStep(id) {
  document.querySelectorAll('.modal-step').forEach(s => s.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}
function goBack() { showStep('step1'); }

function selectType(type) {
  currentType = type;
  document.querySelectorAll('#variantType .variant-btn').forEach(b => b.classList.toggle('active', b.dataset.type===type));
  updateVariantSummary();
}

function updateVariantSummary() {
  const pricing = P[currentType];
  if (!pricing) { currentType='file'; selectType('file'); return; }
  const typeLabel = currentType==='file'?'File số':'Sách giấy';
  document.getElementById('variantPkgName').textContent = P.headerTitle + ' ('+typeLabel+')';
  document.getElementById('variantTotalPrice').textContent = pricing.amount.toLocaleString('vi-VN')+'₫';
  document.getElementById('variantSummary').style.display = 'block';
}

function confirmVariant() {
  const pricing = P[currentType];
  const typeLabel = currentType==='file'?'':' (Sách giấy)';
  selectedPackage = P.headerTitle + typeLabel + ' - ' + pricing.label;
  document.getElementById('selectedPkg').textContent = '📦 ' + selectedPackage;
  setupFormForType(currentType);
  showStep('step2');
}

function setupFormForType(type) {
  const isBook = type==='book';
  document.getElementById('formTitle').textContent = isBook?'Thông tin nhận sách':'Thông tin nhận tài liệu';
  document.getElementById('formSubtitle').textContent = isBook?'Vui lòng nhập chính xác địa chỉ!':'Vui lòng nhập chính xác thông tin!';
  document.getElementById('noticeFile').classList.toggle('hidden',isBook);
  document.getElementById('noticeBook').classList.toggle('hidden',!isBook);
  document.getElementById('phoneLabel').innerHTML = isBook?'Số điện thoại <span class="req">*</span>':'Số Zalo <span class="req">*</span>';
  const ag=document.getElementById('addressGroup'),ai=document.getElementById('address');
  ag.classList.toggle('hidden',!isBook);
  if(isBook)ai.setAttribute('required','required');else ai.removeAttribute('required');
  document.getElementById('btnText').textContent = isBook?'ĐẶT HÀNG':'TIẾP TỤC THANH TOÁN';
  document.getElementById('noteFileBottom').classList.toggle('hidden',isBook);
  document.getElementById('noteFileZalo').classList.toggle('hidden',isBook);
  document.getElementById('noteBookBottom').classList.toggle('hidden',!isBook);
}

async function submitOrder(e) {
  e.preventDefault();
  const name = document.getElementById('fullName').value.trim();
  const phone = document.getElementById('phone').value.trim();
  if(!name||!phone) return alert('Vui lòng nhập đầy đủ thông tin!');
  if(currentType==='book'){const addr=document.getElementById('address').value.trim();if(!addr)return alert('Vui lòng nhập địa chỉ!');}
  customerName=name; customerPhone=phone;
  const btn=document.getElementById('submitBtn');
  btn.disabled=true;
  document.getElementById('btnText').classList.add('hidden');
  document.getElementById('btnLoading').classList.remove('hidden');
  const now=new Date(),timestamp=now.toLocaleString('vi-VN',{timeZone:'Asia/Ho_Chi_Minh'});
  const sheetData={submittedAt:timestamp,name,phone,package:selectedPackage,source:'sp-'+slug,type:currentType};
  if(currentType==='book')sheetData.address=document.getElementById('address').value.trim();
  fetch(SCRIPT_URL,{method:'POST',mode:'no-cors',headers:{'Content-Type':'application/json'},body:JSON.stringify(sheetData)});
  if(typeof fbq!=='undefined'){const pricing=P[currentType];fbq('track','Lead',{content_name:selectedPackage,value:pricing.amount,currency:'VND'});}

  if(currentType==='book'){
    if(typeof fbq!=='undefined'){fbq('track','Purchase',{content_name:selectedPackage,value:P.book.amount,currency:'VND'});}
    const tp=new URLSearchParams({name,phone,pkg:selectedPackage,type:'book'});
    window.location.href='/thanks?'+tp.toString(); return;
  }
  try {
    const pricing=P.file;
    const payRes=await fetch('/api/create-payment',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({packageName:selectedPackage,name,phone})});
    if(!payRes.ok)throw new Error('API error');
    const{checkoutUrl}=await payRes.json();
    if(typeof fbq!=='undefined')fbq('track','InitiateCheckout',{content_name:selectedPackage,value:pricing.amount,currency:'VND'});
    window.location.href=checkoutUrl;
  } catch(err) {
    console.error('PayOS error:',err);
    alert('Hệ thống thanh toán đang bận. Vui lòng liên hệ Zalo 0528786710 để được hỗ trợ.');
    btn.disabled=false;
    document.getElementById('btnText').classList.remove('hidden');
    document.getElementById('btnLoading').classList.add('hidden');
  }
}

// ============ LIGHTBOX ============
const lightbox=document.getElementById('lightbox'),lightboxImg=document.getElementById('lightboxImg'),lightboxCounter=document.getElementById('lightboxCounter');
let lbImages=[],lbIndex=0;
function openLightbox(imgEl){
  lbImages=P.slides;lbIndex=lbImages.indexOf(imgEl.src.replace(window.location.origin,''));
  if(lbIndex===-1)lbIndex=0;showLbImg();lightbox.classList.add('active');document.body.style.overflow='hidden';
}
function showLbImg(){lightboxImg.src=lbImages[lbIndex];lightboxCounter.textContent=(lbIndex+1)+' / '+lbImages.length;}
function closeLb(){lightbox.classList.remove('active');document.body.style.overflow='';}
document.getElementById('lightboxClose').addEventListener('click',closeLb);
document.getElementById('lightboxPrev').addEventListener('click',()=>{lbIndex=(lbIndex-1+lbImages.length)%lbImages.length;showLbImg();});
document.getElementById('lightboxNext').addEventListener('click',()=>{lbIndex=(lbIndex+1)%lbImages.length;showLbImg();});
lightbox.addEventListener('click',e=>{if(e.target===lightbox||e.target.id==='lightboxWrap')closeLb();});

// Click on slide images to open lightbox
document.querySelectorAll('.slide img').forEach(img=>{img.style.cursor='pointer';img.addEventListener('click',()=>openLightbox(img));});
