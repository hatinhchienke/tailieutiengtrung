const PayOS = require("@payos/node");

const payos = new PayOS(
  process.env.PAYOS_CLIENT_ID,
  process.env.PAYOS_API_KEY,
  process.env.PAYOS_CHECKSUM_KEY
);

// Download links and passwords — SERVER-SIDE ONLY
const PACKAGE_DATA = {
  'Cấu trúc + Luyện dịch - 69K': {
    url: 'https://drive.google.com/file/d/1UnNzss9t7hoXFktDzSbQT-iFfwG1OBAw/view?usp=sharing',
    password: 'CT83MAX',
    id: 'cautruc'
  },
  'Từ vựng HSK1-HSK6 - 39K': {
    url: 'https://docs.google.com/spreadsheets/d/1gIBAQ-_clQkX_mzLe0HpmelDwj35PsSF/edit?gid=518976149#gid=518976149',
    password: 'TV55TOP',
    id: 'tuvung'
  },
  'Luyện gõ Hán tự (Gói 1: HSK1-3) - 39K': {
    url: 'https://docs.google.com/spreadsheets/d/1qi0HoR-PuL3D8nc313fFNqpnbgSL2KI2/copy',
    password: 'LG41WIN',
    id: 'luyen'
  },
  'Luyện gõ Hán tự (Gói 2: HSK4-6) - 49K': {
    url: 'https://docs.google.com/spreadsheets/d/1sXIV30j850uPxei-YPicedOQgnP1QPLV/copy',
    password: 'LG99PRO',
    id: 'luyen'
  },
  'Luyện gõ Hán tự (Gói 3: HSK1-6) - 79K': {
    url: 'https://docs.google.com/spreadsheets/d/1L67PEoGJG1YxWIdee8QENBX66KIfcaAj/copy',
    password: 'LG88MAX',
    id: 'luyen'
  },
  '1200 câu giao tiếp + Video - 99K': {
    url: 'https://drive.google.com/file/d/1qd3WcPoTv7J-nXayE_sYEkO0AV0ePE0Q/view',
    password: 'GT27PRO',
    id: 'giaotiep'
  },
  '60 bộ thủ chữ Hán - 39K': {
    url: 'https://drive.google.com/file/d/1cTEl3a0AFVTGKkmcwBOU-1YJiZhHMQV1/view',
    password: 'BT76HOT',
    id: 'bothu'
  },
  'Full trọn bộ - 199K': {
    url: 'https://www.notion.so/T-i-li-u-ti-ng-Trung-full-tr-n-b-34ffa37e953c80a7ae1efed159e95f30',
    password: 'DIEM99VIP',
    id: 'full'
  }
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
    let pkgData = PACKAGE_DATA[pkg] || null;

    // Handle dynamic upgrade package name mapping to Full combo
    if (pkg && pkg.startsWith('Nâng cấp Full Trọn Bộ')) {
      pkgData = PACKAGE_DATA['Full trọn bộ - 199K'];
    }

    if (!pkgData) {
      console.warn(`[Verify] No package data found for package: ${pkg}`);
    }

    return res.status(200).json({
      status: 'PAID',
      amount: paymentInfo.amount,
      downloadUrl: pkgData ? pkgData.url : null,
      password: pkgData ? pkgData.password : null,
      pkgId: pkgData ? pkgData.id : null
    });

  } catch (error) {
    console.error('[Verify] Error:', error);
    return res.status(500).json({
      error: 'Verification failed',
      message: error.message
    });
  }
};
