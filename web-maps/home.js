// Fade-in on scroll (once)
const fadeElements = document.querySelectorAll(".fade");

// const observer = new IntersectionObserver(entries => {
//   entries.forEach(entry => {
//     if (entry.isIntersecting) {
//       entry.target.classList.add('show');
//       // berhenti observe setelah animasi pertama
//       observer.unobserve(entry.target);
//     }
//   });
// }, {
//   threshold: 0.3
// });

// fadeElements.forEach(el => observer.observe(el));
// Ambil semua elemen yang mau kita animasikan hanya sekali

// Buat observer dengan threshold 30%
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      // Ketika elemen terlihat (>= 30%)
      if (entry.isIntersecting) {
        // Tambah kelas untuk memicu animasi CSS
        entry.target.classList.add("show");

        // Berhenti observe elemen ini supaya animasi hanya terjadi sekali
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

// Daftarkan tiap elemen ke observer
fadeElements.forEach((el) => observer.observe(el));
