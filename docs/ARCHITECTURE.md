# Arsitektur Rancang Perumahan

- `app.html` — sumber tunggal (CSS + HTML + JS). `build-page.js` membungkusnya menjadi `src/index.html` (CSP ketat, tanpa CDN).
- `vendor/three/` — three.js r171 (MIT): `three.core.min.js`, `three.module.min.js`, `RoomEnvironment.js`. `build-page.js` menyisipkannya sebagai `<script type="text/plain">`; `load3D()` membuat URL blob: lalu `import()` (bekerja di file:// Electron dan web). `make3D()` di `app.html` membangun rumah prosedural dari `floorPlan(t)` + data 3D di `STYLES` (wallT, roofT, accT, col, slats, shutter, pediment, gableT, …). Dua panggung WebGL: tampak utama dan thumbnail gaya.
- `main.js`, `preload.js` — Electron; jembatan `window.rpDesktop` (save, open, pdf).
- Mesin hitung murni di objek `RP` (dapat diuji tanpa DOM):
  - `annuity`, `kpr` (bunga tetap→mengambang, jadwal tahunan), `npv`, `irr`, `irrMonthly`
  - `layout(p, types)` — lahan persegi panjang W×D; lajur depan RTH/fasum/makam; jalan utama (tengah/tepi); blok berulang: jalan lingkungan + 2 deret kavling saling membelakangi; tipe dipilih per blok untuk mendekati porsi; sisa lahan → taman.
  - `house(t, rules)` — KDB, KLB, KDH, kecukupan kedalaman.
  - `feasibility(P, lay, styleFactor)` — biaya, pendapatan, arus kas bulanan (pola inden), pembiayaan pengembang (plafon, bunga, pelunasan dari kas masuk), NPV/IRR proyek & ekuitas.
- Gambar SVG manual: `sitePlanSVG`, `isoSVG` (isometrik per gaya), `floorPlanSVG`, `cashSVG`, `donut`.
- Data proyek `P` disimpan di `localStorage` (`rp.project`) dan dapat diekspor `.json`.
- Rujukan: `CREDIT` (regulasi terverifikasi) dan `ASUMSI` (nilai yang harus disesuaikan pengguna).
