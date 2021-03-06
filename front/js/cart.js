const url = "http://localhost:3000/api/products/";

fetch(url)
.then((resultat) => {
if (resultat.ok) {
    return resultat.json();
}
})
.then((data) => displayProduct(data))
.catch((error) => {
alert("Une erreur est survenue, " + error);
});

/**
 * debut FONCTION mise en place html
 * @param {*} products 
 */
function displayProduct(products){
    let panier = getPanier();
    let order = document.querySelector('#order');
    // si panier null ou vide, texte H1 modifier + formulaire enlever + btn retour accueil
    if(localStorage.getItem("panier") == null  || panier.length <= 0){
        let h1 = document.getElementsByTagName("h1");
        h1[0].innerHTML += h1[0].innerHTML = " est vide";
        let champs = document.querySelectorAll('.cart__order__form__question');
        champs.forEach((champ) => {
            champ.remove();
        });
        document.querySelector('.cart__price').remove();
        order.value = "Accueil";
    } else {
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
            let h2 = document.createElement("h2");
            h2.textContent = `${products[indexP].name}`;
            let p1 = document.createElement("p");
            p1.textContent = `${products[indexP].colors[indexC]}`;
            let p2 = document.createElement("p");
            p2.textContent = `${products[indexP].price} ???`;
            let div_cart__item__content__settings = document.createElement("div");
            div_cart__item__content__settings.classList.add("cart__item__content__settings");
            let div_cart__item__content__settings__quantity = document.createElement("div");
            div_cart__item__content__settings__quantity.classList.add("cart__item__content__settings__quantity");
            let p3 = document.createElement("p");
            p3.textContent = `Qt?? : `;
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
            //         <p>${products[indexP].price} ???</p>
            //         </div>
            //         <div class="cart__item__content__settings">
            //         <div class="cart__item__content__settings__quantity">
            //             <p>Qt?? : </p>
            //             <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${panier[i].nombre}">
            //         </div>
            //         <div class="cart__item__content__settings__delete">
            //             <p class="deleteItem">Supprimer</p>
            //         </div>
            //         </div>
            //     </div>
            // </article>`
            // // fin version innerHTML
        }
        // change quantit??
        let qte = document.querySelectorAll(".itemQuantity");
        for (let i = 0; i < qte.length; i++) {
            qte[i].addEventListener("change", () => {
                let valeur = qte[i].value;
                // // ----------- si pas de limite 100
                // if(valeur >= 1) {
                //     panier[i].nombre = qte[i].value;
                //     qte[i].style.backgroundColor = "#a8fbbd";
                //     savePanier(panier);
                //     totalArticle();
                // } else { 
                //     qte[i].style.backgroundColor = "rgb(242, 143, 143)";
                //     setTimeout(function(){
                //         qte[i].value = panier[i].nombre; 
                //     }, 1000);
                //     setTimeout(function(){window.alert('Quantit?? doit ??tre sup??rieure ?? 1')}, 50);
                //     // fin pas de limite
                
                // ---------------si limite 100
                if(valeur >= 1 && valeur <= 100) {
                    panier[i].nombre = qte[i].value;
                    qte[i].style.backgroundColor = "#a8fbbd";
                    savePanier(panier);
                    totalArticle();
                } else { 
                    qte[i].style.backgroundColor = "rgb(242, 143, 143)";
                    setTimeout(function(){
                        qte[i].value = panier[i].nombre; 
                    }, 1000);
                    setTimeout(function(){window.alert('Quantit?? doit ??tre entre 1 et 100 articles')}, 50);
                    // fin limite 100
                }
                setTimeout(setTim,1000,qte[i]); 
            }, false);
        };
        // gestion supprimer articles
        let el = document.querySelectorAll(".cart__item__content__settings__delete p");
        for (let i = 0; i < el.length; i++) {
            el[i].addEventListener("click", () => {
                if (window.confirm("Supprimer ce produit ?")) {
                  delete (panier[i]);
                // enleve l'index si = Null
                panier = panier.filter(function () { return true });
                savePanier(panier);
                // recharge la page pour mise a jour
                location.reload();  
                }
            }, false);
        };
        totalArticle();
    };
    // addEventListener sur bouton commander
    order.addEventListener('click', (e) => {
        // desactive le comportement du bouton
        e.preventDefault(); 
        if(order.value == "Accueil") {
            window.location.href = `./index.html`;  
        } else {
            let contact = JSON.parse(localStorage.getItem("contact"));
            // sauvegarde le formulaire
            saveContact(contact);
            // Verification avant envoie au back
            let panier = getPanier();
            if(valideChamp() && panier.length > 0){
                // // sauvegarde le formulaire
                // saveContact(contact);
                // cree le tableau products avec les id contenu dans le panier
                let productsData = JSON.parse(localStorage.getItem("panier"));
                let products = [];
                for(product of productsData) {
                    products.push(product._id);
                };
                // cree la variable avec les 2 tableaux a envoyer
                const panierData = {
                    products,
                    contact,
                };
                postData(panierData);
            } else {
                // hover rouge si ko
                redShadow()
            } 
        };
    }, false);     
};

/**
 * debut FONCTION qui recupere les elements du tableau
 * @returns 
 */
function getPanier() {
    // enregistre dans une variable le panier
    let panier = localStorage.getItem("panier");
    // si il n'existe pas,  on retourne un tableau vide,
    if(panier == null) {
        return [];
    } else {
        // on retourne les elements parse
        return JSON.parse(panier);
    }
}

/**
 * debut FONCTION enregistre le panier dans le localStorage
 * @param {*} panier 
 */
function savePanier(panier) {
    // modifie tableau au format JSON( chaine de caractere )
    localStorage.setItem("panier", JSON.stringify(panier));
}

/**
 * debut FONCTION affichage total quantit?? et prix produits
 */
let = value_totalQuantity = 0;
let = value_totalPrix = 0
function totalArticle() {
    value_totalQuantity = 0;
    value_totalPrix = 0
    totalPrixProduits();
    totalProduits();
    document.getElementById('totalQuantity').innerHTML = value_totalQuantity;
    document.getElementById('totalPrice').textContent = `${value_totalPrix}`;
}

/**
 * debut FONCTION calcul total prix produits
 */
function totalPrixProduits() {
    let panier = getPanier();
    let carts = document.querySelectorAll(".cart__item__content__description > p:last-child");
    for (let i = 0; i < panier.length; i++) {
        value_totalPrix = value_totalPrix + panier[i].nombre * Number(carts[i].textContent.substring(0, carts[i].textContent.length - 2));
    }
};

/**
 * debut FONCTION calcul total quantite de tout les produits
 */
function totalProduits() {
    let carts = document.querySelectorAll(".itemQuantity");
    carts.forEach(item => {
        value_totalQuantity += Number(item.value);   
    });
};

/**
 * FONCTION pour virer le background apres un  setTimeout
 * @param {*} arg 
 */
function setTim(arg){
    arg.style.backgroundColor = "";
    };

// --------------------------------------- formulaire -----------------------
// recuperer le contenu contact dans le localstorage ou creer le tableau
 if (localStorage["contact"]) {
    const contactLS = localStorage.getItem("contact");
    const contactLSParse = JSON.parse(contactLS);
    // insere les valeurs dans les champs
    Object.keys(contactLSParse).forEach(item => {
        if(contactLSParse[item].constructor === String) {
            document.querySelector(`#${item}`).value = contactLSParse[item];
        }
    });
 } else {
    // creation de l'objet formulaire
    const contact = {
        firstName: document.querySelector("#firstName"),
        lastName: document.querySelector("#lastName"),
        address: document.querySelector("#address"),
        city: document.querySelector("#city"),
        email: document.querySelector("#email")
    };
    localStorage.setItem("contact", JSON.stringify(contact));
 }

/**
 * fonction qui enregistre le formulaire de contact dans le localStorage
 * @param {*} contact 
 */
function saveContact(contact) {
// modifie tableau au format JSON( chaine de caractere )
localStorage.setItem("contact", JSON.stringify(contact));
};

// event sur changement dans l'input firstName
firstName.addEventListener("change", () => {
    inputFirstName();
});

/**
 * debut FONCTION regEx firstName
 * @returns 
 */
function inputFirstName() {
    if (/^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]{2,}$/.test(firstName.value)) {
        // si ok 
        document.querySelector("#firstNameErrorMsg").innerHTML = "";
        firstName.style.backgroundColor = "#a0f09e";
        let contact = JSON.parse(localStorage.getItem("contact"));
        contact["firstName"] = (firstName.value);
        saveContact(contact);
        return true;
    } else {
        // si ko insere texte erreur 
        let inputvalue = "Non Valide";
        document.querySelector("#firstNameErrorMsg").innerHTML = inputvalue;
        firstName.style.backgroundColor = "";
        document.querySelector("#firstNameErrorMsg").style.color = "red";
        document.querySelector("#firstNameErrorMsg").style.fontWeight = "bold";
        return false;
    }
};

// event sur changement dans l'input lastName
lastName.addEventListener("change", () => {
    inputLastName();
});

/**
 * debut FONCTION regEx lastName
 * @returns 
 */
function inputLastName() {
    if (/^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]{2,}$/.test(lastName.value)) {
        // si ok 
        document.querySelector("#lastNameErrorMsg").innerHTML = "";
        lastName.style.backgroundColor = "#a0f09e";
        let contact = JSON.parse(localStorage.getItem("contact"));
        contact["lastName"] = (lastName.value);
        saveContact(contact);
        return true;
    } else {
        // si ko insere texte erreur 
        let inputvalue = "Non Valide";
        document.querySelector("#lastNameErrorMsg").innerHTML = inputvalue;
        lastName.style.backgroundColor = "";
        document.querySelector("#lastNameErrorMsg").style.color = "red";
        document.querySelector("#lastNameErrorMsg").style.fontWeight = "bold";
        return false;
    }
};

// event sur changement dans l'input adress
address.addEventListener("change", () => {
    inputAddress();
});

/**
 * debut FONCTION regEx address
 * @returns 
 */
function inputAddress() {
    if (/^[a-zA-Z0-9\s,.'-]{3,}$/.test(address.value)) {
        // si ok 
        document.querySelector("#addressErrorMsg").innerHTML = "";
        address.style.backgroundColor = "#a0f09e";
        let contact = JSON.parse(localStorage.getItem("contact"));
        contact["address"] = (address.value);
        saveContact(contact);
        return true;
    } else {
        // si ko insere texte erreur 
        let inputvalue = "Non Valide";
        document.querySelector("#addressErrorMsg").innerHTML = inputvalue;
        address.style.backgroundColor = "";
        document.querySelector("#addressErrorMsg").style.color = "red";
        document.querySelector("#addressErrorMsg").style.fontWeight = "bold";
        return false;
    }
};

// event sur changement dans l'input city
city.addEventListener("change", () => {
    inputCity();
});

/**
 * debut FONCTION regEx city
 * @returns 
 */
function inputCity() {
    if (/^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]{1,}$/.test(city.value)) {
        // si ok 
        document.querySelector("#cityErrorMsg").innerHTML = "";
        city.style.backgroundColor = "#a0f09e";
        let contact = JSON.parse(localStorage.getItem("contact"));
        contact["city"] = (city.value);
        saveContact(contact);
        return true;
    } else {
        // si ko insere texte erreur 
        let inputvalue = "Non Valide";
        document.querySelector("#cityErrorMsg").innerHTML = inputvalue;
        city.style.backgroundColor = "";
        document.querySelector("#cityErrorMsg").style.color = "red";
        document.querySelector("#cityErrorMsg").style.fontWeight = "bold";
        return false;
    }
};

// event sur changement dans l'input email
email.addEventListener("change", () => {
    inputEmail();
});

/**
 * debut FONCTION regEx email
 * @returns 
 */
function inputEmail() {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
        // si ok 
        document.querySelector("#emailErrorMsg").innerHTML = "";
        email.style.backgroundColor = "#a0f09e";
        let contact = JSON.parse(localStorage.getItem("contact"));
        contact["email"] = (email.value);
        saveContact(contact);
        return true;
    } else {
        // si ko insere texte erreur 
        let inputvalue = "Email Non Valide";
        document.querySelector("#emailErrorMsg").innerHTML = inputvalue;
        email.style.backgroundColor = "";
        document.querySelector("#emailErrorMsg").style.color = "red";
        document.querySelector("#emailErrorMsg").style.fontWeight = "bold";
        return false;
    }
};


/**
 * debut FONCTION qui verifie si tout les champs du formulaire sont valides
 * @returns 
 */
function valideChamp(){
    inputFirstName();
    inputLastName();
    inputAddress();
    inputCity();
    inputEmail();
    if(inputFirstName() && inputLastName() && inputAddress() && inputCity() && inputEmail()){
        return true;
    } else {
        return false;
    }
};


/**
 * debut POST envoie des donn??es
 * @param {*} panierData 
 */
function postData(panierData){
    const appel = fetch(`${url}order`, {
        method : "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(panierData),
    })
    .then(async(reponse) => {
        try{
            const contenu = await reponse.json();
            window.location.href = `http://127.0.0.1:5500/front/html/confirmation.html?orderId=${contenu.orderId}`;
        } catch(err) {
            alert("Une erreur est survenue, " + err);
        }
    })
    .catch((error) => {
        alert("Une erreur est survenue, " + error);
      });
};

// hover shadow bleu sur bp
order.addEventListener('mouseenter' , mouseenter => {
    blueShadow()
});
// no hover shadow sur bp
order.addEventListener('mouseleave' , mouseleave => {
    noShadow()
});

/**
 * // no hover shadow
 */
 function noShadow() {
    let borderS = document.querySelector(".cart__order__form__submit input");
    borderS = borderS.style["boxShadow"] = "initial";
}

/**
 * // hover shadow bleu
 */
 function blueShadow() {
    let borderS = document.querySelector('.cart__order__form__submit input');
    borderS = borderS.style["boxShadow"] = "rgba(42, 18, 206, 0.9) 0 0 22px 6px";
}

/**
 * // hover shadow rouge
 */
function redShadow() {
    let borderS = document.querySelector('.cart__order__form__submit input');
    borderS = borderS.style["boxShadow"] = "rgba(244, 13, 13, 0.9) 0 0 40px 20px";
}