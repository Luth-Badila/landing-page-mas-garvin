<?php
// order.php
header('Content-Type: application/json; charset=utf-8');

require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status'=>'error','message'=>'Metode tidak diperbolehkan']);
    exit;
}

// Ambil & sanitize
$nama = trim($_POST['nama'] ?? '');
$email = trim($_POST['email'] ?? '');
$telepon = trim($_POST['telepon'] ?? '');
$produk = trim($_POST['produk'] ?? '');
$jumlah = (int)($_POST['jumlah'] ?? 0);

// Validasi sederhana
if ($nama === '' || $email === '' || $telepon === '' || $produk === '' || $jumlah <= 0) {
    echo json_encode(['status'=>'error','message'=>'Isi semua field dengan benar.']);
    exit;
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['status'=>'error','message'=>'Format email tidak valid.']);
    exit;
}

// Simpan ke DB
try {
    $sql = "INSERT INTO orders (nama, email, telepon, produk, jumlah) VALUES (:nama, :email, :telepon, :produk, :jumlah)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':nama' => $nama,
        ':email' => $email,
        ':telepon' => $telepon,
        ':produk' => $produk,
        ':jumlah' => $jumlah
    ]);

    echo json_encode(['status'=>'success','message'=>'Pesanan Anda berhasil dikirim!']);
} catch (Exception $e) {
    // Jangan tunjukkan error detail di production
    echo json_encode(['status'=>'error','message'=>'Terjadi kesalahan server. Silakan coba lagi.']);
}
