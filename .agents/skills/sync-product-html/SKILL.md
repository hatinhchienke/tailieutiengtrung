---
name: Sync Product HTML Files
description: When editing sp/product.html, sync changes to all 6 individual product HTML files for Cloudflare Pages compatibility.
---

## Context
- Project is hosted on **Cloudflare Pages** (domain: tailieutiengtrung.com, pages.dev: tailieutiengtrung.pages.dev)
- API functions remain on **Vercel** at `tailieutiengtrung1.vercel.app`
- `sp/product.html` is the template for all product pages
- 6 individual copies exist for Cloudflare Pages pretty URL routing

## When to Trigger
After ANY edit to `sp/product.html`

## Steps
1. After editing `sp/product.html`, copy to all product files:
   - `sp/tron-bo.html`
   - `sp/cau-truc.html`
   - `sp/1200-cau.html`
   - `sp/tu-vung.html`
   - `sp/luyen-go.html`
   - `sp/60-bo-thu.html`

2. PowerShell command to sync all at once:
   ```powershell
   @('tron-bo','cau-truc','1200-cau','tu-vung','luyen-go','60-bo-thu') | ForEach-Object { Copy-Item "sp/product.html" "sp/$_.html" }
   ```

3. Commit and push — Cloudflare Pages auto-deploys from `main` branch.

## Architecture Notes
- `product.js` parses the product slug from `window.location.pathname` (e.g., `/sp/cau-truc` → slug `cau-truc`)
- Product data is defined in `product.js` PRODUCTS object, NOT in the HTML files
- The HTML files are identical templates; only the URL determines which product is shown
