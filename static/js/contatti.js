


const disp = new XMLHttpRequest();
const card = new XMLHttpRequest();

let burger = document.getElementById("burger");
let cross = document.getElementById("cross");
let menu = document.getElementById("menu");



function toggleMenu() {
  if (menu.classList.contains("-translate-y-[200%]")) {
    menu.classList.remove("-translate-y-[200%]");
    menu.classList.add("transition");
    burger.style.display = "block";
    menu.style.display = "flex";
    burger.style.display = "none";


    cross.style.display = "block";
  } else {
    menu.classList.add("-translate-y-[200%]");
    menu.style.display = "none";
    burger.style.display = "block";
    menu.style.display = "none";
    cross.style.display = "none";
    menu.classList.remove("transform");
  }
}



burger.addEventListener("click", toggleMenu);
cross.addEventListener("click", toggleMenu);

function setStars(stars) {
  switch (stars) {
    case 0:
      return "./static/images/stars/0s.png"
      break;
    case 1:
      return "./static/images/stars/1s.png"
      break;
    case 2:
      return "./static/images/stars/2s.png"
      break;
    case 3:
      return "./static/images/stars/3s.png"
    case 4:
      return "./static/images/stars/4s.png"
      break;
    case 5:
      return "./static/images/stars/5s.png"
      break;
  }
}