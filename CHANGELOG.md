# Catatan perubahan

## 0.8.0 — 2026-11-05
- **Model rumah tapak**: deret, kopel (semi-detached), tunggal (detached), townhouse, rumah taman/villa — jarak bebas samping di denah, rencana tapak, kawasan 3D, dan indikator; 5 tipe populer baru.
- **Modul unit hunian vertikal berbeda**: rusun (ringkas, jemuran, tanpa AC), apartemen (unit lebih luas, AC indoor/outdoor, meja makan, KM dalam kamar utama), kondominium (KM dalam tiap kamar, walk-in closet, bathtub, kamar ART). Unit mengisi penuh kedua sayap.
- **Tipe bangunan, jumlah massa (1–6), pola tata massa** (linear, grid, cluster, radial, memusar, courtyard) pada rencana tapak, denah, dan tampak 3D; podium tunggal atau per massa.
- **Fasilitas, lanskap & utilitas** berbeda untuk perumahan, rusun, apartemen/kondominium: ibadah, klinik, pusat belanja, restoran, laundry, balai, kantor pengelola, PAUD, pusat MEE, IPAL, sumur, TPS 3R, parkir, kolam, clubhouse, jogging, lapangan, tenis, mini golf; gaya lanskap & jenis vegetasi; PV, smart system, kabel tanam, panel kontrol, proteksi kebakaran, panen air hujan. Ditempatkan otomatis (halaman → atap podium → atap menara), dirender 2D & 3D, biaya masuk kelayakan.
- **Kelas lokasi kota** (metropolitan/besar/sedang/kecil) mengisi nilai awal aturan & harga bila RDTR/Perda belum ada (asumsi).
- **Menu S · Skenario keputusan**: 5 desain per jenis (perumahan, rusun, apartemen/kondominium) dibandingkan — kapasitas & intensitas (dibatasi aturan lokasi), biaya, laba, IRR, NPV, pembiayaan, dokumen lingkungan, perizinan; satu klik terapkan.
- **Menu P · Pelaksanaan & lingkungan**: metode tradisional/fast track/design & build/CM at risk, jadwal CPM (Gantt) & kurva S, RAB pelaksanaan bahan-upah-alat per kualitas bahan dengan spesifikasi, tenaga kerja & teknisi, perizinan (OSS, KKPR, persetujuan lingkungan, Andalalin, PBG, SLF, pertelaan), analisis lokasi, limbah & air.
- **Menu D · Dokumen lengkap**: PDF berisi FS (A4), desain teknis pelaksanaan (A4), dan DED lembar A2 berkop termasuk rencana utilitas & proteksi kebakaran.
- Rujukan baru terverifikasi: PP 16/2021, PP 21/2021, PP 22/2021, Permen LHK 4/2021, PP 28/2025, UU 22/2009 Ps. 99.

## 0.7.2 — 2026-11-05
- Render "pandangan mata" tidak lagi tertutup pohon: kamera setinggi mata di jalan depan, pohon jalan & sabuk seberang tidak dipasang, sudut pandang lebih lebar.

## 0.7.1 — 2026-11-05
- Kartu "Tampak isometrik (skema)" diganti **Perspektif realistis (render)**: dua foto dari model 3D (perspektif 3/4 dan pandangan dari jalan setinggi mata) dengan deret tetangga, langit fisik, bayangan sore, oklusi ambien, dan tanaman. Isometrik hanya dipakai bila WebGL tidak tersedia.

## 0.7.0 — 2026-11-05
- **Menu baru G · Gambar kerja A2** (594 × 420 mm) dengan kop gambar lengkap: nama proyek, lokasi, pemilik, perencana, catatan, arah utara & legenda, revisi, judul, skala, kolom digambar/diperiksa/disetujui, tanggal, kode/nomor lembar, dan kredit.
  - Lembar perumahan tapak: sampul & data proyek & daftar gambar, rencana tapak berskala, perspektif kawasan & lingkungan sekitar (3D), serta untuk tiap tipe: denah, tampak, potongan, dan 3D.
  - Lembar rusun/apartemen: sampul, rencana tapak & lanskap, denah tipikal + potongan massa + tabel unit/NPP, tampak depan (render ortografik berskala), dan perspektif kawasan.
  - Gaya standar atau cetak biru, resolusi 110/150/200 dpi, unduh PDF A2 tanpa pustaka tambahan (desktop: dialog simpan PDF).
- **Denah terukur berperabot**: dinding bertebal, pintu berayun, jendela, as/grid, dimensi berantai, serta perabot (tempat tidur, lemari, sofa, TV, tangga, dapur, meja makan, kloset/shower, carport & mobil, taman). Denah lantai 2 untuk rumah dua lantai.
- **Tampak depan terukur** dengan keterangan material, penanda level, dan dimensi bukaan; **potongan A–A** dengan level lantai dan tinggi bangunan.
- **Rencana tapak bergaya lanskap**: halaman hijau, denah atap rumah, jalan masuk kavling, pohon, trotoar & marka, taman dengan jalur & area bermain, fasum, makam, batas tapak, gerbang, arah utara.
- **Zona komersial (ruko)** opsional di muka kawasan: porsi lahan, lebar kavling ruko, dan harga kavling komersial (asumsi) yang masuk ke kelayakan.
- **Rusun/apartemen**:
  - Rencana tapak lanskap (drop-off, pos jaga, parkir, podium, kolam & taman atap, jogging track, lapangan, area bermain, musala, TPS).
  - Denah tipikal terukur: inti lif & tangga darurat, lobi lif, shaft, dan unit berperabot.
  - Menara terlalu panjang untuk lahan otomatis dipecah menjadi 2–4 massa sejajar.
- **Kawasan 3D**: rumah tiap kavling, ruko, jalan, RTH, fasum, makam, pagar & gerbang, jalan akses, kampung sekitar, dan sawah.
- Perbaikan: sisa lahan di ujung tapak tidak lagi menumpuk jalan utama (neraca lahan tepat).

## 0.6.2 — 2026-11-05
- Perbaikan: tampak 3D gagal dimuat ("vendor three.js tidak ada") bila aplikasi langsung terbuka di halaman yang memuat 3D (halaman terakhir yang tersimpan). Pemuat kini menunggu dokumen selesai diurai, dan kegagalan tidak disimpan sehingga dapat dicoba ulang.

## 0.6.1 — 2026-11-05
- Kredit di sudut kiri bawah menu: "Dikembangkan oleh: Pindo Tutuko".

## 0.6.0 — 2026-11-05
- Menu R · Rumah susun & apartemen mendapat **tampak 3D massa bangunan**:
  - Massa dibangun dari hasil hitungan: podium (parkir berkisi atau etalase kaca), menara dengan pita pelat lantai, jendela & balkon ber-instansi, parapet, ruang mesin lif, dan tangki di atap.
  - Tapak berpaving dengan sempadan hijau, pohon, jalan depan, dan rampa basement.
  - Tersedia pilihan pandang, jam matahari (lampu unit menyala saat senja), kualitas, dan unduh gambar.
- Tampak 3D lebih tahan banting: bila mode kualitas tinggi gagal di suatu perangkat/GPU, aplikasi otomatis mencoba mode ringan, lalu mode aman (tanpa langit fisik & efek). Isometrik hanya dipakai bila WebGL benar-benar gagal, dan pesan galatnya ditampilkan untuk diagnosis.

## 0.5.0 — 2026-11-05
- Menu baru **R · Rumah susun & apartemen** untuk flat (walk-up), rusun umum (MBR), apartemen menengah, dan kondominium.
  - Kapasitas dihitung dari KDB, KLB, dan batas jumlah lantai: lantai menara/podium/basement, luas lantai kotor (GFA), dan luas bersih terjual (efisiensi).
  - Jumlah unit dihitung per tipe menurut komposisi, beserta parkir (podium, basement, halaman) dan perkiraan jumlah lif.
  - NPP per sarusun dihitung menurut nilai atau luas (UU 20/2011 Pasal 1 angka 13, Pasal 46 ayat (2)).
  - Kewajiban rumah susun umum paling sedikit 20% luas lantai untuk rumah susun komersial (UU 20/2011 Pasal 16 ayat (2)), dengan pilihan memasukkan biayanya ke kelayakan.
  - Kelayakan: biaya, pendapatan dengan premium ketinggian, laba, marjin, IRR, NPV, kebutuhan dana puncak, dan arus kas bulanan.
  - Gambar potongan massa dan denah lantai tipikal (koridor ganda + inti), pemeriksaan KDB/KDH/parkir/lif, serta ekspor CSV unit & NPP.
  - Tombol "Ambil dari halaman Lahan & Lokasi" memakai luas lahan dan aturan RDTR proyek.
- Rujukan baru: UU 20/2011 tentang Rumah Susun dan PP 13/2021 tentang Penyelenggaraan Rumah Susun. Angka pasar/biaya ditandai sebagai asumsi.

## 0.4.0 — 2026-11-05
- Tampak 3D lebih realistis:
  - Langit fisik (model Preetham, addon Sky three.js) dirender ke cubemap. Langit ini menjadi latar sekaligus cahaya pantul lingkungan, dan berubah mengikuti jam matahari, termasuk warna senja.
  - Kualitas tinggi menambah oklusi ambien GTAO (bayangan kontak di sudut, bawah atap, dan sela tiang) serta anti-alias SMAA.
  - Material memakai peta normal yang diturunkan dari tekstur prosedural, sehingga nat bata, genteng, batu, serat kayu, dan paving punya relief yang terkena cahaya matahari.
  - Pohon dan perdu disusun dari ribuan kartu daun bertekstur (InstancedMesh, alpha-test) di atas batang dan cabang, ditambah sabuk pohon di belakang kavling dan di seberang jalan.
  - Halaman depan berisi helai rumput ber-instansi.
  - Jendela memperlihatkan ruang dalam dan gorden acak. Kacanya transparan dan memantulkan langit. Mulai jam ±17.00, lampu dalam rumah dan lampu jalan menyala.
- Tombol "✨ Kualitas: Tinggi/Ringan" disimpan per perangkat. Perangkat sentuh memakai "Ringan" secara bawaan.
- Addon three.js r171 (MIT) dibundel lokal ke `vendor/three/addons.min.js`, tanpa CDN.

## 0.3.0
- Langkah baru **0 · Lokasi & peta**: peta OpenStreetMap (tanpa pustaka), cari alamat (Nominatim), lokasi perangkat, gambar batas lahan → luas, keliling, sisi muka, persegi panjang pembatas; terapkan ukuran ke lahan proyek.
- Alamat kab/kota & provinsi dari peta; saran wilayah batas harga rumah umum (Kepmen PKP 1722/KPTS/M/2026).
- Cek persil & tata ruang di sumber resmi: BHUMI ATR/BPN, GISTARU RTR Online, penelusuran Perda RDTR & PSU, OSM, Google Maps.
- Isian aturan RDTR/PZ setempat (zona, dokumen, KDB, KLB, KDH, GSB, ketinggian, PSU) → terapkan ke aturan proyek; pemeriksaan zona perumahan & jumlah lantai; tercantum di ringkasan.
- Kredit rel kiri: "Dibuat oleh Pindo Tutuko - 2026"; tampak 3D awal lebih lapang.

## 0.2.0
- Tampak 3D realistis (three.js r171, lokal): material bertekstur (plester, stuko, bata, papan, kayu, batu, genteng beton/tanah liat, metal), bayangan matahari menurut jam, pantulan kaca, deret tetangga, jalan, saluran, carport, pohon; putar/zoom, pandangan 3/4–depan–samping–udara, unduh PNG.
- 10 gaya fasad populer (baru: Modern klasik, Mediterania modern, Modern farmhouse) dengan thumbnail 3D.
- Tipe rumah populer satu klik: 30/60, 36/72, 45/90, 54/105, 60/72 (2 lt), 90/120 (2 lt).

## 0.1.0
- Versi pertama: tapak & kavling otomatis, neraca lahan/PSU, pemeriksaan KDB/KLB/KDH dan kriteria rumah umum (Kepmen PKP 1722/KPTS/M/2026), 7 gaya fasad terkini dengan tampak 3D & denah skematik, RAB, arus kas, NPV/IRR, kredit konstruksi, simulasi KPR, laporan cetak/PDF, simpan/buka proyek.
