const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function generatePDF(url, outputPath) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set viewport to desktop size
  await page.setViewport({ width: 1280, height: 1080 });
  
  // Go to the local file URL
  await page.goto(url, { waitUntil: 'networkidle0' });
  
  // Scroll to bottom to ensure lazy-loaded elements (if any) are triggered
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      let totalHeight = 0;
      let distance = 100;
      let timer = setInterval(() => {
        let scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });

  // Generate PDF
  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '20px', right: '20px', bottom: '20px', left: '20px' }
  });

  await browser.close();
  console.log(`Generated: ${outputPath}`);
}

async function main() {
  const baseDir = __dirname;
  const indexUrl = `file:///${baseDir.replace(/\\/g, '/')}/index.html`;
  const chinhSachUrl = `file:///${baseDir.replace(/\\/g, '/')}/chinh-sach.html`;

  const files = [
    { name: '1. Bản chụp website thông tin về người sở hữu.pdf', url: indexUrl },
    { name: '2. Bản chụp website thông tin về hàng hóa dịch vụ.pdf', url: indexUrl },
    { name: '3. Bản chụp website thông tin về giá.pdf', url: indexUrl },
    { name: '4. Bản chụp website thông tin về điều kiện giao dịch chung.pdf', url: chinhSachUrl },
    { name: '5. Bản chụp website thông tin về vận chuyển và giao nhận.pdf', url: chinhSachUrl },
    { name: '6. Bản chụp website thông tin về các phương thức thanh toán.pdf', url: chinhSachUrl },
    { name: '7. Bản chụp website chính sách bảo mật.pdf', url: chinhSachUrl }
  ];

  for (const file of files) {
    const outputPath = path.join(baseDir, file.name);
    await generatePDF(file.url, outputPath);
  }
}

main().catch(console.error);
