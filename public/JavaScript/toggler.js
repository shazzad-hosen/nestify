const toggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu-popup");

if (toggle && menu) {
  toggle.addEventListener("click", () => {
    menu.style.display = menu.style.display === "block" ? "none" : "block";
  });
  document.addEventListener("click", (e) => {
    if (!toggle.contains(e.target) && !menu.contains(e.target)) {
      menu.style.display = "none";
    }
  });
}
