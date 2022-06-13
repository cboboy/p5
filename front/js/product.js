// recuperation de l'id du produit 
const url2 = window.location.search;
const urlId = new URLSearchParams(url2);
const id = urlId.get("id");

const url = `http://localhost:3000/api/products/${id}`;

fetch(url)
.then((resultat) => {
if (resultat.ok) {
    return resultat.json();
}
})
.then((data) => {
displayProduct(data);
})
.catch((error) => {
alert("Une erreur est survenue, " + error);
});

/**
 * modification du Dom et integration du produit
 * @param {*} products 
 */
function displayProduct(products) {
    let img = document.createElement("img");
    img.src = products.imageUrl;
    img.setAttribute("alt", `${products.altTxt}`);
    document.querySelector(".item__img").appendChild(img);
    let title = document.getElementById("title");
    title.textContent = `${products.name}`;
    let price = document.getElementById("price");
    price.textContent = `${products.price}`;
    let description = document.getElementById("description");
    description.textContent = `${products.description}`;
    // boucle pour ajout des couleurs dans la liste deroulant
    for (let i = 0; i < products.colors.length; i++) {
        let color = products.colors[i];
        let option = document.createElement("option");
        option.value = "valeur";
        option.textContent = `${color}`;
        document.querySelector("#colors").appendChild(option);
    }
}

// au choix de la couleur, mets la valeur par defaut a 1
let eventColor = document.querySelector("#colors");
eventColor.addEventListener("change", () => {
    let liste = document.getElementById("colors");
    let value = liste.options[liste.selectedIndex].value;
    if (value != "valeur") {
        document.getElementById("quantity").value = '0';
    } else {
        document.getElementById("quantity").value = '1';
    }
}, false);

// -------------------------- addEventListener sur le bouton "Ajouter au panier"
const commande = document.getElementById("addToCart");
commande.addEventListener('click', event => {
    let borderS = document.querySelector(".item__content__addButton button");
    let liste, value, couleur, quantite;
    liste = document.getElementById("colors");
    value = liste.options[liste.selectedIndex].value;
    couleur = liste.options[liste.selectedIndex].text;
    quantite = document.getElementById("quantity").value;
    // alerte si pas de couleur ( settimeout pour chrome)
    if (value != "valeur") {
        redShadow();
        setTimeout(function(){window.alert("choisir une couleur")}, 50);
    } else {
        // alerte si mauvaise quantité
        if (quantite <= 0 || quantite >= 101) {
            redShadow();
            setTimeout(function(){window.alert("le nombre d'articles doit être un chiffre entre 1 et 100")}, 50);
        } else {
                // ajout panier
                greenShadow();
                let ajoutPanier = {_id : id, colors : couleur, nombre : quantite};
                addPanier(ajoutPanier);
            }
    }
});

/**
 * sauvegarde du panier
 * @param {*} panier 
 */
function savePanier(panier) {
    // JSON.stringify().Cette opération transforme l’objet en une chaîne de caractères
    localStorage.setItem("panier", JSON.stringify(panier));
}

/**
 * recuperation du panier
 * @returns 
 */
function getPanier() {
    // enregistre dans une variable le panier
    let panier = localStorage.getItem("panier");
    // verifie que le tableau existe
    // si il n'existe pas,  sinon on ajoute les elements
    if(panier == null) {
        // on retourne un tableau vide,
        return [];
    } else {
        // JSON.parse() reforme l’objet à partir de la chaîne linéarisée
        return JSON.parse(panier);
    }
}

/**
 * ajout quantite ou produit
 * @param {*} produit 
 * @returns 
 */
function addPanier(produit) {
    // recupere le tableau dans une variable
    let panier = getPanier();
    // si panier vide ajoute le produit
    if (panier.length == 0) {
        panier.push(produit);
    } else {
        // si id et couleur produit existe, sauvegarde et fin function
        for (i = 0; i < panier.length; i++){
            if (panier[i]._id == produit._id && panier[i].colors == produit.colors) {
                let article = "article";
                let sommeArticle = Number(panier[i].nombre)+ Number(produit.nombre);
                 // // ----- sans limite a 100
                // if (panier[i].nombre > 1){
                // article = "articles";
                // }
                // if(window.confirm(`Le panier contient déja ${panier[i].nombre} ${article} de couleur ${panier[i].colors}, en rajouter ${produit.nombre} ?`)){
                //     panier[i].nombre = sommeArticle; 
                //     savePanier(panier);
                //     return;  
                // } else {
                //     return;
                // }
                // // ----- fin limite a 100
                
                // ---------- avec limite a 100
                if(sommeArticle > 100){
                    redShadow();
                    setTimeout(function(){window.alert(`Le panier contient déja ${panier[i].nombre} ${article} de couleur ${panier[i].colors},il doit être inférieur à 100`)}, 50);
                    return;
                } else {
                    if (panier[i].nombre > 1){
                    article = "articles";
                    }
                    if(window.confirm(`Le panier contient déja ${panier[i].nombre} ${article} de couleur ${panier[i].colors}, en rajouter ${produit.nombre} ?`)){
                        panier[i].nombre = sommeArticle; 
                        savePanier(panier);
                        return;  
                    } else {
                        return;
                    }
                }
                // ----fin limite
            }  
        }
        // ajout produit
        panier.push(produit);         
    }            
    // enregistre le panier
    triTableau(panier);    
}                      

/**
 * tri panier par _id
 * @param {*} panier 
 */
 function triTableau(panier) {
    panier.sort((a, b) => (a._id > b._id) ? 1 : (a._id === b._id) ? ((a.colors > b.colors) ? 1 : -1) : -1 )
    savePanier(panier);
}

// hover shadow bleu sur bp
commande.addEventListener('mouseenter' , mouseenter => {
    blueShadow()
});

// no hover shadow sur bp
commande.addEventListener('mouseleave' , mouseleave => {
    noShadow()
});

/**
 * // no hover shadow
 */
 function noShadow() {
    let borderS = document.querySelector(".item__content__addButton button");
    borderS = borderS.style["boxShadow"] = "initial";
}

/**
 * // hover shadow bleu
 */
 function blueShadow() {
    let borderS = document.querySelector(".item__content__addButton button");
    borderS = borderS.style["boxShadow"] = "rgba(42, 18, 206, 0.9) 0 0 22px 6px";
}

/**
 * // hover shadow rouge
 */
function redShadow() {
    let borderS = document.querySelector(".item__content__addButton button");
    borderS = borderS.style["boxShadow"] = "rgba(244, 13, 13, 0.9) 0 0 40px 20px";
}

/**
 * // hover shadow vert
 */
function greenShadow() {
    let borderS = document.querySelector(".item__content__addButton button");
    borderS = borderS.style["boxShadow"] = "rgba(2, 204, 19, 0.9) 0 0 40px 20px";
}