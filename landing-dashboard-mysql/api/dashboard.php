<?php
require_once 'config.php';

// Hapus (delete) via GET param ?delete=id
if (isset($_GET['delete'])) {
    $id = (int)$_GET['delete'];
    $sql = "DELETE FROM orders WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([':id'=>$id]);
    header('Location: dashboard.php');
    exit;
}

// Update (update) via POST (edit inline)
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['update_id'])) {
    $id = (int)$_POST['update_id'];
    $nama = trim($_POST['nama'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $telepon = trim($_POST['telepon'] ?? '');
    $produk = trim($_POST['produk'] ?? '');
    $jumlah = (int)($_POST['jumlah'] ?? 1);

    $sql = "UPDATE orders SET nama=:nama, email=:email, telepon=:telepon, produk=:produk, jumlah=:jumlah WHERE id=:id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':nama'=>$nama, ':email'=>$email, ':telepon'=>$telepon,
        ':produk'=>$produk, ':jumlah'=>$jumlah, ':id'=>$id
    ]);
    header('Location: dashboard.php');
    exit;
}

// Ambil semua orders
$sql = "SELECT * FROM orders ORDER BY created_at DESC";
$orders = $pdo->query($sql)->fetchAll();

var_dump($orders);

// Cek apakah sedang edit
$editId = isset($_GET['edit']) ? (int)$_GET['edit'] : null;
?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Dashboard Pesanan</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <nav class="navbar">
  <div class="logo">📋 Dashboard</div>
  <ul class="nav-links" id="navLinks">
    <li><a href="index.php">Back To Homepage</a></li>
  </ul>
</nav>
  <main class="dashboard">
    <h2>Daftar Pesanan</h2>

    <?php if (empty($orders)): ?>
      <p>Belum ada pesanan.</p>
    <?php else: ?>
      <div class="table-wrap">
        <table class="table">
          <thead>
            <tr>
              <th>Nama</th><th>Email</th><th>Telepon</th>
              <th>Produk</th><th>Jumlah</th><th>Tanggal</th><th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <?php foreach ($orders as $o): ?>
              <tr>
                <?php if ($editId === (int)$o['id']): ?>
                  <form method="POST" class="inline-form">
                    <td><input type="text" name="nama" value="<?=htmlspecialchars($o['nama'])?>" required></td>
                    <td><input type="email" name="email" value="<?=htmlspecialchars($o['email'])?>" required></td>
                    <td><input type="text" name="telepon" value="<?=htmlspecialchars($o['telepon'])?>" required></td>
                    <td>
                      <select name="produk" required>
                        <option value="Oli Mesin" <?= $o['produk']=='Oli Mesin' ? 'selected' : '' ?>>Oli Mesin</option>
                        <option value="Kampas Rem" <?= $o['produk']=='Kampas Rem' ? 'selected' : '' ?>>Kampas Rem</option>
                        <option value="Aki Mobil" <?= $o['produk']=='Aki Mobil' ? 'selected' : '' ?>>Aki Mobil</option>
                      </select>
                    </td>
                    <td><input type="number" name="jumlah" min="1" value="<?= (int)$o['jumlah'] ?>" required></td>
                    <td><?= $o['created_at'] ?></td>
                    <td>
                      <input type="hidden" name="update_id" value="<?= $o['id'] ?>">
                      <button class="btn-small btn-save">💾 Simpan</button>
                      <a href="dashboard.php" class="btn-small btn-cancel">Batal</a>
                    </td>
                  </form>
                <?php else: ?>
                  <td><?=htmlspecialchars($o['nama'])?></td>
                  <td><?=htmlspecialchars($o['email'])?></td>
                  <td><?=htmlspecialchars($o['telepon'])?></td>
                  <td><?=htmlspecialchars($o['produk'])?></td>
                  <td><?= (int)$o['jumlah'] ?></td>
                  <td><?= $o['created_at'] ?></td>
                  <td>
                    <a href="dashboard.php?edit=<?= $o['id'] ?>" class="btn-small btn-edit">✏️ Edit</a>
                    <a href="dashboard.php?delete=<?= $o['id'] ?>" class="btn-small btn-delete" onclick="return confirm('Hapus pesanan ini?')">🗑️ Hapus</a>
                  </td>
                <?php endif; ?>
              </tr>
            <?php endforeach; ?>
          </tbody>
        </table>
      </div>
    <?php endif; ?>
  </main>

</body>
</html>
