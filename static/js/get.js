let oggiView = document.getElementById("scroll");
let product = document.getElementById("product");
const disp = new XMLHttpRequest();
oggi.open('GET', 'https://server.essegirent.com/veicles/oggi');
oggi.responseType = 'json'
var disponibiliOggi = disp.response

let placeholder = document.getElementById("placeholderEmpty");
let productlist = document.getElementById("productView");

oggi.onload = function () {
  list = oggi.response

  if(list.length == 0){
    placeholder.classList.remove("hidden");
    productlist.classList.add("hidden");
    return
  }


  for (var i = 0; i < list.length; i++) {
    oggiView.append(product.cloneNode(true));
  }

  for (var i = 0; i < list.length; i++) {
    oggiView.children[i].getElementsByClassName("image")[0].src = list[i].image;
    oggiView.children[i].getElementsByClassName("price")[0].innerHTML = list[i].price + "€";
    oggiView.children[i].getElementsByClassName("name")[0].innerHTML = list[i].name;
  }
  
  oggiView.removeChild(oggiView.lastChild);
}

oggi.send();

console.log(review[1].getElementsByClassName("name"))

disp.open('GET', 'https://server.essegirent.com/reviews');
disp.responseType = 'json'
var list = disp.response

disp.onload = function () {
  list = disp.response

  
  let j = 4;
  let i = 0;

  while (i < 3) {
    if (list[j].text.length < 100) {
      j = j - 1;
    }

    review[i].getElementsByClassName("name")[0].innerHTML = list[j].author_name
    review[i].getElementsByClassName("profile_photo")[0].src = list[j].profile_photo_url
    review[i].getElementsByClassName("testo")[0].innerHTML = list[j].text
    review[i].getElementsByClassName("stars")[0].src = setStars(list[j].rating)

    if (list[j].text.length > 150) {
      review[i].getElementsByClassName("testo")[0].innerHTML = list[j].text.substring(0, 200)
    }
    j = j - 1;
    i++;
  }
}

disp.send();
