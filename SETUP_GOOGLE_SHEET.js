// ===== HƯỚNG DẪN SETUP GOOGLE APPS SCRIPT (GỬI THÔNG BÁO QUA TELEGRAM) =====
// 
// ===== SETUP TELEGRAM BOT (LÀM 1 LẦN DUY NHẤT) =====
//
// 1. Mở Telegram, tìm @BotFather
// 2. Gửi lệnh: /newbot
// 3. Đặt tên bot (ví dụ: "Thông Báo Đơn Hàng")
// 4. Đặt username bot (ví dụ: donhang_tb_bot) — phải kết thúc bằng "bot"
// 5. BotFather sẽ gửi cho bạn BOT TOKEN (dạng: 123456789:ABCdefGhIJKlmNoPQRsTUVwxyz)
//    → Copy token này, dán vào biến TELEGRAM_BOT_TOKEN bên dưới
//
// 6. Lấy CHAT_ID của bạn:
//    a. Mở Telegram, tìm @userinfobot hoặc @getmyid_bot
//    b. Gửi /start → bot sẽ trả về Chat ID của bạn (dạng số: 123456789)
//    → Copy Chat ID này, dán vào biến TELEGRAM_CHAT_ID bên dưới
//
// 7. GỬI TIN NHẮN ĐẦU TIÊN cho bot của bạn (bấm Start trong bot)
//    → Bước này BẮT BUỘC để bot có quyền gửi tin nhắn cho bạn!
//
// ===== SETUP APPS SCRIPT =====
//
// Bước 1: Mở Google Sheet: https://docs.google.com/spreadsheets/d/1D4aOiSAufIZVgSd1_Nv9sJQSErUaGJeKOf6hXoEexig/edit?gid=0#gid=0
// Bước 2: Vào menu Extensions > Apps Script
// Bước 3: Xóa hết code cũ, paste đoạn code dưới đây:
//
// ====== BẮT ĐẦU CODE APPS SCRIPT ======

// ⚠️ THAY 2 GIÁ TRỊ NÀY BẰNG THÔNG TIN BOT CỦA BẠN:
var TELEGRAM_BOT_TOKEN = '8933854486:AAFsgHJWO0wzTLQ7VeQCfeREEyeJbKoFAQs';
var TELEGRAM_CHAT_ID = '6284891284';

// Hàm gửi tin nhắn Telegram
function sendTelegram(text) {
  var url = 'https://api.telegram.org/bot' + TELEGRAM_BOT_TOKEN + '/sendMessage';
  var payload = {
    'chat_id': TELEGRAM_CHAT_ID,
    'text': text
  };
  var options = {
    'method': 'post',
    'contentType': 'application/json',
    'payload': JSON.stringify(payload),
    'muteHttpExceptions': true
  };
  var response = UrlFetchApp.fetch(url, options);
  return JSON.parse(response.getContentText());
}

// ⭐ HÀM TEST - Chạy hàm này để kiểm tra bot có hoạt động không
// Vào Apps Script > chọn hàm testTelegram > bấm Run
function testTelegram() {
  var result = sendTelegram('Test tu Apps Script - Bot hoat dong tot!');
  Logger.log(result);
}

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var telegramStatus = '';
  
  try {
    var data = JSON.parse(e.postData.contents);
    
    // ====== BƯỚC 1: GHI DATA VÀO SHEET TRƯỚC (luôn thành công) ======
    sheet.appendRow([
      data.submittedAt,
      data.name,
      data.phone,
      data.package,
      data.type || 'file',
      data.address || '',
      data.source,
      data.utm_source || 'organic',
      data.utm_medium || '',
      data.utm_campaign || ''
    ]);
    
    // ====== BƯỚC 2: GỬI THÔNG BÁO QUA TELEGRAM ======
    try {
      var isBook = data.type === 'book';
      var utmLabel = data.utm_source || 'organic';
      
      var lines = [];
      lines.push((isBook ? '📚' : '📄') + ' DON HANG MOI');
      lines.push('━━━━━━━━━━━━━━━');
      lines.push('📋 Loai: ' + (isBook ? 'Sach giay' : 'File so'));
      lines.push('👤 Ho ten: ' + data.name);
      lines.push('📞 SDT/Zalo: ' + data.phone);
      lines.push('📦 Goi: ' + data.package);
      if (data.address) lines.push('🏠 Dia chi: ' + data.address);
      lines.push('🕐 Thoi gian: ' + data.submittedAt);
      lines.push('🌐 Nguon: ' + data.source);
      lines.push('📢 Nguon QC: ' + utmLabel);
      if (data.utm_campaign) lines.push('📣 Chien dich: ' + data.utm_campaign);
      lines.push('━━━━━━━━━━━━━━━');
      lines.push('👉 Zalo: https://zalo.me/' + data.phone);
      
      var message = lines.join('\n');
      var result = sendTelegram(message);
      
      if (result.ok) {
        telegramStatus = 'sent';
      } else {
        telegramStatus = 'telegram_error: ' + result.description;
      }
    } catch (tgErr) {
      // Telegram lỗi nhưng data ĐÃ ĐƯỢC LƯU ở bước 1
      telegramStatus = 'telegram_error: ' + tgErr.message;
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      telegram: telegramStatus
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (err) {
    // Lỗi parse JSON hoặc lỗi ghi sheet
    sheet.appendRow([
      new Date().toLocaleString('vi-VN'),
      'ERROR',
      err.message,
      e.postData ? e.postData.contents : 'no postData',
      e.postData ? e.postData.type : 'no type'
    ]);
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: err.message
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// ====== KẾT THÚC CODE APPS SCRIPT ======
//
// Bước 4: Bấm Deploy > Manage deployments > Chỉnh sửa (icon bút chì)
// Bước 5: Chọn Version = New version
// Bước 6: Bấm Deploy
//
// ===== CẬP NHẬT HEADER GOOGLE SHEET =====
// Thêm 3 cột mới vào cuối hàng header (sau cột "source"):
//
//   ... | source | Nguồn QC | Kênh QC | Chiến dịch
//
// ===== CÁCH ĐẶT LINK ADS =====
// 
// Facebook Ads:
//   https://tailieutiengtrung.com/sp/tron-bo?utm_source=facebook&utm_medium=cpc&utm_campaign=ten_chien_dich
//
// TikTok Ads:
//   https://tailieutiengtrung.com/sp/tron-bo?utm_source=tiktok&utm_medium=cpc&utm_campaign=ten_chien_dich
//
// View tự nhiên (không cần thêm gì):
//   https://tailieutiengtrung.com/sp/tron-bo
//   → Tự động ghi "organic" vào cột Nguồn QC
