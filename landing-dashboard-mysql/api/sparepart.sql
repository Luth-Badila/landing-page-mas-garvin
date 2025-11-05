-- Buat database
CREATE DATABASE spareparts CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Gunakan database
USE spareparts;

-- Buat tabel orders
CREATE TABLE orders (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nama VARCHAR(191) NOT NULL,
  email VARCHAR(191) NOT NULL,
  telepon VARCHAR(50) NOT NULL,
  produk VARCHAR(191) NOT NULL,
  jumlah INT NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

SELECT * FROM orders;