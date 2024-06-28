let search = location.search;
const dispreq = new XMLHttpRequest();
let fromlist = document.getElementById("from-list");
let tolist = document.getElementById("to-list");

let placeholder = document.getElementById("placeholderEmpty");
let productlist = document.getElementById("productView");

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

thisLocation = new URL(location).searchParams



let alve = new URL("https://www.essegirent.com/list.html");


dispreq.onload = function () {
  list = dispreq.response

  if(list.length == 0){
    productList.classList.add = "hidden"
    placeholder.classList.add = "flex"
    return;
  }

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
    let sorta = new URL("https://www.essegirent.com/detail.html");
    sorta.searchParams.append('inizio', fromlist.value.toString());
    sorta.searchParams.append('fine', tolist.value.toString());
    sorta.searchParams.append("name", list[i].name)
    sorta.searchParams.append("price", list[i].price * Math.abs(((new Date(interval.fine)- new Date(interval.inizio))/86400000) + 1).toString())
    productList.children[i].getElementsByClassName("selected")[0].href = sorta;
    console.log(new Date(interval.fine).getDate() - new Date(interval.inizio).getDate())
  }
}

function golist() {
  if(new Date(fromlist.value) > new Date(tolist.value) || fromlist.value == "" || tolist.value == "" || new Date(fromlist.value).getTime() < new Date().setHours("00", "00", "00", "00") || new Date(tolist.value).getTime() < new Date().setHours("00", "00", "00", "00")){
    fromlist.style.borderColor = "red";
    tolist.style.borderColor = "red";
    fromlist.style.backgroundColor = "#ffbfc2";
    tolist.style.backgroundColor = "#ffbfc2";
    return;
  }
  
  //let alve = new URL("http://127.0.0.1:5500/list.html");
  alve.searchParams.append('inizio', fromlist.value.toString());
  alve.searchParams.append('fine', tolist.value.toString());
  window.location.href = alve.toString();
}

cerca.addEventListener("click", golist);
cerca2.addEventListener("click", golist);

dispreq.send();