## Cloudflare Pages Routing
- Cloudflare Pages has **pretty URLs** enabled by default: `file.html` is served at `/file`, and `/file.html` redirects to `/file`.
- Do NOT use `_redirects` rewrites (200 status) where the destination is a real `.html` file that matches the same base name pattern. This causes redirect loops.
- For SPA-style routing where multiple URLs serve the same HTML template, create individual `.html` copies for each route instead of using `_redirects` rewrites.
- Routes that map to a file with a DIFFERENT base name from the source (e.g., `/tailieu` → `tailieu.html`) are handled automatically by pretty URLs — no redirect rule needed.
