// Config supabase
const SUPABASE_URL = "https://wqincsqcxfzlctixlrtw.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxaW5jc3FjeGZ6bGN0aXhscnR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxMTg3MzMsImV4cCI6MjA3ODY5NDczM30.e5fw2NIn5FhsYPqLNQlritowjtaSKOtJW360r2ApE0k";

const db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const wrapper = document.getElementById("project-wrapper");
const loading = document.getElementById("loading");
const errorBox = document.getElementById("errorBox");

// Load data
async function loadData() {
  loading.style.display = "block";
  errorBox.style.display = "none";
  const { data, error } = await db.from("projects").select("*");

  loading.style.display = "none";

  if (error) {
    errorBox.style.display = "block";
    errorBox.textContent = "Gagal mengambil data dari supabase!";
    console.error(error);
    return;
  }

  groupAndDisplay(data);
}

loadData();

/* Dikelompokkan berdasarkan kategori */
function groupAndDisplay(projects) {
  // Group otomatis berdasarkan kategori
  const categories = {};

  projects.forEach((item) => {
    if (!categories[item.category]) {
      categories[item.category] = [];
    }
    categories[item.category].push(item);
  });

  // Tampilkan per kategori
  wrapper.innerHTML = "";

  for (let cat in categories) {
    // Title kategori
    const section = document.createElement("div");
    section.classList.add("category-block");

    section.innerHTML = `
      <h2 class="category-title">${cat.toUpperCase()}</h2>
      <div class="cards-container" id="cat-${cat}"></div>
    `;

    wrapper.appendChild(section);

    // Card di kategori ini
    const container = section.querySelector(".cards-container");

    categories[cat].forEach((item) => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <img src="${item.image}" alt="${item.title}">
        <div class="card-body">
          <h3>${item.title}</h3>
          <p>${item.description}</p>
        </div>
      `;

      container.appendChild(card);
    });
  }
}
