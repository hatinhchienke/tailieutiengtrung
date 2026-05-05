const PayOS = require("@payos/node");

const payos = new PayOS(
  process.env.PAYOS_CLIENT_ID,
  process.env.PAYOS_API_KEY,
  process.env.PAYOS_CHECKSUM_KEY
);

// Valid packages with server-side price validation
const VALID_PACKAGES = {
  'Cấu trúc + Luyện dịch - 69K':     69000,
  'Từ vựng HSK1-HSK6 - 39K':          39000,
  'Luyện gõ Hán tự HSK1-HSK3 - 39K':  39000,
  '1200 câu giao tiếp + Video - 99K': 99000,
  '60 bộ thủ chữ Hán - 39K':          39000,
  'Full trọn bộ - 199K':              199000
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

    const amount = VALID_PACKAGES[packageName];
    if (!amount) {
      return res.status(400).json({ error: 'Invalid package' });
    }

    // Generate professional order code: TCHD-YYMMDDXXXX
    // Format: 10-digit number = YYMMDD (6) + random (4)
    const now = new Date(Date.now() + 7 * 60 * 60 * 1000); // UTC+7
    const yy = String(now.getUTCFullYear()).slice(-2);
    const mm = String(now.getUTCMonth() + 1).padStart(2, '0');
    const dd = String(now.getUTCDate()).padStart(2, '0');
    const rand = Math.floor(1000 + Math.random() * 9000);
    const orderCode = parseInt(`${yy}${mm}${dd}${rand}`);

    // Description max 25 chars — shown as bank transfer content
    const description = `TCHD ${orderCode}`;

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
