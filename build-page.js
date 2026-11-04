// Membangun src/index.html dari app.html (sumber tunggal). Tanpa CDN: font sistem, CSP ketat.
const fs = require('fs'), path = require('path');
const app = fs.readFileSync(path.join(__dirname, 'app.html'), 'utf8');
// three.js r171 (MIT) di-vendor lokal; disisipkan sebagai teks dan dimuat lewat blob: (bekerja di file:// Electron & web, tanpa CDN)
const vx = (id, f) => { const t = fs.readFileSync(path.join(__dirname, 'vendor', 'three', f), 'utf8'); if (/<\/script/i.test(t)) throw new Error(f); return `<script type="text/plain" id="${id}">${t}</script>\n`; };
const body = app + '\n' + vx('vx-three-core', 'three.core.min.js') + vx('vx-three', 'three.module.min.js') + vx('vx-three-env', 'RoomEnvironment.js');
const head = `<!doctype html>
<html lang="id">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="author" content="Pindo Tutuko">
<meta name="description" content="Rancang Perumahan — studi tapak, kavling, desain tipe rumah, RAB, kelayakan bisnis, dan KPR. Dibuat oleh Pindo Tutuko.">
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' blob:; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://tile.openstreetmap.org; connect-src https://nominatim.openstreetmap.org">
</head>
<body>
`;
fs.mkdirSync(path.join(__dirname, 'src'), { recursive: true });
fs.writeFileSync(path.join(__dirname, 'src', 'index.html'), head + body + '\n</body>\n</html>\n');
// Versi web untuk menu Tools pindotutuko.id: tombol kembali ke Beranda (pt-back.js) dan izin koneksi ke situs sendiri.
const webHead = head.replace("connect-src https://nominatim.openstreetmap.org", "connect-src 'self' https://nominatim.openstreetmap.org");
fs.mkdirSync(path.join(__dirname, 'web'), { recursive: true });
fs.writeFileSync(path.join(__dirname, 'web', 'index.html'), webHead + body + '\n<script src="/wp-content/themes/pindotutuko/assets/pt-back.js?v=7" defer></script>\n</body>\n</html>\n');
console.log('src/index.html + web/index.html written');
