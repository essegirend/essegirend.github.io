let search = location.search;
const dispreq = new XMLHttpRequest();
let fromlist = document.getElementById("from-list");
let tolist = document.getElementById("to-list");

let interval = getJsonFromUrl(search);
fromlist.value = interval.inizio;
tolist.value = interval.fine;

let productList = document.getElementById("list");
let product = productList.getElementsByClassName("product")

let cerca = document.getElementById("cerca");

let cerca2 = document.getElementById("cerca2");

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

dispreq.open('GET', 'https://gisacolor.it/veicles/disponibili' + location.search);
dispreq.responseType = 'json'
var list = dispreq.response

dispreq.onload = function () {
  list = dispreq.response

  for (var i = 0; i < list.length - 1; i++) {
    productList.append(product[0].cloneNode(true));
  }

  for (var i = 0; i < list.length; i++) {
    productList.children[i].getElementsByClassName("image")[0].src = list[i].image;
    productList.children[i].getElementsByClassName("price")[0].innerHTML = list[i].price;
    productList.children[i].getElementsByClassName("name")[0].innerHTML = list[i].name;
    productList.children[i].getElementsByClassName("cambio")[0].innerHTML = list[i].cambio;
    productList.children[i].getElementsByClassName("posti")[0].innerHTML = list[i].posti;
    productList.children[i].getElementsByClassName("eta")[0].innerHTML = list[i].minAnni;
    productList.children[i].getElementsByClassName("totale")[0].innerHTML = list[i].price * Math.abs(((new Date(interval.fine)- new Date(interval.inizio))/86400000) + 1) + " €";
    console.log(new Date(interval.fine).getDate() - new Date(interval.inizio).getDate())
  }

}

function golist() {
  if(new Date(fromlist.value) > new Date(tolist.value) || (new Date(fromlist.value).getDate() + 1) < (new Date().getDate()) || fromlist.value == "" || tolist.value == ""){
    fromlist.classList.add("outline-2" , "shadow-md", "shadow-red-500", "border-red-500") 
    tolist.classList.add("outline-2" , "shadow-md", "shadow-red-500", "border-red-500")
    return;
  }
  let alve = new URL("https://shy-neon.github.io/list.html");
  //let alve = new URL("http://127.0.0.1:5500/list.html");
  alve.searchParams.append('inizio', fromlist.value.toString());
  alve.searchParams.append('fine', tolist.value.toString());
  window.location.href = alve.toString();
}

cerca.addEventListener("click", golist);
cerca2.addEventListener("click", golist);

dispreq.send();