// Config supabase
const SUPABASE_URL = "https://oypzmflvdzrhevwfabtr.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95cHptZmx2ZHpyaGV2d2ZhYnRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMzNDI0NjcsImV4cCI6MjA3ODkxODQ2N30.ZCApxsUw-fpS2_CGadBrl0RCr6Yff7tqsGSF5Lp6Kpg";

const db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Ambil Tag HTML
const container = document.getElementById("cardContainer");
const searchInput = document.getElementById("searchInput");
const loading = document.getElementById("loading");
const errorBox = document.getElementById("errorBox");

let datas = [];

// Render Card
function renderCards(items) {
  cardContainer.innerHTML = "";

  if (items.length === 0) {
    cardContainer.innerHTML = `<p style="text-align:center;color:gray;">Tidak ada data ditemukan</p>`;
    return;
  }

  items.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("card");

    div.innerHTML = `
    <a href="${item.link}" class="card-link" target="_blank">
        <img src="${item.image}" alt="${item.name}">
        <h3>${item.title}</h3>
        <p><b>Kategori:</b> ${item.category}</p>
        <p>${item.description}</p>
    </a>
    `;

    cardContainer.appendChild(div);
  });
}

// Mengambil data dari supabase
async function loadData() {
  loading.style.display = "block";
  errorBox.style.display = "none";

  const { data, error } = await db.from("products").select("*");

  loading.style.display = "none";

  if (error) {
    errorBox.style.display = "block";
    errorBox.textContent = "Gagal mengambil data dari supabase!";
    console.error(error);
    return;
  }

  datas = data;
  renderCards(datas);
}

loadData();

// Mencari data yang diambil dari supabase
searchInput.addEventListener("input", function () {
  const keyword = this.value.toLowerCase();

  const filtered = datas.filter(
    (item) =>
      item.title.toLowerCase().includes(keyword) ||
      item.category.toLowerCase().includes(keyword) ||
      item.description.toLowerCase().includes(keyword)
  );

  renderCards(filtered);
});
