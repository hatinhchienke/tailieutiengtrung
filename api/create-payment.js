const PayOS = require("@payos/node");

const payos = new PayOS(
  process.env.PAYOS_CLIENT_ID,
  process.env.PAYOS_API_KEY,
  process.env.PAYOS_CHECKSUM_KEY
);

// Valid packages with server-side price validation + short labels for bank transfer
const VALID_PACKAGES = {
  'Cấu trúc + Luyện dịch - 69K':     { amount: 69000,  label: 'CauTruc' },
  'Từ vựng HSK1-HSK6 - 39K':          { amount: 39000,  label: 'TuVung' },
  'Luyện gõ Hán tự (Gói 1: HSK1-3) - 39K':  { amount: 39000,  label: 'HanTu1' },
  'Luyện gõ Hán tự (Gói 2: HSK4-6) - 49K':  { amount: 49000,  label: 'HanTu2' },
  'Luyện gõ Hán tự (Gói 3: HSK1-6) - 79K':  { amount: 79000,  label: 'HanTu3' },
  '1200 câu giao tiếp + Video - 99K': { amount: 99000,  label: 'GiaoTiep' },
  '60 bộ thủ chữ Hán - 39K':          { amount: 39000,  label: 'BoThu' },
  'Full trọn bộ - 199K':              { amount: 199000, label: 'TronBo' }
};

module.exports = async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { packageName, name, phone } = req.body;

    // Server-side validation
    if (!packageName || !name || !phone) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    let amount;
    let descLabel;

    if (packageName.startsWith('Nâng cấp Full Trọn Bộ')) {
      amount = req.body.amount;
      if (!amount || amount < 1000) {
        return res.status(400).json({ error: 'Invalid upgrade amount' });
      }
      descLabel = 'NangCap';
    } else {
      const pkg = VALID_PACKAGES[packageName];
      if (!pkg) {
        return res.status(400).json({ error: 'Invalid package' });
      }
      amount = pkg.amount;
      descLabel = pkg.label;
    }

    // Generate professional order code: HD-YYMMDDXXXX
    // Format: 10-digit number = YYMMDD (6) + random (4)
    const now = new Date(Date.now() + 7 * 60 * 60 * 1000); // UTC+7
    const yy = String(now.getUTCFullYear()).slice(-2);
    const mm = String(now.getUTCMonth() + 1).padStart(2, '0');
    const dd = String(now.getUTCDate()).padStart(2, '0');
    const rand = Math.floor(1000 + Math.random() * 9000);
    const orderCode = parseInt(`${yy}${mm}${dd}${rand}`);

    // Description max 25 chars — shown as nội dung chuyển khoản
    // Format: "HDiem [GoiTen]" — professional & readable
    const description = `HDiem ${descLabel}`.substring(0, 25);

    const BASE_URL = process.env.BASE_URL || 'https://tailieutiengtrung.com';

    const returnUrl = `${BASE_URL}/thanks.html?name=${encodeURIComponent(name)}&pkg=${encodeURIComponent(packageName)}&phone=${encodeURIComponent(phone)}`;
    const cancelUrl = `${BASE_URL}/?cancelled=true`;

    console.log(`[PayOS] Creating payment: orderCode=${orderCode}, amount=${amount}, pkg=${packageName}, name=${name}`);

    const paymentLink = await payos.createPaymentLink({
      orderCode,
      amount,
      description,
      returnUrl,
      cancelUrl,
      items: [{
        name: packageName.length > 50 ? packageName.substring(0, 50) : packageName,
        quantity: 1,
        price: amount
      }]
    });

    console.log(`[PayOS] Payment link created: ${paymentLink.checkoutUrl}`);

    return res.status(200).json({
      checkoutUrl: paymentLink.checkoutUrl,
      orderCode
    });

  } catch (error) {
    console.error('[PayOS] Error creating payment:', error);
    return res.status(500).json({
      error: 'Payment creation failed',
      message: error.message || 'Unknown error'
    });
  }
};
