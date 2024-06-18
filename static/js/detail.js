let search = location.search;
let interval = getJsonFromUrl(search)
const disp1 = new XMLHttpRequest();
let veicolo = document.getElementById("veicolo")
let from = document.getElementById("detailFrom")
let to = document.getElementById("detailTo")
let price = document.getElementById("price")

let image = document.getElementsByClassName("image")

veicolo.innerHTML = interval.name.replace('+', '  ')
from.innerHTML = interval.inizio
to.innerHTML = interval.fine
price.innerHTML = interval.price + " €"


disp1.open('GET', 'https://gisacolor.it/veicles/disponibili' + location.search);
disp1.responseType = 'json'
var list = disp1.response

thisLocation = new URL(location).searchParams



let alve = new URL("https://shy-neon.github.io/list.html");
let sorta = new URL("http://127.0.0.1:5500/detail.html");



disp1.onload = function () {
  list = disp1.response

  for (var i = 0; i < list.length - 1; i++) {
    if(list[i].name == interval.name.replace('+', ' ')) {
        image[0].src = list[i].image
        image[1].src = list[i].image
        console.log(list[i].image)
    }
  }



}

disp1.send()

function getJsonFromUrl(search) {
    let url = search
    var query = url.substr(1);
    var result = {};
    query.split("&").forEach(function (part) {
      var item = part.split("=");
      result[item[0]] = decodeURIComponent(item[1]);
    });
    return result;
  }
  