// Membangun src/index.html dari app.html (sumber tunggal). Tanpa CDN: font sistem, CSP ketat.
const fs = require('fs'), path = require('path');
const body = fs.readFileSync(path.join(__dirname, 'app.html'), 'utf8');
const head = `<!doctype html>
<html lang="id">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="author" content="Pindo Tutuko">
<meta name="description" content="Rancang Perumahan — studi tapak, kavling, desain tipe rumah, RAB, kelayakan bisnis, dan KPR. Dibuat oleh Pindo Tutuko.">
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; connect-src 'none'">
</head>
<body>
`;
fs.mkdirSync(path.join(__dirname, 'src'), { recursive: true });
fs.writeFileSync(path.join(__dirname, 'src', 'index.html'), head + body + '\n</body>\n</html>\n');
console.log('src/index.html written');
