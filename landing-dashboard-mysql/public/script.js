// Scroll fade-in using IntersectionObserver
document.addEventListener("DOMContentLoaded", () => {
  const faders = document.querySelectorAll(".fade-in");
  const obs = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  faders.forEach((el) => obs.observe(el));
});

// Submit and message handling
const orderForm = document.getElementById("orderForm");
if (orderForm) {
  orderForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const form = this;
    const data = new FormData(form);
    const msg = document.getElementById("formMessage");

    // reset message
    msg.className = "message";
    msg.textContent = "";
    // send
    fetch("order.php", { method: "POST", body: data })
      .then((res) => res.json())
      .then((data) => {
        // tampilkan message
        msg.textContent = data.message || "";
        msg.classList.add(data.status === "success" ? "success" : "error", "show");

        if (data.status === "success") {
          form.reset();
        }

        // setelah delay (3 detik) mulai fade-out (smooth)
        setTimeout(() => {
          msg.classList.remove("show");
          
          setTimeout(() => {
            msg.textContent = "";
            msg.className = "message";
          }, 900);
        }, 3000);
      })
      .catch((err) => {
        msg.textContent = "Terjadi kesalahan server.";
        msg.classList.add("error", "show");
        setTimeout(() => {
          msg.classList.remove("show");
          setTimeout(() => {
            msg.textContent = "";
            msg.className = "message";
          }, 900);
        }, 3000);
      });
  });
}

// Navbar toggle
const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});


// Scroll animations
const animatedElements = document.querySelectorAll("[data-animate]");
const animateOnScroll = () => {
  const windowHeight = window.innerHeight;
  animatedElements.forEach((el) => {
    const position = el.getBoundingClientRect().top;
    if (position < windowHeight - 50) {
      el.classList.add("visible");
    }
  });
};
window.addEventListener("scroll", animateOnScroll);
animateOnScroll();
