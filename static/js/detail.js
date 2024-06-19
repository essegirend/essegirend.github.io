let search = location.search;
let interval = getJsonFromUrl(search)
const disp1 = new XMLHttpRequest();
let veicolo = document.getElementById("veicolo")
let from = document.getElementById("detailFrom")
let to = document.getElementById("detailTo")
let price = document.getElementById("price")
let prenota1 = document.getElementById("prenota")

let nome = document.getElementById("nome")
let cognome = document.getElementById("cognome")
let email = document.getElementById("mail")
let tel = document.getElementById("tel")

let image = document.getElementsByClassName("image")

veicolo.innerHTML = interval.name.replace('+', ' ')
from.innerHTML = interval.inizio
to.innerHTML = interval.fine
price.innerHTML = interval.price + " €"



disp1.open('GET', 'https://gisacolor.it/veicles/disponibili' + location.search);
disp1.responseType = 'json'
var list = disp1.response

thisLocation = new URL(location).searchParams



let alve = new URL("https://essegirent.com/ack.html");
let nalve = new URL("https://essegirent.com/nack.html");
let sorta = new URL("https://essegirent.com/detail.html");



disp1.onload = function () {
  list = disp1.response

  for (var i = 0; i < list.length; i++) {
    if(list[i].name == interval.name.replace('+', ' ')) {
        image[0].src = list[i].image
        console.log(list[i].image);
        image[1].src = list[i].image
        console.log(list[i].image)
    }
  }
}

disp1.send()

prenota1.addEventListener("click", prenota)

function prenota () {
  prenota1.removeEventListener("click", prenota)
  const data = {
    veiclename: interval.name.replace('+', ' '),
    nome: nome.value,
    cognome: cognome.value,
    email: email.value,
    cell: tel.value,
    inizio: interval.inizio,
    fine: interval.fine,
    price: interval.price
  };

  if(nome.value == "" || email.value == "" || cognome.value == "" || tel.value == ""){
    if(email.value == "")
      email.classList.add("border-2", "border-red-600");
    else 
      email.classList.remove("border-2", "border-red-600");

    if(nome.value == "")
      nome.classList.add("border-2", "border-red-600");
    else  
      nome.classList.remove("border-2", "border-red-600");

    if(cognome.value == "")
      cognome.classList.add("border-2", "border-red-600");
    else  
      cognome.classList.remove("border-2", "border-red-600");

    if(tel.value == "")
      tel.classList.add("border-2", "border-red-600");
    else  
      tel.classList.remove("border-2", "border-red-600");
    return;
  }

  let resp;


  // Send the POST request using fetch
  fetch("https://gisacolor.it/veicles/reservations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (response.ok) {
      window.location.href = alve.toString()
    } else {
      console.log(`Error loading website: ${response.status}`);
      window.location.href = nalve.toString()
    }
  })
    .catch((error) => err = error);
    
    
  
}

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
  