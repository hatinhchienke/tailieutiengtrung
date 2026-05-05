const PayOS = require("@payos/node");

const payos = new PayOS(
  process.env.PAYOS_CLIENT_ID,
  process.env.PAYOS_API_KEY,
  process.env.PAYOS_CHECKSUM_KEY
);

// Download links — SERVER-SIDE ONLY, không bao giờ lộ ra frontend
const DOWNLOAD_LINKS = {
  'Cấu trúc + Luyện dịch - 69K':
    'https://drive.google.com/file/d/10Frf9M-BIluqYBkcTXgYdh5jBdjgoJX0/view',
  'Từ vựng HSK1-HSK6 - 39K':
    'https://docs.google.com/spreadsheets/d/1gIBAQ-_clQkX_mzLe0HpmelDwj35PsSF/edit?gid=518976149#gid=518976149',
  'Luyện gõ Hán tự HSK1-HSK3 - 39K':
    'https://docs.google.com/spreadsheets/d/1BoYLupjss_nxIkkS3uhjQ3mbYEgCu7e7O1xpVo5Moco/copy',
  '1200 câu giao tiếp + Video - 99K':
    'https://drive.google.com/file/d/1qd3WcPoTv7J-nXayE_sYEkO0AV0ePE0Q/view',
  '60 bộ thủ chữ Hán - 39K':
    'https://drive.google.com/file/d/1cTEl3a0AFVTGKkmcwBOU-1YJiZhHMQV1/view',
  'Full trọn bộ - 199K':
    'https://www.notion.so/T-i-li-u-ti-ng-Trung-34ffa37e953c80a7ae1efed159e95f30'
};

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const { orderCode, pkg } = req.query;

  if (!orderCode) {
    return res.status(400).json({ error: 'Missing orderCode' });
  }

  try {
    // Verify payment status with PayOS
    const paymentInfo = await payos.getPaymentLinkInformation(Number(orderCode));

    console.log(`[Verify] orderCode=${orderCode}, status=${paymentInfo.status}, amount=${paymentInfo.amount}`);

    if (paymentInfo.status !== 'PAID') {
      return res.status(200).json({
        status: paymentInfo.status,
        downloadUrl: null
      });
    }

    // Payment confirmed PAID — find the download link
    const downloadUrl = DOWNLOAD_LINKS[pkg] || null;

    if (!downloadUrl) {
      console.warn(`[Verify] No download link found for package: ${pkg}`);
    }

    return res.status(200).json({
      status: 'PAID',
      amount: paymentInfo.amount,
      downloadUrl
    });

  } catch (error) {
    console.error('[Verify] Error:', error);
    return res.status(500).json({
      error: 'Verification failed',
      message: error.message
    });
  }
};
