const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function generatePDF(url, outputPath, selectorToKeep) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set viewport to desktop size
  await page.setViewport({ width: 1280, height: 1080 });
  
  // Go to the local file URL
  await page.goto(url, { waitUntil: 'networkidle0' });
  
  // Scroll to bottom to ensure lazy-loaded elements and animations are triggered
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      let distance = 100;
      let timer = setInterval(() => {
        let scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          resolve();
        }
      }, 50);
    });
  });

  // Wait a bit for animations to finish
  await new Promise(r => setTimeout(r, 1000));

  let clipRect = null;

  // Isolate the element to keep the PDF small and focused by hiding siblings
  if (selectorToKeep) {
    clipRect = await page.evaluate((sel) => {
      // Force all animations to end and opacity to be 1
      const style = document.createElement('style');
      style.innerHTML = `
        * {
          transition: none !important;
          animation: none !important;
          opacity: 1 !important;
          transform: none !important;
        }
      `;
      document.head.appendChild(style);

      const el = document.querySelector(sel);
      if (el) {
        document.querySelectorAll('body > *').forEach(child => {
          if (!child.contains(el) && child !== el && child.tagName !== 'SCRIPT' && child.tagName !== 'STYLE') {
            child.style.display = 'none';
          }
        });
        document.body.style.background = '#fff';
        
        // Ensure the element is visible and get its bounding box
        el.scrollIntoView();
        const rect = el.getBoundingClientRect();
        return {
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height
        };
      }
      return null;
    }, selectorToKeep);
  }

  // To solve the 5MB size issue, we take a JPEG screenshot and then put it into a PDF
  if (clipRect && clipRect.width > 0 && clipRect.height > 0) {
    // Expand the clip slightly for margin
    const margin = 20;
    const captureRect = {
      x: Math.max(0, clipRect.x - margin),
      y: Math.max(0, clipRect.y - margin),
      width: clipRect.width + margin * 2,
      height: clipRect.height + margin * 2
    };

    const imageBuffer = await page.screenshot({
      type: 'jpeg',
      quality: 75,
      clip: captureRect
    });

    // Create a new blank page to host the image
    const pdfPage = await browser.newPage();
    const base64Image = imageBuffer.toString('base64');
    
    await pdfPage.setContent(`
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { margin: 0; padding: 20px; display: flex; justify-content: center; background: white; }
          img { max-width: 100%; height: auto; }
        </style>
      </head>
      <body>
        <img src="data:image/jpeg;base64,${base64Image}" />
      </body>
      </html>
    `);

    // Generate PDF from the image page
    await pdfPage.pdf({
      path: outputPath,
      format: 'A4',
      printBackground: true
    });
    
  } else {
    // Fallback if no clip
    await page.pdf({
      path: outputPath,
      format: 'A4',
      printBackground: true,
      margin: { top: '20px', right: '20px', bottom: '20px', left: '20px' }
    });
  }

  await browser.close();
  console.log(`Generated: ${outputPath}`);
}

async function main() {
  const baseDir = __dirname;
  const indexUrl = `file:///${baseDir.replace(/\\/g, '/')}/index.html`;
  const chinhSachUrl = `file:///${baseDir.replace(/\\/g, '/')}/chinh-sach.html`;

  const files = [
    { name: '1. Bản chụp website thông tin về người sở hữu.pdf', url: indexUrl, selector: '.h-footer' },
    { name: '2. Bản chụp website thông tin về hàng hóa dịch vụ.pdf', url: indexUrl, selector: '.h-products' },
    { name: '3. Bản chụp website thông tin về giá.pdf', url: indexUrl, selector: '.h-products' },
    { name: '4. Bản chụp website thông tin về điều kiện giao dịch chung.pdf', url: chinhSachUrl, selector: '#huong-dan' },
    { name: '5. Bản chụp website thông tin về vận chuyển và giao nhận.pdf', url: chinhSachUrl, selector: '#giao-nhan' },
    { name: '6. Bản chụp website thông tin về các phương thức thanh toán.pdf', url: chinhSachUrl, selector: '#thanh-toan' },
    { name: '7. Bản chụp website chính sách bảo mật.pdf', url: chinhSachUrl, selector: '#bao-mat' }
  ];

  for (const file of files) {
    const outputPath = path.join(baseDir, file.name);
    await generatePDF(file.url, outputPath, file.selector);
  }
}

main().catch(console.error);
