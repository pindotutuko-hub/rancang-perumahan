# Arsitektur Rancang Perumahan

- `app.html` — sumber tunggal (CSS + HTML + JS). `build-page.js` membungkusnya menjadi `src/index.html` (CSP ketat, tanpa CDN).
- `main.js`, `preload.js` — Electron; jembatan `window.rpDesktop` (save, open, pdf).
- Mesin hitung murni di objek `RP` (dapat diuji tanpa DOM):
  - `annuity`, `kpr` (bunga tetap→mengambang, jadwal tahunan), `npv`, `irr`, `irrMonthly`
  - `layout(p, types)` — lahan persegi panjang W×D; lajur depan RTH/fasum/makam; jalan utama (tengah/tepi); blok berulang: jalan lingkungan + 2 deret kavling saling membelakangi; tipe dipilih per blok untuk mendekati porsi; sisa lahan → taman.
  - `house(t, rules)` — KDB, KLB, KDH, kecukupan kedalaman.
  - `feasibility(P, lay, styleFactor)` — biaya, pendapatan, arus kas bulanan (pola inden), pembiayaan pengembang (plafon, bunga, pelunasan dari kas masuk), NPV/IRR proyek & ekuitas.
- Gambar SVG manual: `sitePlanSVG`, `isoSVG` (isometrik per gaya), `floorPlanSVG`, `cashSVG`, `donut`.
- Data proyek `P` disimpan di `localStorage` (`rp.project`) dan dapat diekspor `.json`.
- Rujukan: `CREDIT` (regulasi terverifikasi) dan `ASUMSI` (nilai yang harus disesuaikan pengguna).
