<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Sparepart Mobil</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

<nav class="navbar">
  <div class="logo">SparepartMobil</div>
  <div class="menu-toggle" id="menuToggle">&#9776;</div>
  <ul class="nav-links" id="navLinks">
    <li><a href="#home">Home</a></li>
    <li><a href="#produk">Produk</a></li>
    <li><a href="#pesan">Pesan</a></li>
  </ul>
</nav>


<section class="hero fade-in">
  <div class="hero-inner">
    <h1>Komponen & Sparepart Mobil Berkualitas</h1>
    <p>Garansi original, pengiriman cepat, harga kompetitif.</p>
    <a href="#produk" class="btn primary">Lihat Produk</a>
  </div>
</section>

<section id="produk" class="produk fade-in">
  <h2>Produk Unggulan</h2>
  <div class="grid">
    <article class="card">
      <img src="./images/engine-oil.jpg" alt="Oli Mesin">
      <h3>Oli Mesin Synthetic</h3>
      <p class="price">Rp 150.000</p>
    </article>
    <article class="card">
      <img src="./images/brake-pad.jpg" alt="Kampas Rem">
      <h3>Kampas Rem Depan</h3>
      <p class="price">Rp 250.000</p>
    </article>
    <article class="card">
      <img src="./images/battery.jpg" alt="Aki">
      <h3>Aki Mobil 65Ah</h3>
      <p class="price">Rp 1.200.000</p>
    </article>
  </div>
</section>

<section id="pesan" class="form-section fade-in">
  <h2>Form Pemesanan</h2>

  <form id="orderForm">
    <label>Nama Lengkap</label>
    <input type="text" name="nama" required>

    <label>Email</label>
    <input type="email" name="email" required>

    <label>No. Telepon</label>
    <input type="text" name="telepon" required>

    <label>Pilih Produk</label>
    <select name="produk" required>
      <option value="">-- Pilih Produk --</option>
      <option value="Oli Mesin">Oli Mesin</option>
      <option value="Kampas Rem">Kampas Rem</option>
      <option value="Aki Mobil">Aki Mobil</option>
    </select>

    <label>Jumlah</label>
    <input type="number" name="jumlah" value="1" min="1" required>

    <button type="submit" class="btn primary">Pesan Sekarang</button>

    <!-- pesan hasil -->
    <div id="formMessage" class="message" aria-live="polite"></div>
  </form>
</section>

<footer class="footer">
  <p>&copy; <?=date('Y')?> SparepartMobil. Semua hak dilindungi.</p>
</footer>

<script src="script.js"></script>
</body>
</html>
