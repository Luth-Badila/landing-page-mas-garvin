const datas = [
  {
    id: 1,
    name: "Keyboard Mechanical",
    category: "Elektronik",
    deskripsi: "Keyboard mechanical RGB",
  },
  {
    id: 2,
    name: "Mouse Wireless",
    category: "Elektronik",
    deskripsi: "Mouse wireless 2.4GHz",
  },
  {
    id: 3,
    name: "Monitor 24 inch",
    category: "Monitor",
    deskripsi: "Monitor IPS Full HD",
  },
  {
    id: 4,
    name: "Headset Gaming",
    category: "Audio",
    deskripsi: "Headset gaming surround",
  },
];

const cardContainer = document.getElementById("cardContainer");
const searchInput = document.getElementById("searchInput");

// --- Generate Card ---
function renderCards(items) {
  cardContainer.innerHTML = ""; // clear card

  items.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("card");

    div.innerHTML = `
      <img src="https://via.placeholder.com/200" alt="${item.name}">
      <h3>${item.name}</h3>
      <p><b>Kategori:</b> ${item.category}</p>
      <p>${item.deskripsi}</p>
    `;

    cardContainer.appendChild(div);
  });
}

// render awal
renderCards(datas);

// --- Fitur Search ---
searchInput.addEventListener("input", function () {
  const keyword = this.value.toLowerCase();

  const filtered = datas.filter((item) => item.name.toLowerCase().includes(keyword) || item.category.toLowerCase().includes(keyword) || item.deskripsi.toLowerCase().includes(keyword));

  renderCards(filtered);
});
