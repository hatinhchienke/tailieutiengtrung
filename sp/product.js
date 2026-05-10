// ============ PRODUCT DATA ============
const PRODUCTS = {
  'tron-bo': {
    title: 'BỘ TÀI LIỆU TỰ HỌC TIẾNG TRUNG — COMBO 6 TRONG 1',
    desc: 'Combo trọn bộ: Cấu trúc + Luyện dịch, Từ vựng HSK1-6, 1200 câu giao tiếp + Video, Luyện gõ Hán tự, 60 bộ thủ, Video phát âm.',
    priceSale: '199,000₫', priceOld: '450,000₫', discount: 'Tiết kiệm 56%',
    sold: 'Đã bán 3.1K+', headerTitle: 'Combo 6 trong 1',
    videoId: 'g8p1BpPhAUY',
    slides: ['/images/combo-overview.webp','/ảnh cover sp/Cấu trúc và luyện dịch tiếng Trung.png','/ảnh cover sp/1200 câu.png','/ảnh cover sp/Từ vựng tiếng Trung từ hsk 1 đến hsk 6.png','/ảnh cover sp/Luyện gõ Hán tự.png','/ảnh cover sp/60 bộ thủ chữ hán.png'],
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
    book: { amount: 499000, label: '499K', content: 'sach giay tieng trung 6' },
    reviews: [
      { name: 'Ng Minh', letter: 'N', text: 'Mua trọn bộ vì thấy giá quá hời. Có đủ từ vựng, ngữ pháp, giao tiếp — học theo lộ trình rõ ràng. 2 tháng mình đã thi đỗ HSK2!', date: '5 - 6' },
      { name: 'Tr Hương', letter: 'T', text: 'Làm ở công ty Trung Quốc, mình tự học theo combo và tiếng Trung đã cải thiện rõ rệt. Giao tiếp được cơ bản trong công việc rồi.', date: '5 - 3' },
      { name: 'Lê Dũng', letter: 'L', text: 'Ban đầu định mua lẻ nhưng thấy combo tiết kiệm 56% nên mua luôn. Không hối hận, tài liệu chất lượng, hỗ trợ nhiệt tình.', date: '4 - 28' }
    ]
  },
  'cau-truc': {
    title: 'CẤU TRÚC VÀ LUYỆN DỊCH TIẾNG TRUNG',
    desc: 'Tổng hợp 34 cấu trúc ngữ pháp HSK1-HSK3 + bài luyện dịch 2 chiều Trung ↔ Việt kèm đáp án.',
    priceSale: '69,000₫', priceOld: '150,000₫', discount: 'Tiết kiệm 54%',
    sold: 'Đã bán 1.8K+', headerTitle: 'Cấu trúc + Luyện dịch',
    videoId: 'fBMha7GPcmY',
    slides: ['/ảnh cover sp/Cấu trúc và luyện dịch tiếng Trung.png'],
    features: [
      '34 cấu trúc ngữ pháp HSK1–HSK3 thường gặp nhất',
      'Mỗi cấu trúc: công thức + giải thích + ví dụ + lưu ý',
      'Luyện dịch Trung → Việt và Việt → Trung',
      'Đáp án đi kèm cuối file để đối chiếu',
      'Xem trên điện thoại hoặc in ra sách'
    ],
    pkgKey: 'cautruc',
    file: { amount: 69000, label: '69K', content: 'tai lieu tieng trung 1' },
    book: { amount: 189000, label: '189K', content: 'sach giay tieng trung 1' },
    reviews: [
      { name: 'T Minh', letter: 'T', text: 'Mình yếu phần ngữ pháp, học mãi không nhớ gì. Mua bộ này về tự học theo cấu trúc, 2 tuần đã đặt câu được. Trình bày rõ ràng, dễ hiểu cực kỳ!', date: '5 - 8' },
      { name: 'H Anh', letter: 'H', text: 'Đang học năm 2 chuyên ngành tiếng Trung mà vẫn thấy hữu ích. Phần luyện dịch 2 chiều quá hay, giúp mình phản xạ nhanh hơn nhiều.', date: '5 - 5' },
      { name: 'Ph Lan', letter: 'P', text: 'Hay nhất là phần luyện dịch Việt → Trung, ép mình phải tư duy ngược lại. Sau 1 tháng mình đã tự tin nói câu dài hơn rồi.', date: '4 - 20' }
    ]
  },
  '1200-cau': {
    title: '1200 CÂU GIAO TIẾP THÔNG DỤNG + VIDEO',
    desc: '1200 câu giao tiếp tiếng Trung chia theo 100+ chủ đề thực tế, kèm video hướng dẫn phát âm.',
    priceSale: '99,000₫', priceOld: '200,000₫', discount: 'Tiết kiệm 50%',
    sold: 'Đã bán 2.3K+', headerTitle: '1200 câu giao tiếp',
    videoId: 'kgH3MEUr6CY',
    slides: ['/ảnh cover sp/1200 câu.png'],
    features: [
      '1200 câu giao tiếp chia theo 100+ chủ đề thực tế',
      'Có âm bồi (phiên âm) đi kèm từng câu',
      'Kèm video hướng dẫn đọc — nghe và nói ngay',
      'Câu ngắn, đơn giản, tính thực chiến cao',
      'Phù hợp người cần giao tiếp nhanh cho công việc'
    ],
    pkgKey: 'giaotiep',
    file: { amount: 99000, label: '99K', content: 'tai lieu tieng trung 4' },
    book: { amount: 219000, label: '219K', content: 'sach giay tieng trung 4' },
    reviews: [
      { name: 'Vũ Hải', letter: 'V', text: 'Đi công tác Trung Quốc, mình chỉ học theo 1200 câu này thôi mà giao tiếp ổn lắm. Câu ngắn gọn, dễ nhớ, thực tế!', date: '5 - 7' },
      { name: 'Đỗ Linh', letter: 'Đ', text: 'Có video phát âm kèm theo nên mình bắt chước được luôn. Trước toàn đọc sai thanh điệu, giờ chuẩn hơn nhiều rồi.', date: '5 - 2' },
      { name: 'Bù Trang', letter: 'B', text: 'Mình học song song với bộ cấu trúc. 1200 câu giúp mình nói tự nhiên hơn, không còn phải dịch từng từ trong đầu nữa.', date: '4 - 25' }
    ]
  },
  'tu-vung': {
    title: 'TỪ VỰNG TIẾNG TRUNG HSK1 – HSK6',
    desc: 'Full từ vựng HSK1 đến HSK6, có Pinyin + ví dụ câu thực tế. Tra cứu nhanh trên điện thoại.',
    priceSale: '39,000₫', priceOld: '100,000₫', discount: 'Tiết kiệm 61%',
    sold: 'Đã bán 1.5K+', headerTitle: 'Từ vựng HSK1-HSK6',
    videoId: 'FQPgp6mjnEM',
    slides: ['/ảnh cover sp/Từ vựng tiếng Trung từ hsk 1 đến hsk 6.png'],
    features: [
      'Full từ vựng HSK1–HSK6 chia theo cấp độ',
      'Mỗi từ có Pinyin + ví dụ câu thực tế',
      'Tra cứu cực nhanh trên điện thoại',
      'Hỗ trợ ôn thi HSK các cấp',
      'Học mọi lúc mọi nơi'
    ],
    pkgKey: 'tuvung',
    file: { amount: 39000, label: '39K', content: 'tai lieu tieng trung 2' },
    book: { amount: 159000, label: '159K', content: 'sach giay tieng trung 2' },
    reviews: [
      { name: 'Đinh Nam', letter: 'Đ', text: 'Tra từ vựng trên điện thoại cực nhanh, không cần mở app. Có ví dụ câu nên hiểu ngay cách dùng, không phải đoán.', date: '5 - 4' },
      { name: 'Ng Thắng', letter: 'N', text: 'Mình đang ôn thi HSK3, file từ vựng này chia theo cấp nên biết mình cần học gì. Pinyin đầy đủ, rất tiện!', date: '5 - 1' },
      { name: 'Lý Quân', letter: 'L', text: 'Giá 39K mà được từ HSK1 đến HSK6 luôn thì quá rẻ. Mình lưu trên điện thoại, rảnh lúc nào mở ra học lúc đó.', date: '4 - 22' }
    ]
  },
  'luyen-go': {
    title: 'LUYỆN GÕ HÁN TỰ HSK1 – HSK6',
    desc: 'File luyện gõ Hán tự có tính năng check tự động: gõ đúng = xanh, sai = đỏ. Nhớ lâu hơn gấp 3 lần.',
    priceSale: '39K - 79K', priceOld: '100K - 200K', discount: 'Tiết kiệm 61%',
    sold: 'Đã bán 980+', headerTitle: 'Luyện gõ Hán tự',
    videoId: 'FbMDnTSfHF4',
    slides: ['/ảnh cover sp/Luyện gõ Hán tự.png'],
    features: [
      'Luyện gõ Hán tự từ HSK1 đến HSK6',
      'Tính năng check tự động: đúng = xanh, sai = đỏ',
      'Vừa gõ vừa ôn tập — nhớ cả mặt chữ lẫn phiên âm',
      'Luyện gõ trên máy tính hoặc điện thoại'
    ],
    pkgKey: 'luyen',
    packages: [
      { id: 'goi1', amount: 39000, label: '39K', name: 'Gói 1 (HSK1-3)', content: 'tai lieu tieng trung 3' },
      { id: 'goi2', amount: 49000, label: '49K', name: 'Gói 2 (HSK4-6)', content: 'tai lieu luyen go 2' },
      { id: 'goi3', amount: 79000, label: '79K', name: 'Gói 3 (Full 1-6)', content: 'tai lieu luyen go 3' }
    ],
    file: { amount: 39000, label: '39K', content: 'tai lieu tieng trung 3' }, // For fallback reference
    goi1: { amount: 39000, label: '39K', content: 'tai lieu tieng trung 3', isFile: true },
    goi2: { amount: 49000, label: '49K', content: 'tai lieu luyen go 2', isFile: true },
    goi3: { amount: 79000, label: '79K', content: 'tai lieu luyen go 3', isFile: true },
    reviews: [
      { name: 'Ho Yến', letter: 'H', text: 'Trước mình nhìn chữ Hán thì hiểu nhưng không nhớ pinyin để gõ. Luyện file này 2 tuần, giờ gõ nhanh hơn hẳn!', date: '5 - 5' },
      { name: 'Tr Đức', letter: 'T', text: 'Tính năng check tự động hay lắm — gõ đúng hiện xanh, sai hiện đỏ. Như chơi game vậy, không nhàm chán.', date: '4 - 30' },
      { name: 'Lê Mai', letter: 'L', text: 'Mình hay quên mặt chữ, nhưng từ khi luyện gõ thì nhớ lâu hơn nhiều. Vừa nhớ pinyin vừa nhớ mặt chữ luôn.', date: '4 - 18' }
    ],
    book: null
  },
  '60-bo-thu': {
    title: '60 BỘ THỦ THƯỜNG GẶP TRONG CHỮ HÁN',
    desc: '60 bộ thủ cốt lõi — gốc rễ của chữ Hán. Nhớ mặt chữ nhanh và lâu hơn qua ý nghĩa từng bộ.',
    priceSale: '39,000₫', priceOld: '100,000₫', discount: 'Tiết kiệm 61%',
    sold: 'Đã bán 1.2K+', headerTitle: '60 bộ thủ chữ Hán',
    videoId: 'SwL2V_aaxu4',
    slides: ['/ảnh cover sp/60 bộ thủ chữ hán.png'],
    features: [
      '60 bộ thủ thường gặp nhất — gốc rễ của chữ Hán',
      'Giải thích ý nghĩa rõ ràng, dễ hiểu',
      'Nhớ mặt chữ có logic — nhanh và lâu hơn',
      'Nền tảng vững chắc cho HSK3 trở lên'
    ],
    pkgKey: 'bothu',
    file: { amount: 39000, label: '39K', content: 'tai lieu tieng trung 5' },
    book: { amount: 159000, label: '159K', content: 'sach giay tieng trung 5' },
    reviews: [
      { name: 'Ph Mai', letter: 'P', text: 'Học bộ thủ xong mới hiểu tại sao chữ Hán viết như vậy. Nhìn chữ mới đoán được nghĩa luôn, quá hay!', date: '5 - 6' },
      { name: 'Võ Ngọc', letter: 'V', text: 'Trước mình sợ chữ Hán lắm vì nhìn như vẽ. Học 60 bộ thủ xong thấy logic hẳn, nhớ chữ nhanh hơn gấp mấy lần.', date: '4 - 29' },
      { name: 'Đặ Huy', letter: 'Đ', text: 'File trình bày đẹp, giải thích dễ hiểu. Mỗi bộ thủ có ví dụ cụ thể nên nhớ rất nhanh. Nền tảng tốt để học HSK.', date: '4 - 15' }
    ]
  }
};

// ============ DETECT PRODUCT FROM URL ============
const slug = window.location.pathname.split('/sp/')[1]?.replace(/\.html$/,'').replace(/\/$/,'') || '';
const P = PRODUCTS[slug];
if (!P) { window.location.href = '/'; }

let upgradeDiscount = 0;
let ownedPackageNames = [];

if (slug === 'tron-bo') {
  const pkgPrices = {
    'cautruc': { amount: 69000, name: 'Cấu trúc & Luyện dịch' },
    'tuvung': { amount: 39000, name: 'Từ vựng HSK1-6' },
    'giaotiep': { amount: 99000, name: '1200 câu giao tiếp' },
    'bothu': { amount: 39000, name: '60 bộ thủ' }
  };
  Object.keys(pkgPrices).forEach(key => {
    if (localStorage.getItem('hub_' + key) !== null) {
      upgradeDiscount += pkgPrices[key].amount;
      ownedPackageNames.push(pkgPrices[key].name);
    }
  });

  const luyenPass = localStorage.getItem('hub_luyen');
  if (luyenPass) {
    if (luyenPass === 'LG41WIN') { upgradeDiscount += 39000; ownedPackageNames.push('Luyện gõ Hán tự Gói 1'); }
    else if (luyenPass === 'LG99PRO') { upgradeDiscount += 49000; ownedPackageNames.push('Luyện gõ Hán tự Gói 2'); }
    else if (luyenPass === 'LG88MAX') { upgradeDiscount += 79000; ownedPackageNames.push('Luyện gõ Hán tự Gói 3'); }
    else { upgradeDiscount += 39000; ownedPackageNames.push('Luyện gõ Hán tự'); }
  }

  if (upgradeDiscount > 0) {
    P.file.amount = Math.max(0, P.file.amount - upgradeDiscount);
    P.priceSale = (P.file.amount === 0 ? '0' : P.file.amount.toLocaleString('vi-VN')) + '₫';
    P.file.label = P.priceSale;
    P.desc = `🎁 [Hỗ trợ Nâng cấp] Bạn đã mua ${ownedPackageNames.join(', ')}. Hệ thống tự động giảm trừ ${upgradeDiscount.toLocaleString('vi-VN')}₫ cho gói Full Combo.\n\n` + P.desc;
  }
}

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

// Delivery Compare
const dc = document.getElementById('deliveryCompare');
const filePrice = P.file.amount.toLocaleString('vi-VN');
const bookPrice = P.book ? P.book.amount.toLocaleString('vi-VN') : null;
let dcHTML = '<h4>📋 2 HÌNH THỨC NHẬN TÀI LIỆU — BẠN CHỌN!</h4>' +
  '<div class="dc-hint"><i class="fas fa-bolt"></i> <strong>90% khách hàng</strong> chọn File số vì nhận ngay, giá rẻ hơn & có thể tự in ra sách!</div>' +
  '<div class="dc-options">' +
  '<div class="dc-card dc-file"><div class="dc-rec">⭐ ĐỀ XUẤT</div>' +
  '<div class="dc-icon"><i class="fas fa-file-pdf"></i></div>' +
  '<h5>📄 File số (PDF/Excel)</h5>' +
  '<ul>' +
  '<li>✅ Nhận link tải <strong>ngay sau thanh toán</strong> — không chờ đợi</li>' +
  '<li>✅ Giá chỉ từ <strong>' + filePrice + '₫</strong> — rẻ hơn sách giấy</li>' +
  '<li>✅ Học trên điện thoại mọi lúc mọi nơi</li>' +
  '<li>✅ <strong>Tự in ra thành sách</strong> nếu muốn — giống hệt sách trong video</li>' +
  '<li>✅ Lưu trữ vĩnh viễn, không sợ mất</li>' +
  '<li>✅ Tra cứu nhanh bằng tìm kiếm trên điện thoại</li>' +
  '</ul></div>';

if (P.book) {
  dcHTML += '<div class="dc-card dc-book">' +
    '<div class="dc-icon"><i class="fas fa-book"></i></div>' +
    '<h5>📕 Sách giấy (giao tận nhà)</h5>' +
    '<ul>' +
    '<li>✅ Sách in sẵn, giao tận nhà trong 2-4 ngày</li>' +
    '<li>✅ Cầm nắm thật, đánh dấu, ghi chú</li>' +
    '<li>✅ Thanh toán khi nhận hàng (COD)</li>' +
    '</ul>' +
    '<div class="dc-note">💡 Giá sách giấy = giá file số + phí in & ship</div>' +
    '</div>';
}

dcHTML += '</div>';
dc.innerHTML = dcHTML;

// Reviews
const reviewsEl = document.getElementById('reviewsSection');
if (P.reviews && P.reviews.length) {
  const stars5 = '<i class="fas fa-star"></i>'.repeat(5);
  let html = '<div class="reviews-header"><h3>Đánh giá của học viên</h3></div>';
  html += '<div class="review-summary"><div class="review-score">4.9<span>/5</span></div><div class="review-stars">'+stars5+'</div></div>';
  P.reviews.forEach(r => {
    html += '<div class="review-card"><div class="review-user"><div class="avatar">'+r.letter+'</div><span class="name">'+r.name+'</span></div><div class="review-stars-sm">'+stars5+'</div><p>'+r.text+'</p><div class="review-date">'+r.date+'</div></div>';
  });
  reviewsEl.innerHTML = html;
}

// Slides — video first, then images
const slidesEl = document.getElementById('heroSlides');
const dotsEl = document.getElementById('heroDots');
const totalCount = P.slides.length + (P.videoId ? 1 : 0);
document.getElementById('totalSlides').textContent = totalCount;
let slideIdx = 0;

// Video slide (first)
if (P.videoId) {
  const vdiv = document.createElement('div');
  vdiv.className = 'slide slide-video active';
  vdiv.innerHTML = '<div class="yt-lazy" id="ytLazy" data-id="'+P.videoId+'">' +
    '<img src="'+P.slides[0]+'" alt="Xem video giới thiệu" class="yt-poster" style="object-fit:contain;background:#fff;">' +
    '<button class="play-btn" id="playBtn"><i class="fas fa-play"></i></button></div>' +
    '<span class="slide-label">▶ Nhấn để xem video giới thiệu</span>';
  slidesEl.appendChild(vdiv);
  const dot0 = document.createElement('span');
  dot0.className = 'dot active';
  dot0.dataset.index = 0;
  dotsEl.appendChild(dot0);
  slideIdx = 1;
}

// Image slides
P.slides.forEach((src, i) => {
  const div = document.createElement('div');
  div.className = 'slide';
  div.innerHTML = '<img src="'+src+'" alt="'+P.headerTitle+'" loading="'+(i<2?'eager':'lazy')+'">';
  slidesEl.appendChild(div);
  const dot = document.createElement('span');
  dot.className = 'dot';
  dot.dataset.index = slideIdx;
  dotsEl.appendChild(dot);
  slideIdx++;
});

// YouTube lazy load
const ytLazy = document.getElementById('ytLazy');
if (ytLazy) {
  function loadYT() {
    if (ytLazy.querySelector('iframe')) return;
    const vid = ytLazy.dataset.id;
    const iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube.com/embed/'+vid+'?autoplay=1&rel=0&modestbranding=1';
    iframe.allow = 'accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture';
    iframe.allowFullscreen = true;
    iframe.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;border:0;';
    ytLazy.appendChild(iframe);
    const btn = ytLazy.querySelector('.play-btn');
    const poster = ytLazy.querySelector('.yt-poster');
    if (btn) btn.style.display = 'none';
    if (poster) poster.style.display = 'none';
  }
  const playBtn = ytLazy.querySelector('.play-btn');
  const poster = ytLazy.querySelector('.yt-poster');
  if (playBtn) playBtn.addEventListener('click', loadYT);
  if (poster) poster.addEventListener('click', loadYT);
}

// Hide book option if not available
if (!P.book) {
  const bookBtn = document.getElementById('bookTypeBtn');
  if (bookBtn) bookBtn.style.display = 'none';
}

// ============ UPSELL BANNER ============
const COVER_IMAGES = {
  'tron-bo': '/images/combo-overview.webp',
  'cau-truc': '/ảnh cover sp/Cấu trúc và luyện dịch tiếng Trung.png',
  '1200-cau': '/ảnh cover sp/1200 câu.png',
  'tu-vung': '/ảnh cover sp/Từ vựng tiếng Trung từ hsk 1 đến hsk 6.png',
  'luyen-go': '/ảnh cover sp/Luyện gõ Hán tự.png',
  '60-bo-thu': '/ảnh cover sp/60 bộ thủ chữ hán.png'
};

if (slug !== 'tron-bo') {
  const combo = PRODUCTS['tron-bo'];
  const currentPrice = P.file.amount;
  const saveAmount = 126000; // Hardcoded based on maximum package values (325k total - 199k combo)
  const banner = document.getElementById('upsellBanner');
  banner.style.display = 'block';
  banner.innerHTML = '<div class="upsell-inner">' +
    '<div class="upsell-badge">🔥 TIẾT KIỆM ' + saveAmount.toLocaleString('vi-VN') + '₫</div>' +
    '<h4>Nâng cấp lên Full Trọn Bộ 6 trong 1</h4>' +
    '<p>Bạn đang xem <strong>' + P.headerTitle + '</strong> — ' + P.priceSale + '. Mua combo trọn bộ chỉ <strong>' + combo.priceSale + '</strong>, bao gồm cả 6 gói!</p>' +
    '<a href="/sp/tron-bo" class="upsell-cta"><i class="fas fa-arrow-right"></i> XEM COMBO TRỌN BỘ</a>' +
    '</div>';
}

// ============ OTHER PRODUCTS ============
const grid = document.getElementById('otherProductsGrid');
Object.keys(PRODUCTS).forEach(key => {
  if (key === slug) return;
  const p = PRODUCTS[key];
  const card = document.createElement('a');
  card.href = '/sp/' + key;
  card.className = 'sp-other-card' + (key === 'tron-bo' ? ' sp-other-featured' : '');
  card.innerHTML = '<div class="sp-other-img"><img src="' + (COVER_IMAGES[key]||p.slides[0]) + '" alt="' + p.headerTitle + '" loading="lazy"></div>' +
    '<div class="sp-other-body"><h4>' + p.headerTitle + '</h4>' +
    '<div class="sp-other-price"><span class="sp-price-sale">' + p.priceSale + '</span><span class="sp-price-old">' + p.priceOld + '</span></div></div>';
  grid.appendChild(card);
});


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
  
  const variantRow = document.getElementById('variantType');
  if (P.packages) {
    document.querySelector('.variant-label').innerHTML = '<i class="fas fa-box"></i> Chọn gói sản phẩm';
    let html = '';
    P.packages.forEach((pkg, idx) => {
      html += '<button class="variant-btn '+(idx===0?'active':'')+'" data-type="'+pkg.id+'" onclick="selectType(\''+pkg.id+'\')" style="flex-direction:column;gap:4px;padding:12px 6px;height:auto;">' +
        '<span class="variant-btn-text" style="font-size:12px;white-space:normal;line-height:1.3;text-align:center;">'+pkg.name+'</span>' +
        '<span class="variant-btn-sub" style="font-size:13px;font-weight:bold;">'+pkg.amount.toLocaleString('vi-VN')+'₫</span>' +
        '</button>';
    });
    variantRow.innerHTML = html;
    variantRow.style.display = 'grid';
    variantRow.style.gridTemplateColumns = '1fr 1fr 1fr';
    variantRow.style.gap = '8px';
    currentType = P.packages[0].id;
  } else {
    currentType = 'file';
  }
  
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
  
  let typeLabel = '';
  if (P.packages) {
    typeLabel = P.packages.find(p => p.id === currentType)?.name || '';
  } else {
    typeLabel = currentType==='file'?'File số':'Sách giấy';
  }
  
  document.getElementById('variantPkgName').textContent = P.headerTitle + ' ('+typeLabel+')';
  document.getElementById('variantTotalPrice').textContent = pricing.amount.toLocaleString('vi-VN')+'₫';
  document.getElementById('variantSummary').style.display = 'block';
}

function confirmVariant() {
  const pricing = P[currentType];
  
  let typeLabel = '';
  if (P.packages) {
    typeLabel = ' (' + (P.packages.find(p => p.id === currentType)?.name || '') + ')';
  } else {
    typeLabel = currentType==='file'?'':' (Sách giấy)';
  }
  
  selectedPackage = P.headerTitle + typeLabel + ' - ' + pricing.label;
  document.getElementById('selectedPkg').textContent = '📦 ' + selectedPackage;
  
  const isBook = pricing.isFile === undefined ? currentType==='book' : !pricing.isFile;
  setupFormForType(isBook ? 'book' : 'file');
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
  
  const pricing = P[currentType];
  const isBook = pricing.isFile === undefined ? currentType==='book' : !pricing.isFile;
  
  if(isBook){const addr=document.getElementById('address').value.trim();if(!addr)return alert('Vui lòng nhập địa chỉ!');}
  customerName=name; customerPhone=phone;
  const btn=document.getElementById('submitBtn');
  btn.disabled=true;
  document.getElementById('btnText').classList.add('hidden');
  document.getElementById('btnLoading').classList.remove('hidden');

  let finalPackageName = selectedPackage;
  if (upgradeDiscount > 0 && slug === 'tron-bo' && !isBook) {
    if (pricing.amount === 0) {
      alert('Bạn đã đủ điều kiện nhận gói Full miễn phí do đã mua các gói lẻ! Hệ thống sẽ mở khóa ngay lập tức.');
      localStorage.setItem('hub_full', 'DIEM99VIP');
      window.location.href = '/tailieu';
      return;
    }
    finalPackageName = `Nâng cấp Full Trọn Bộ (${upgradeDiscount/1000}K)`;
  }

  const now=new Date(),timestamp=now.toLocaleString('vi-VN',{timeZone:'Asia/Ho_Chi_Minh'});
  const sheetData={submittedAt:timestamp,name,phone,package:finalPackageName,source:'sp-'+slug,type:isBook?'book':'file'};
  if(isBook)sheetData.address=document.getElementById('address').value.trim();
  fetch(SCRIPT_URL,{method:'POST',mode:'no-cors',headers:{'Content-Type':'application/json'},body:JSON.stringify(sheetData)});
  if(typeof fbq!=='undefined'){fbq('track','Lead',{content_name:finalPackageName,value:pricing.amount,currency:'VND'});}

  if(isBook){
    if(typeof fbq!=='undefined'){fbq('track','Purchase',{content_name:finalPackageName,value:pricing.amount,currency:'VND'});}
    const tp=new URLSearchParams({name,phone,pkg:finalPackageName,type:'book'});
    window.location.href='/thanks.html?'+tp.toString(); return;
  }
  try {
    const payRes=await fetch('/api/create-payment',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({packageName:finalPackageName,name,phone,amount:pricing.amount})});
    if(!payRes.ok)throw new Error('API error');
    const{checkoutUrl}=await payRes.json();
    if(typeof fbq!=='undefined')fbq('track','InitiateCheckout',{content_name:finalPackageName,value:pricing.amount,currency:'VND'});
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
