// ===== HƯỚNG DẪN SETUP GOOGLE APPS SCRIPT =====
// 
// Bước 1: Mở Google Sheet: https://docs.google.com/spreadsheets/d/1QCHPJKubUye_0LYJLeE-TUraaDubNlfj_bOwnMYBkA0/edit
// Bước 2: Vào menu Extensions > Apps Script
// Bước 3: Xóa hết code cũ, paste đoạn code dưới đây:
//
// ====== BẮT ĐẦU CODE APPS SCRIPT ======

function doGet(e) {
  var sheet = SpreadsheetApp.openById("1QCHPJKubUye_0LYJLeE-TUraaDubNlfj_bOwnMYBkA0").getActiveSheet();
  
  var name = e.parameter.name || "";
  var phone = e.parameter.phone || "";
  var pkg = e.parameter.package || "";
  var time = e.parameter.time || "";
  
  sheet.appendRow([time, name, phone, pkg]);
  
  return ContentService.createTextOutput(JSON.stringify({status: "ok"}))
    .setMimeType(ContentService.MimeType.JSON);
}

// ====== KẾT THÚC CODE APPS SCRIPT ======
//
// Bước 4: Bấm Deploy > New deployment
// Bước 5: Chọn Type = Web app
// Bước 6: Execute as = Me, Who has access = Anyone
// Bước 7: Bấm Deploy, copy URL
// Bước 8: Paste URL vào file script.js (thay thế URL trong hàm submitOrder)
//
// Trước khi deploy, thêm header vào Sheet: Thời gian | Tên | SĐT | Gói
