const url = "http://localhost:3000/api/products/";

fetch(url)
  .then((resultat) => {
    if (resultat.ok) {
      return resultat.json();
    }
  })
  .then((data) => displayProduct(data))
  .catch((error) => console.log("Erreur : " + error));

// utiliser tableau
// fonction qui recupere les elements du tableau
function getPanier() {
    // enregistre dans une variable le panier
    let panier = localStorage.getItem("panier");
    // verifie que le tableau existe
    // si il n'existe pas,  sinon on ajoute les elements
    if(panier == null) {
        // on retourne un tableau vide,
        return [];
    } else {
        // on retourne les elements au format JSON
        return JSON.parse(panier);
    }
}


    // fonction qui enregistre le panier dans le localStorage
function savePanier(panier) {
    // modifie tableau au format JSON( chaine de caractere )
    localStorage.setItem("panier", JSON.stringify(panier));
}
    
function displayProduct(products){
    let panier = getPanier();
    let value_totalQuantity = 0;
    let value_totalPrice = 0;
    // pour chaque index du panier dans le localstorage
    for (i = 0; i < panier.length; i++) {
        // je trouve l'index des produits dans l'appli
        const indexP = products.findIndex(item => item._id === panier[i]._id);
        // je trouve l'index de la couleur
        const indexC = products[indexP].colors.findIndex(item => item === panier[i].colors);
        // je cree le HTML, et place les bons elements ----------------------------
        // version longue --------------------------------------
        let article = document.createElement("article");
        article.classList.add("cart__item");
        article.setAttribute("data-id", `${panier[i]._id}`), article.setAttribute("data-color", `${products[indexP].colors[indexC]}`);
        let div_cart__item__img = document.createElement("div");
        div_cart__item__img.classList.add("cart__item__img");
        let img = document.createElement("img");
        img.src = products[indexP].imageUrl;
        img.setAttribute("alt", `${products[indexP].altTxt}`);
        let div_cart__item__content = document.createElement("div");
        div_cart__item__content.classList.add("cart__item__content");
        let div_cart__item__content__description = document.createElement("div");
        div_cart__item__content__description.classList.add("cart__item__content__description");
        let h2 = document.createElement("h3");
        h2.textContent = `${products[indexP].name}`;
        let p1 = document.createElement("p");
        p1.textContent = `${products[indexP].colors[indexC]}`;
        let p2 = document.createElement("p");
        p2.textContent = `${products[indexP].price} €`;
        let div_cart__item__content__settings = document.createElement("div");
        div_cart__item__content__settings.classList.add("cart__item__content__settings");
        let div_cart__item__content__settings__quantity = document.createElement("div");
        div_cart__item__content__settings__quantity.classList.add("cart__item__content__settings__quantity");
        let p3 = document.createElement("p");
        p3.textContent = `Qté : `;
        let input = document.createElement("input");
        input.classList.add("itemQuantity");
        input.setAttribute("type", 'number'), input.setAttribute("name", 'itemQuantity'), input.setAttribute("min", '1'), input.setAttribute("max", '100'), input.setAttribute("value", `${panier[i].nombre}`);
        let div_cart__item__content__settings__delete = document.createElement("div");
        div_cart__item__content__settings__delete.classList.add("cart__item__content__settings__delete");
        let p4 = document.createElement("p");
        p4.classList.add("deleteItem");
        p4.textContent = `Supprimer`;
        div_cart__item__img.appendChild(img);
        article.appendChild(div_cart__item__img);
        div_cart__item__content__description.appendChild(h2);
        div_cart__item__content__description.appendChild(p1);
        div_cart__item__content__description.appendChild(p2);
        div_cart__item__content.appendChild(div_cart__item__content__description);
        div_cart__item__content__settings__quantity.appendChild(p3);
        div_cart__item__content__settings__quantity.appendChild(input);
        div_cart__item__content__settings.appendChild(div_cart__item__content__settings__quantity);
        div_cart__item__content__settings__delete.appendChild(p4);
        div_cart__item__content__settings.appendChild(div_cart__item__content__settings__delete);
        div_cart__item__content.appendChild(div_cart__item__content__settings);
        article.appendChild(div_cart__item__content);
        document.querySelector("#cart__items").appendChild(article);
        // fin version longue --------------------------------------
        // // version innerHTML
        // let cart__items= document.getElementById("cart__items");
        // cart__items.innerHTML = `
        // <article class="cart__item" data-id="${panier[i]._id}" data-color="${products[indexP].colors[indexC]}">
        //     <div class="cart__item__img">
        //         <img src="${products[indexP].imageUrl}" alt="${products[indexP].altTxt}">
        //     </div>
        //     <div class="cart__item__content">
        //         <div class="cart__item__content__description">
        //         <h2>${products[indexP].name}</h2>
        //         <p>${products[indexP].colors[indexC]}</p>
        //         <p>${products[indexP].price} €</p>
        //         </div>
        //         <div class="cart__item__content__settings">
        //         <div class="cart__item__content__settings__quantity">
        //             <p>Qté : </p>
        //             <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${panier[i].nombre}">
        //         </div>
        //         <div class="cart__item__content__settings__delete">
        //             <p class="deleteItem">Supprimer</p>
        //         </div>
        //         </div>
        //     </div>
        // </article>`
        // // fin version innerHTML
        console.log(panier[i]);
        value_totalQuantity = value_totalQuantity + Number(panier[i].nombre);
        value_totalPrice = value_totalPrice + (Number(panier[i].nombre) * Number(products[indexP].price));
    }
    // change quantité
    let qte = document.querySelectorAll(".itemQuantity");
    for (let i = 0; i < qte.length; i++) {
        qte[i].addEventListener("change", () => {
            valeur = qte[i].value;
            if(valeur >= 1 && valeur <= 100) {
                console.log(valeur);
                panier[i].nombre = qte[i].value;
                totalArticle(totalPrice);
                savePanier(panier);
            } else {
                window.location.href = window.location.search;
            } 
        }, false);
    }
    // gestion supprimer articles
    let el = document.querySelectorAll(".cart__item__content__settings__delete p");
    for (let i = 0; i < el.length; i++) {
        el[i].addEventListener("click", () => {
            delete (panier[i]);
            // enleve l'index si = Null
            panier = panier.filter(function () { return true });
            savePanier(panier);
            // recharge la page pour mise a jour 
            window.location.href = window.location.search;
        }, false);
    }
    let totalQuantity = 0;
    let totalPrice = document.getElementById('totalPrice');
    function totalArticle(totalPrice) {
        document.getElementById('totalQuantity').innerHTML = value_totalQuantity;
        totalPrice.textContent = `${value_totalPrice}`;
    }
    totalArticle(totalPrice);
};
// --------------------------------------- formulaire -----------------------

// fonction qui enregistre le formulaire de contact dans le localStorage
function saveContact(contact) {
// modifie tableau au format JSON( chaine de caractere )
localStorage.setItem("contact", JSON.stringify(contact));
}

// validation champs de formulaire

// declare une variable avec toute les balises input avec l'attribut required
let champs = document.querySelectorAll('input[required]');

// addEventListener sur bouton commander
let order = document.querySelector('#order');
order.addEventListener('click', (e) => {
    // desactive le comportement du bouton
    e.preventDefault(); 

    // creation de l'objet formulaire
    const contact = {
        firstName: document.querySelector("#firstName").value,
        lastName: document.querySelector("#lastName").value,
        address: document.querySelector("#address").value,
        city: document.querySelector("#city").value,
        email: document.querySelector("#email").value
    };
    
    // supprime message erreur
    champs.forEach((champ) => {resetChamp(champ)});
    // variable devient false si un champs n'est pas valide
    let valid = true;
    // boucle avec les elements de la variables
    champs.forEach((champ) => {
        if(! valideChamp(champ)){
            valid = false;
        }
    });
    if(valid){
        console.log(valid);
        saveContact(contact);
    }
}, false);

// message erreur reset et valide a l'entre et sortie du champ
champs.forEach((champ) => {
    champ.addEventListener('focus', () => {resetChamp(champ)}, false);
    champ.addEventListener('blur', () => {valideChamp(champ)}, false);
});

// fonction qui verifie si tout les champs sont valides
function valideChamp(champ){
    if(champ.checkValidity()){
        return true;
    } else {
        // insere texte erreur dans element suivant input
        champ.nextElementSibling.insertAdjacentHTML('beforeend', `${champ.validationMessage}`);
        return false;
    }
}

// enlever message alerte
function resetChamp(champ){
    let champLabel = champ.nextElementSibling;
    while(champLabel.firstChild){
        champLabel.removeChild(champLabel.firstChild);
    }
    champ.valid = true;
}

// recuperer le contenu contact dans le localstorage
const contactLS = localStorage.getItem("contact");
const contactLSParse = JSON.parse(contactLS);
// insere les valeurs dans les champs
document.querySelector("#firstName").value = contactLSParse.firstName;
document.querySelector("#lastName").value = contactLSParse.lastName;
document.querySelector("#address").value = contactLSParse.address;
document.querySelector("#city").value = contactLSParse.city;
document.querySelector("#email").value = contactLSParse.email;   

