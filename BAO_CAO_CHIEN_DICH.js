// ===== BÁO CÁO HIỆU QUẢ CHIẾN DỊCH (Lead / Thanh toán / Doanh thu / Chi phí / CPL / ROAS) =====
//
// CÁCH DÙNG:
//   1. Google Sheet > Tiện ích mở rộng > Apps Script
//   2. Bấm dấu "+" cạnh "Tệp" > Tập lệnh > đặt tên "BaoCao"
//   3. Dán TOÀN BỘ nội dung file này vào, bấm Lưu (Ctrl + S)
//   4. Chọn hàm "setupBaoCao" ở thanh trên cùng > bấm ▶ Chạy (cấp quyền nếu được hỏi)
//   5. Quay lại Sheet: sẽ có 3 tab mới: "Tổng hợp", "Chi phí", "_Data"
//
//   - KHÔNG cần Deploy lại (hàm này chỉ tạo công thức, không ảnh hưởng webhook nhận đơn).
//   - Chạy lại setupBaoCao() bất cứ lúc nào: chỉ dựng lại tab "Tổng hợp" + "_Data",
//     GIỮ NGUYÊN dữ liệu tab "Chi phí" và khoảng ngày đang lọc.
//
// ====== BẮT ĐẦU CODE ======

var BC = {
  MAIN_SHEET: '',          // '' = tự lấy TAB ĐẦU TIÊN (tab đơn hàng). Hoặc ghi rõ tên tab.
  DATA_SHEET: '_Data',
  COST_SHEET: 'Chi phí',
  REPORT_SHEET: 'Tổng hợp',
  CAMPAIGN_SHEET: 'Campaigns',
  COL_DATE: 'A',           // Thời gian đặt đơn
  COL_SOURCE: 'H',         // Nguồn QC (utm_source: facebook / organic / ...)
  COL_CAMPAIGN: 'J',       // ID chiến dịch
  // Đơn KHÔNG có ID chiến dịch được gom theo nguồn:
  FB_ORGANIC_ID: 'FB_ORGANIC', FB_ORGANIC_NAME: 'Facebook Tự nhiên (Post/Page)', // nguồn chứa "facebook" hoặc = "fb"
  ORGANIC_ID: 'ORGANIC', ORGANIC_NAME: 'Khách tự nhiên (Organic)',                // nguồn = "organic"
  COL_STATUS: 'L',         // Trạng thái (2 = đã thanh toán)
  COL_AMOUNT: 'M',         // Số tiền thanh toán (đơn vị nghìn đồng)
  PAID_CODE: '2',
  AMOUNT_MULTIPLIER: 1000, // O ghi 99 => 99.000đ
  COST_MULTIPLIER: 1.1,    // Chi phí QC × 1.1 (cộng 10% thuế VAT). Không tính thuế thì để 1
  CIR_GOOD: 0.3,           // CIR <= 30%  => tô xanh
  CIR_BAD: 0.5             // CIR <= 50%  => tô vàng; trên 50% => tô đỏ
};

function q_(name) { return "'" + String(name).replace(/'/g, "''") + "'"; }

function getOrCreateSheet_(ss, name) {
  var sh = ss.getSheetByName(name);
  if (!sh) sh = ss.insertSheet(name, ss.getSheets().length); // luôn đặt ở CUỐI, không chiếm vị trí tab đơn hàng
  return sh;
}

function setupBaoCao() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var main = BC.MAIN_SHEET ? ss.getSheetByName(BC.MAIN_SHEET) : ss.getSheets()[0];
  if (!main) throw new Error('Không tìm thấy tab đơn hàng: ' + BC.MAIN_SHEET);
  var reserved = [BC.DATA_SHEET, BC.COST_SHEET, BC.REPORT_SHEET, BC.CAMPAIGN_SHEET];
  if (reserved.indexOf(main.getName()) !== -1) {
    throw new Error('Tab đầu tiên phải là tab ĐƠN HÀNG. Hãy kéo tab đơn hàng về vị trí đầu tiên rồi chạy lại.');
  }

  var M = q_(main.getName());
  var D = q_(BC.DATA_SHEET);
  var C = q_(BC.COST_SHEET);
  var R = q_(BC.REPORT_SHEET);
  var CP = q_(BC.CAMPAIGN_SHEET);
  var cDate = BC.COL_DATE, cCamp = BC.COL_CAMPAIGN, cStat = BC.COL_STATUS, cAmt = BC.COL_AMOUNT, cSrc = BC.COL_SOURCE;

  // ---------- TAB "Chi phí" (bạn tự nhập, script KHÔNG xóa dữ liệu) ----------
  var cost = getOrCreateSheet_(ss, BC.COST_SHEET);
  cost.getRange('A1:C1').setValues([['Ngày', 'ID chiến dịch', 'Chi phí (VNĐ)']])
    .setFontWeight('bold').setBackground('#fde68a');
  cost.getRange('A2:A').setNumberFormat('dd/mm/yyyy');
  cost.getRange('B2:B').setNumberFormat('@');        // ID 18 số => văn bản thuần túy
  cost.getRange('C2:C').setNumberFormat('#,##0');
  cost.setFrozenRows(1);
  cost.setColumnWidth(1, 110); cost.setColumnWidth(2, 190); cost.setColumnWidth(3, 140);

  // ---------- TAB "Tổng hợp": giữ lại khoảng ngày đang lọc ----------
  var report = getOrCreateSheet_(ss, BC.REPORT_SHEET);
  var oldFrom = report.getRange('B1').getValue();
  var oldTo = report.getRange('D1').getValue();
  report.clear();
  report.clearConditionalFormatRules();

  // ---------- TAB "_Data": chuẩn hóa dữ liệu (chỉ dùng hàm cơ bản) ----------
  // Khóa ID dạng "id" + số để Sheets luôn coi là văn bản (ID 18 số không bị làm tròn)
  var data = getOrCreateSheet_(ss, BC.DATA_SHEET);
  data.clear();
  // Đảm bảo đủ số dòng để công thức mảng trải xuống không bị lỗi
  var needRows = Math.max(main.getMaxRows(), cost.getMaxRows()) + 10;
  if (data.getMaxRows() < needRows) data.insertRowsAfter(data.getMaxRows(), needRows - data.getMaxRows());
  data.getRange('A1:O1').setValues([[
    'Ngày', 'Khóa ID', 'Đã TT (1/0)', 'Doanh thu (VNĐ)', 'Trong khoảng (1/0)', '',
    'Từ ngày', 'Đến ngày', '', 'Khóa ID chi phí', 'Chi phí trong khoảng', '',
    'ID có lead', 'ID có chi phí', ''
  ]]).setFontWeight('bold');

  var src = function (col) { return M + '!' + col + '2:' + col; };
  var A = src(cDate);

  // Khoảng ngày (đọc từ ô B1 / D1 của tab Tổng hợp)
  data.getRange('G2').setFormula(`=IF(${R}!B1="",0,${R}!B1)`);
  data.getRange('H2').setFormula(`=IF(${R}!D1="",99999,${R}!D1)`);

  // Ngày: hỗ trợ cả ô dạng ngày-giờ thật lẫn chuỗi "21:45:09 13/10/2026"
  data.getRange('A2').setFormula(
    `=ARRAYFORMULA(IF(${A}="","",IF(ISNUMBER(${A}),INT(${A}),IFERROR(DATE(` +
    `VALUE(REGEXEXTRACT(TO_TEXT(${A}),"/(\\d{4})")),` +
    `VALUE(REGEXEXTRACT(TO_TEXT(${A}),"/(\\d{1,2})/")),` +
    `VALUE(REGEXEXTRACT(TO_TEXT(${A}),"(\\d{1,2})/"))),""))))`
  );
  // Có ID chiến dịch => "id<ID>". Không có ID => gom theo nguồn (cột Nguồn QC):
  //   chứa "facebook" / = "fb"  => "idFB_ORGANIC"  (fbclid từ bài viết thường trên page)
  //   = "organic"                => "idORGANIC"
  //   nguồn khác / dòng trống    => bỏ qua
  var srcTxt = `LOWER(TRIM(TO_TEXT(${src(cSrc)})))`;
  data.getRange('B2').setFormula(
    `=ARRAYFORMULA(IF(TO_TEXT(${src(cCamp)})<>"","id"&TO_TEXT(${src(cCamp)}),` +
    `IF(TO_TEXT(${A})="","",` +
    `IF(REGEXMATCH(${srcTxt},"facebook|^fb$"),"id${BC.FB_ORGANIC_ID}",` +
    `IF(${srcTxt}="organic","id${BC.ORGANIC_ID}","")))))`
  );
  data.getRange('C2').setFormula(`=ARRAYFORMULA(IF(TRIM(TO_TEXT(${src(cStat)}))="${BC.PAID_CODE}",1,0))`);
  data.getRange('D2').setFormula(
    `=ARRAYFORMULA(IF(TRIM(TO_TEXT(${src(cStat)}))="${BC.PAID_CODE}",IFERROR(VALUE(TRIM(TO_TEXT(${src(cAmt)}))),0)*${BC.AMOUNT_MULTIPLIER},0))`
  );
  data.getRange('E2').setFormula('=ARRAYFORMULA(IF(A2:A="",0,IF((A2:A>=$G$2)*(A2:A<=$H$2),1,0)))');
  // Khóa ghép "idXXX|1" (1 = trong khoảng ngày) để dùng SUMIF/COUNTIF (SUMIFS không trải xuống từng dòng trong ARRAYFORMULA)
  data.getRange('F1').setValue('Khóa|Trong khoảng');
  data.getRange('F2').setFormula('=ARRAYFORMULA(IF(B2:B="","",B2:B&"|"&E2:E))');

  // Chi phí
  data.getRange('J2').setFormula(`=ARRAYFORMULA(IF(TO_TEXT(${C}!B2:B)="","","id"&TO_TEXT(${C}!B2:B)))`);
  data.getRange('K2').setFormula(
    `=ARRAYFORMULA(IF(TO_TEXT(${C}!B2:B)="",0,IF((${C}!A2:A>=$G$2)*(${C}!A2:A<=$H$2),IFERROR(VALUE(${C}!C2:C),0)*${BC.COST_MULTIPLIER},0)))`
  );

  // Danh sách khóa ID có lead / có chi phí trong khoảng ngày
  data.getRange('M2').setFormula('=IFERROR(FILTER(B2:B,B2:B<>"",E2:E=1),"")');
  data.getRange('N2').setFormula('=IFERROR(FILTER(J2:J,J2:J<>"",K2:K>0),"")');
  data.getRange('A2:A').setNumberFormat('dd/mm/yyyy');
  data.getRange('G2:H2').setNumberFormat('dd/mm/yyyy');

  // ---------- Dựng TAB "Tổng hợp" ----------
  // Dòng 1: bộ lọc ngày
  report.getRange('A1').setValue('Từ ngày:').setFontWeight('bold');
  report.getRange('C1').setValue('Đến ngày:').setFontWeight('bold');
  report.getRange('E1').setValue('← Nhập ngày (dd/mm/yyyy). Để trống = xem toàn bộ').setFontColor('#6b7280').setFontStyle('italic');
  var dateRule = SpreadsheetApp.newDataValidation().requireDate().setAllowInvalid(false)
    .setHelpText('Nhập ngày dạng dd/mm/yyyy, hoặc để trống').build();
  report.getRange('B1').setDataValidation(dateRule).setNumberFormat('dd/mm/yyyy').setBackground('#fef9c3');
  report.getRange('D1').setDataValidation(dateRule).setNumberFormat('dd/mm/yyyy').setBackground('#fef9c3');
  if (oldFrom instanceof Date) report.getRange('B1').setValue(oldFrom);
  if (oldTo instanceof Date) report.getRange('D1').setValue(oldTo);

  // Dòng 2: tiêu đề
  report.getRange('A2:J2').setValues([[
    'ID chiến dịch', 'Tên chiến dịch', 'Lead', 'Đã thanh toán', 'Tỉ lệ CĐ',
    'Doanh thu (VNĐ)', BC.COST_MULTIPLIER === 1 ? 'Chi phí QC (VNĐ)' : 'Chi phí QC (VNĐ, gồm VAT)', 'CPL (VNĐ/lead)', 'Chi phí / đơn TT', 'CIR (Chi phí / Doanh thu)'
  ]]).setFontWeight('bold').setBackground('#1e3a8a').setFontColor('#ffffff').setWrap(true);

  // Dòng 3: tổng cộng
  report.getRange('A3').setValue('TỔNG CỘNG');
  report.getRange('C3').setFormula('=SUM(C4:C)');
  report.getRange('D3').setFormula('=SUM(D4:D)');
  report.getRange('E3').setFormula('=IF(C3=0,0,D3/C3)');
  report.getRange('F3').setFormula('=SUM(F4:F)');
  report.getRange('G3').setFormula('=SUM(G4:G)');
  report.getRange('H3').setFormula('=IF(C3=0,"",G3/C3)');
  report.getRange('I3').setFormula('=IF(D3=0,"",G3/D3)');
  report.getRange('J3').setFormula('=IF(G3=0,"",IF(F3=0,"Chưa có DT",G3/F3))');
  report.getRange('A3:J3').setFontWeight('bold').setBackground('#dbeafe');

  // Dòng 4+: từng chiến dịch (gồm cả chiến dịch có chi phí nhưng chưa có lead trong khoảng ngày)
  report.getRange('A4').setFormula(
    `=IFERROR(SORT(UNIQUE(FILTER(ARRAYFORMULA(MID(FLATTEN(${D}!M2:N),3,100)),FLATTEN(${D}!M2:N)<>""))),"")`
  );
  report.getRange('B4').setFormula(
    `=ARRAYFORMULA(IF(A4:A="","",` +
    `IF(A4:A="${BC.FB_ORGANIC_ID}","${BC.FB_ORGANIC_NAME}",` +
    `IF(A4:A="${BC.ORGANIC_ID}","${BC.ORGANIC_NAME}",` +
    `IFERROR(VLOOKUP(A4:A,${CP}!A:B,2,FALSE),"(chưa có tên)")))))`
  );
  var key = '"id"&A4:A&"|1"';
  report.getRange('C4').setFormula(`=ARRAYFORMULA(IF(A4:A="","",COUNTIF(${D}!F2:F,${key})))`);
  report.getRange('D4').setFormula(`=ARRAYFORMULA(IF(A4:A="","",SUMIF(${D}!F2:F,${key},${D}!C2:C)))`);
  report.getRange('E4').setFormula('=ARRAYFORMULA(IF(A4:A="","",IF(C4:C=0,0,D4:D/C4:C)))');
  report.getRange('F4').setFormula(`=ARRAYFORMULA(IF(A4:A="","",SUMIF(${D}!F2:F,${key},${D}!D2:D)))`);
  report.getRange('G4').setFormula(`=ARRAYFORMULA(IF(A4:A="","",SUMIF(${D}!J2:J,"id"&A4:A,${D}!K2:K)))`);
  report.getRange('H4').setFormula('=ARRAYFORMULA(IF(A4:A="","",IF(C4:C=0,"",G4:G/C4:C)))');
  report.getRange('I4').setFormula('=ARRAYFORMULA(IF(A4:A="","",IF(D4:D=0,"",G4:G/D4:D)))');
  report.getRange('J4').setFormula('=ARRAYFORMULA(IF(A4:A="","",IF(G4:G=0,"",IF(F4:F=0,"Chưa có DT",G4:G/F4:F))))');

  // Định dạng số
  report.getRange('A3:A').setNumberFormat('@');
  report.getRange('C3:D').setNumberFormat('0');
  report.getRange('E3:E').setNumberFormat('0.0%');
  report.getRange('F3:I').setNumberFormat('#,##0');
  report.getRange('J3:J').setNumberFormat('0.0%').setHorizontalAlignment('right');
  report.setFrozenRows(3);
  report.setColumnWidth(1, 170); report.setColumnWidth(2, 220);
  for (var c = 3; c <= 10; c++) report.setColumnWidth(c, 115);

  // Tô màu CIR (càng thấp càng tốt): <= CIR_GOOD xanh, <= CIR_BAD vàng, cao hơn hoặc "Chưa có DT" đỏ
  // - Dòng TỔNG (3): chỉ tô ô J3 (giữ nền xanh dương của dòng tổng)
  // - Dòng chiến dịch (4+): tô CẢ DÒNG A:J theo giá trị cột J
  var good = Math.round(BC.CIR_GOOD * 100), bad = Math.round(BC.CIR_BAD * 100);
  var organicRows = report.getRange('A4:J');
  var cirLevels = [
    { cond: function (c) { return 'AND(ISNUMBER(' + c + '),' + c + '*100<=' + good + ')'; }, bg: '#dcfce7', fg: '#166534' },
    { cond: function (c) { return 'AND(ISNUMBER(' + c + '),' + c + '*100<=' + bad + ')'; }, bg: '#fef9c3', fg: '#854d0e' },
    { cond: function (c) { return 'OR(AND(ISNUMBER(' + c + '),' + c + '*100>' + bad + '),' + c + '="Chưa có DT")'; }, bg: '#fee2e2', fg: '#991b1b' }
  ];
  var rules = [
    SpreadsheetApp.newConditionalFormatRule()
      .whenFormulaSatisfied('=OR($A4="' + BC.FB_ORGANIC_ID + '",$A4="' + BC.ORGANIC_ID + '")')
      .setBackground('#f3f4f6').setFontColor('#374151').setRanges([organicRows]).build()
  ];
  cirLevels.forEach(function (lv) {
    rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied('=' + lv.cond('J3'))
      .setBackground(lv.bg).setFontColor(lv.fg).setRanges([report.getRange('J3')]).build());
    rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied('=' + lv.cond('$J4'))
      .setBackground(lv.bg).setFontColor(lv.fg).setRanges([report.getRange('A4:J')]).build());
  });
  report.setConditionalFormatRules(rules);

  data.hideSheet();
  ss.setActiveSheet(report);
  SpreadsheetApp.flush();

  // ---------- Tự kiểm tra: ô nào còn lỗi thì ghi ra Nhật ký ----------
  var errors = [];
  [[data, 'A2:N2'], [report, 'A3:J4']].forEach(function (pair) {
    var r = pair[0].getRange(pair[1]);
    var vals = r.getDisplayValues(), fx = r.getFormulas();
    for (var i = 0; i < vals.length; i++) for (var j = 0; j < vals[i].length; j++) {
      if (/^#/.test(vals[i][j]) && fx[i][j]) {
        errors.push(pair[0].getName() + '!' + r.getCell(i + 1, j + 1).getA1Notation() + ' = ' + vals[i][j] + '  |  ' + fx[i][j]);
      }
    }
  });
  Logger.log('Tab đơn hàng: ' + main.getName() + '  |  Ngôn ngữ Sheet: ' + ss.getSpreadsheetLocale());
  var paidCount = data.getRange('C2:C').getValues().reduce(function (s, r) { return s + (Number(r[0]) || 0); }, 0);
  Logger.log('Cột trạng thái = ' + BC.COL_STATUS + ', cột số tiền = ' + BC.COL_AMOUNT +
    '  |  Số đơn nhận diện ĐÃ THANH TOÁN (' + BC.COL_STATUS + ' = ' + BC.PAID_CODE + '): ' + paidCount);
  if (paidCount === 0) Logger.log('⚠️ Không có đơn nào được tính là đã thanh toán → kiểm tra lại chữ cột COL_STATUS / COL_AMOUNT ở đầu file.');
  if (errors.length) {
    Logger.log('⚠️ CÒN LỖI Ở CÁC Ô SAU (chụp màn hình gửi lại):\n' + errors.join('\n'));
  } else {
    Logger.log('✅ Xong! Không có ô nào bị lỗi.');
  }
}

// ====== HÀM KIỂM TRA: chạy khi báo cáo ra số liệu sai ======
// Chọn hàm "kiemTraBaoCao" > ▶ Chạy > chụp màn hình Nhật ký gửi lại
function kiemTraBaoCao() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var main = BC.MAIN_SHEET ? ss.getSheetByName(BC.MAIN_SHEET) : ss.getSheets()[0];
  var data = ss.getSheetByName(BC.DATA_SHEET);
  var cost = ss.getSheetByName(BC.COST_SHEET);
  var show = function (v) {
    if (v instanceof Date) return 'NGÀY(' + Utilities.formatDate(v, ss.getSpreadsheetTimeZone(), 'dd/MM/yyyy') + ')';
    if (typeof v === 'number') return 'SỐ(' + v + ')';
    if (v === '') return 'TRỐNG';
    var codes = String(v).split('').map(function (ch) { return ch.charCodeAt(0); }).join(',');
    return 'CHỮ("' + v + '" mã:' + codes + ')';
  };
  var colIdx = function (letter) { return letter.toUpperCase().charCodeAt(0) - 64; };

  var from = data.getRange('G2').getValue(), to = data.getRange('H2').getValue();
  Logger.log('Khoảng lọc: ' + show(from) + ' → ' + show(to) + ' | Múi giờ: ' + ss.getSpreadsheetTimeZone());

  // --- Đơn hàng trong khoảng ngày ---
  var n = main.getLastRow() - 1;
  var mainVals = main.getRange(2, 1, n, Math.max(colIdx(BC.COL_AMOUNT), colIdx(BC.COL_STATUS), colIdx(BC.COL_CAMPAIGN))).getValues();
  var dVals = data.getRange(2, 1, n, 5).getValues();
  var shown = 0;
  Logger.log('--- ĐƠN TRONG KHOẢNG (tối đa 25 dòng có giá trị ở cột ' + BC.COL_STATUS + ') ---');
  for (var i = 0; i < n && shown < 25; i++) {
    if (dVals[i][4] !== 1) continue;
    var st = mainVals[i][colIdx(BC.COL_STATUS) - 1];
    if (st === '') continue;
    shown++;
    Logger.log('Dòng ' + (i + 2) + ' | ' + BC.COL_STATUS + '=' + show(st) +
      ' | ' + BC.COL_AMOUNT + '=' + show(mainVals[i][colIdx(BC.COL_AMOUNT) - 1]) +
      ' | _Data: ĐãTT=' + dVals[i][2] + ', DoanhThu=' + dVals[i][3]);
  }
  if (!shown) Logger.log('Không có đơn nào trong khoảng ngày có giá trị ở cột ' + BC.COL_STATUS);

  // --- Tab Chi phí ---
  Logger.log('--- TAB CHI PHÍ (10 dòng đầu) ---');
  var cn = Math.min(10, cost.getLastRow() - 1);
  if (cn > 0) {
    var cVals = cost.getRange(2, 1, cn, 3).getValues();
    var kVals = data.getRange(2, 11, cn, 1).getValues();
    for (var j = 0; j < cn; j++) {
      Logger.log('Dòng ' + (j + 2) + ' | Ngày=' + show(cVals[j][0]) + ' | ID=' + show(cVals[j][1]) +
        ' | Chi phí=' + show(cVals[j][2]) + ' | _Data tính được=' + kVals[j][0]);
    }
  } else {
    Logger.log('Tab Chi phí chưa có dữ liệu');
  }
}

// ====== KẾT THÚC CODE ======
