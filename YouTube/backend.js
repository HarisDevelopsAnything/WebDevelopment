let isMenuOpen = false;
let menuOpen = () => {
  if (!isMenuOpen) {
    isMenuOpen = true;
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.add("unCollapse");
  } else {
    isMenuOpen = false;
    sidebar.classList.remove("unCollapse");
  }
};
