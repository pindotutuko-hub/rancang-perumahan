# Panduan untuk agen AI (Claude Code; isi sama dengan AGENTS.md)

Proyek: **Rancang Perumahan** — studi tapak & kavling, desain tipe rumah (gaya fasad terkini), RAB & kelayakan bisnis, pembiayaan pengembang & KPR (web + desktop Electron). Pemilik: Prof. Pindo Tutuko (UNMER Malang). Baca `docs/ARCHITECTURE.md` sebelum mengubah kode.

## Aturan kerja
1. Edit **`app.html`** (sumber tunggal). Jangan edit `src/index.html`; regenerasi dengan `node build-page.js`.
2. Setelah perubahan: `npm install` (sekali) lalu **`npm test` harus lulus**. Tambahkan pemeriksaan angka untuk fitur baru di `tests/smoke.test.js`.
3. Bahasa antarmuka: Indonesia; istilah teknis Inggris + padanan Indonesia dalam kurung bila perlu.
4. **Tanpa halusinasi rujukan.** Rujukan regulasi di objek `CREDIT` wajib dapat diverifikasi (nomor, tahun, pasal, URL sumber resmi). Angka yang bukan regulasi masuk `ASUMSI` dan harus dapat diubah pengguna. Jangan menyalin tabel SNI.
5. Pertahankan kredit "Dibuat oleh Pindo Tutuko" (rel kiri, Tentang, laporan, berkas ekspor).
6. Jangan menambah library/CDN runtime; semua diagram SVG manual. Warna antarmuka lewat token CSS (mode gelap).
7. Jangan memakai `alert/confirm/prompt`; gunakan `confirmArm()`.
8. Rilis: naikkan `version` di `package.json` + catatan di `CHANGELOG.md`, push ke `main`; CI membangun .exe/.dmg dan menerbitkan GitHub Release.

## Perintah
```bash
npm install
npm test
node build-page.js
npm start
```
