// Uji asap + pemeriksaan angka. Jalankan: npm test (membangun src/index.html lebih dulu).
const fs = require('fs'), path = require('path'), assert = require('assert');
const { JSDOM } = require('jsdom');
require('../build-page.js');
const html = fs.readFileSync(path.join(__dirname, '..', 'src', 'index.html'), 'utf8');
const app = fs.readFileSync(path.join(__dirname, '..', 'app.html'), 'utf8');
const errors = [];
const dom = new JSDOM(html, { runScripts: 'dangerously', url: 'http://localhost/', pretendToBeVisual: true,
  beforeParse(w) { w.matchMedia = () => ({ matches: false, addListener() {}, removeListener() {} }); w.scrollTo = () => {}; w.URL.createObjectURL = () => 'blob:x'; w.addEventListener('error', e => errors.push(e.message)); } });
const w = dom.window, RP = w.RP;
let n = 0; const ok = (c, m) => { assert.ok(c, m); n++; };
const near = (a, b, tol, m) => ok(Math.abs(a - b) <= tol, `${m}: ${a} ≠ ${b}`);

// 1) anuitas: pokok 164.340.000, 5%/th, 240 bulan → ±Rp1.084.584 (cek rumus mandiri)
const P = 164340000, r = 0.05 / 12, nn = 240, ref = P * r / (1 - Math.pow(1 + r, -nn));
near(RP.annuity(P, 0.05, 240), ref, 0.01, 'anuitas');
near(RP.annuity(P, 0.05, 240), 1084573, 50, 'anuitas kisaran publik');
near(RP.annuity(1200, 0, 12), 100, 1e-9, 'anuitas bunga nol');
// 2) jadwal KPR: pokok lunas & total bunga = total bayar − pokok
const k = RP.kpr({ price: 200e6, dpPct: 0.1, i: 0.075, years: 20 });
near(k.rows[k.rows.length - 1].bal, 0, 1, 'sisa pokok akhir');
near(k.firstPay * 240 - k.principal, k.totalInterest, 5, 'total bunga');
const kf = RP.kpr({ price: 200e6, dpPct: 0.1, i: 0.06, years: 20, fixY: 3, iFloat: 0.11 });
ok(kf.laterPay > kf.firstPay, 'cicilan naik setelah mengambang');
near(kf.rows[kf.rows.length - 1].bal, 0, 1, 'lunas fix-float');
// 3) IRR & NPV
near(RP.irrMonthly([-100, 110]), 0.10, 1e-6, 'IRR bulanan 10%');
near(RP.irr([-1000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1100]), 0.10, 1e-6, 'IRR tahunan 10%');
near(RP.npv([-100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 110], 0.10), 0, 1e-6, 'NPV nol pada IRR');
// 4) tata letak: neraca lahan tertutup, kavling tidak tumpang tindih & di dalam lahan
const st = w.RPstate(); const { lay, fe } = w.RPcalc();
near(lay.area.sum, lay.A, lay.A * 0.002, 'jumlah luas = luas lahan');
ok(lay.units > 50, 'kavling terbentuk: ' + lay.units);
ok(lay.lots.every(l => l.x >= -1e-6 && l.y >= -1e-6 && l.x + l.w <= lay.W + 1e-6 && l.y + l.h <= lay.D + 1e-6), 'kavling di dalam lahan');
const ov = (a, b) => Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x)) * Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y));
let bad = 0; for (let i = 0; i < lay.lots.length; i++) for (let j = i + 1; j < lay.lots.length; j++) if (ov(lay.lots[i], lay.lots[j]) > 1e-6) bad++;
ok(bad === 0, 'kavling tidak bertumpuk');
ok(lay.lots.every(l => !lay.roads.some(rd => ov(l, rd) > 1e-6)), 'kavling tidak di atas jalan');
// porsi tipe mendekati target
const tot = lay.units, sh = st.types.map((t, i) => lay.lots.filter(l => l.type === i).length / tot), tgt = st.types.map(t => t.share / st.types.reduce((a, b) => a + b.share, 0));
ok(sh.every((s, i) => Math.abs(s - tgt[i]) < 0.15), 'campuran tipe mendekati porsi ' + sh.map(x => x.toFixed(2)));
// 5) kelayakan: identitas laba, arus kas = pendapatan − biaya (tanpa bunga, bila semua terjual dalam horizon)
near(fe.profit, fe.revenue - fe.total, 1, 'laba');
const sum = fe.flow.reduce((a, b) => a + b, 0);
ok(fe.sellMonths + st.sales.start + st.sales.buildMonths <= fe.H, 'penjualan selesai dalam horizon');
near(sum, fe.profit, Math.abs(fe.revenue) * 0.002, 'jumlah arus kas = laba');
ok(isFinite(fe.irr), 'IRR terhitung');
// 6) kriteria rumah umum (Kepmen PKP 1722/KPTS/M/2026)
const h = RP.house({ lotW: 6, lotD: 10, LB: 30, floors: 1 }, st.rules); near(h.LT, 60, 1e-9, 'luas lahan 60');
// 7) semua halaman tampil tanpa galat
['lahan', 'tapak', 'rumah', 'rab', 'biaya', 'ringkas', 'sumber'].forEach(p => { w.RPrender(p); ok(w.document.querySelector(`section[data-sec="${p}"]`).innerHTML.length > 500, 'halaman ' + p); });
ok(w.document.querySelectorAll('section[data-sec="rumah"] .style').length === 10, '10 gaya fasad');
// 7b) tipe populer: angka "LB/LT" pada nama = luas bangunan & luas kavling; KDB ≤ batas contoh
w.RPtipe.forEach(p => { const m = p.n.match(/(\d+)\/(\d+)/); ok(+m[1] === p.LB && Math.abs(p.lotW * p.lotD - +m[2]) < 1e-9, 'tipe ' + p.n); const hh = RP.house(p, st.rules); ok(hh.kdb * 100 <= +st.rules.kdbMax + 1e-6, 'KDB ' + p.n + ' ' + (hh.kdb * 100).toFixed(1)); ok(p.lotW >= 5, 'lebar muka ≥5 m ' + p.n); });
ok(Object.values(w.RPstyles).every(s => s.n && s.roof && s.wall && s.trim && s.roofC && isFinite(s.f)), 'data gaya lengkap untuk 3D');
// 7c) three.js r171 di-vendor (tanpa CDN) & CSP mengizinkan blob:
ok(html.includes('id="vx-three-core"') && html.includes('id="vx-three-env"') && /script-src[^;]*blob:/.test(html) && !/<script[^>]+src="https?:/.test(html), 'three.js lokal + CSP blob');
// 7d) v0.4.0: addon three.js lokal (langit fisik, GTAO, SMAA) + pilihan kualitas + vegetasi ber-instansi
ok(html.includes('id="vx-three-fx"') && /GTAOPass/.test(html) && /SMAAPass/.test(html) && /sunPosition/.test(html), 'addon three.js (Sky, GTAO, SMAA) tersisip lokal');
ok(/id="v3q"/.test(app) && /quality\(q\)/.test(app) && /InstancedMesh/.test(app) && /function nrm\(/.test(app), 'kualitas 3D, peta normal, daun ber-instansi');
ok(w.document.querySelector('#v3d') !== null, 'wadah tampak 3D');
w.RPrender('rumah'); w.document.querySelector('[data-tp="4"]').click(); ok(+w.RPstate().types[0].floors === 2 && +w.RPstate().types[0].LB === 60, 'terapkan tipe 2 lantai');
ok(w.document.body.innerHTML.includes('Pindo Tutuko'), 'kredit');
// 9) Lokasi & peta: luas poligon, saran zona, halaman lokasi, penerapan RDTR
{ const lat = -7.95, lon = 112.61, dy = 100 / 111194.9, dx = 100 / (111194.9 * Math.cos(lat * Math.PI / 180));
  const m = RP.polyMetrics([[lat, lon], [lat, lon + dx], [lat + dy, lon + dx], [lat + dy, lon]]);
  near(m.area, 10000, 50, 'luas bujur sangkar 100 m'); near(m.front, 100, 0.5, 'sisi muka 100 m'); near(m.perim, 400, 2, 'keliling 400 m'); near(m.rectW * m.rectD, 10000, 60, 'persegi pembatas');
  const tri = RP.polyMetrics([[lat, lon], [lat, lon + 2 * dx], [lat + dy, lon]]); near(tri.area, 10000, 50, 'luas segitiga alas 200 m tinggi 100 m');
  ok(RP.polyMetrics([[lat, lon], [lat, lon + dx]]) === null, 'poligon < 3 titik');
  const zc = [['Jawa Timur', 'Kota Malang', 1], ['Jawa Barat', 'Kota Bekasi', 4], ['Kalimantan Timur', 'Kabupaten Mahakam Ulu', 4], ['Kalimantan Barat', 'Kota Pontianak', 3], ['Sulawesi Selatan', 'Kota Makassar', 2], ['Papua Barat', '', 5], ['Kepulauan Riau', 'Kota Batam', 2], ['Riau', 'Kota Pekanbaru', 1], ['Bali', 'Kota Denpasar', 4], ['', '', null]];
  zc.forEach(([p, k, z]) => ok(RP.zoneFor(p, k) === z, `zona ${p}/${k} = ${z}`));
  w.RPrender('lokasi'); const sec = w.document.querySelector('section[data-sec="lokasi"]'); ok(sec.innerHTML.length > 500 && sec.querySelector('#mp') && sec.innerHTML.includes('bhumi.atrbpn.go.id') && sec.innerHTML.includes('gistaru.atrbpn.go.id'), 'halaman lokasi + tautan resmi');
  const st2 = w.RPstate(); st2.loc.rdtr.kdb = 65; st2.loc.rdtr.gsb = 4; sec.querySelector('#rdApply').click(); ok(+st2.rules.kdbMax === 65 && +st2.rules.gsb === 4, 'terapkan RDTR ke aturan');
  ok(/img-src[^;]*tile\.openstreetmap\.org/.test(html) && /connect-src[^;]*nominatim\.openstreetmap\.org/.test(html), 'CSP peta OSM'); }
ok(!/NaN|undefined/.test(w.document.querySelector('section[data-sec="ringkas"]').textContent), 'ringkasan tanpa NaN/undefined');
// 9) rumah susun/apartemen: kapasitas dari KDB/KLB, NPP, kewajiban 20%
{ const V = w.vertDefault('apartemen'); Object.assign(V, { A: 4000, kdb: 50, klb: 5, maxFl: 30, podFl: 3, podPlate: 0, baseFl: 1, baseInKLB: false, plate: 1100, eff: 78 });
  const R = w.vertCalc(V);
  near(R.fpMax, 2000, 1e-9, 'tapak maks KDB'); near(R.gfaMax, 20000, 1e-9, 'GFA maks KLB'); near(R.podGFA, 6000, 1e-9, 'podium = 3 × tapak KDB');
  ok(R.twFl === 12, 'lantai menara = floor((20000−6000)/1100) = 12'); near(R.twGFA, 13200, 1e-9, 'GFA menara'); near(R.nsa, 13200 * 0.78, 1e-6, 'NSA = efisiensi × GFA menara');
  ok(R.gfa <= R.gfaMax && R.gfaMax - R.gfa < V.plate, 'sisa KLB < satu lantai tipikal');
  near(R.rows.reduce((s, r) => s + r.npp * r.units, 0), 100, 1e-6, 'jumlah NPP seluruh sarusun = 100%');
  near(R.hbArea, 0.2 * (13200 + 6000), 1e-6, 'kewajiban rusun umum 20% luas lantai komersial');
  near(R.rev, R.rows.reduce((s, r) => s + r.units * r.a * r.pm2 * (1 + V.priceUp / 100 * (R.twFl - 1) / 2), 0), 1, 'pendapatan = Σ unit × luas × harga × premium lantai');
  near(R.flow.reduce((a, b) => a + b, 0), R.profit, 1, 'arus kas total = laba');
  const V2 = Object.assign(w.vertDefault('apartemen'), { A: 4000, kdb: 50, klb: 20, maxFl: 10, podFl: 2 }); const R2 = w.vertCalc(V2); ok(R2.twFl === 8 && R2.limitedBy === 'lantai', 'dibatasi jumlah lantai');
  const Ru = w.vertCalc(Object.assign(w.vertDefault('rusun'), { A: 3000 })); ok(Ru.hbArea === 0 && w.vertDefault('rusun').pphPct === 1, 'rusun umum: tanpa kewajiban 20%, PPh 1%');
  w.RPrender('rusun'); const sv = w.document.querySelector('section[data-sec="rusun"]'); ok(sv.querySelector('#vSec svg') && sv.querySelector('#vPlan svg') && !/NaN|undefined/.test(sv.textContent), 'halaman rumah susun tanpa NaN');
  ok(w.document.querySelector('section[data-sec="sumber"]').textContent.includes('Nomor 20 Tahun 2011'), 'rujukan UU Rumah Susun'); }
// 8) rujukan memuat Kepmen PKP 1722
ok(w.document.querySelector('section[data-sec="sumber"]').textContent.includes('1722/KPTS/M/2026'), 'rujukan Kepmen 1722');
ok(errors.length === 0, 'galat skrip: ' + errors.join(' | '));
console.log(`OK — ${n} pemeriksaan lulus. Unit ${lay.units}, PSU ${(lay.area.psu / lay.A * 100).toFixed(1)}%, laba ${(fe.profit / 1e9).toFixed(2)} M, IRR ${(fe.irr * 100).toFixed(1)}%`);
