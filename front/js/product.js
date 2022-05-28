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

// *******debut FONCTION mise en forme HTML
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

    // si produit deja dans le panier, affiche le nombre d'article
    let eventColor = document.querySelector("#colors");
    eventColor.addEventListener("change", () => {
        let indexColor = eventColor.selectedIndex;
        let color = document.getElementsByTagName("option")[indexColor].text;
        let panier = getPanier();
        for (let i = 0; i < panier.length; i++) {
            if (panier[i]._id == id  && panier[i].colors == color) {
                let qte = panier[i].nombre;   
                document.getElementById("quantity").value = qte;
                break;
            } else {
                document.getElementById("quantity").value = '0';
            }
        }
    }, false);

    // addEventListener sur le bouton "Ajouter au panier"
    const commande = document.getElementById("addToCart");
    commande.addEventListener('click', event => {
        let borderS = document.querySelector(".item__content__addButton button");
        let liste, value, couleur, quantite;
        liste = document.getElementById("colors");
        value = liste.options[liste.selectedIndex].value;
        couleur = liste.options[liste.selectedIndex].text;
        quantite = document.getElementById("quantity").value;
        if ((value != "valeur") || (quantite <= 0 ) || quantite >= 101) {
            // window.alert("choisir une couleur et/ou le nombre d'article(s)");
            // hover rouge si ko
            borderS = borderS.style["boxShadow"] = "rgba(244, 13, 13, 0.9) 0 0 40px 20px";
        } else {
            // hover vert si ok
            borderS = borderS.style["boxShadow"] = "rgba(2, 204, 19, 0.9) 0 0 40px 20px";
            let ajoutPanier = {_id : products._id, colors : couleur, nombre : quantite};
            addPanier(ajoutPanier)
        }
    });
    // hover bleu sur bp
    commande.addEventListener('mouseenter' , mouseenter => {
        let borderNone = document.querySelector(".item__content__addButton button");
        borderNone = borderNone.style["boxShadow"] = "rgba(42, 18, 206, 0.9) 0 0 22px 6px";
    });
    // hover sur bp
    commande.addEventListener('mouseleave' , mouseleave => {
        let borderNone = document.querySelector(".item__content__addButton button");
        borderNone = borderNone.style["boxShadow"] = "initial";
    });
}
// *******fin FONCTION mise en forme HTML

// *******debut FONCTION qui enregistre le panier dans le localStorage
function savePanier(panier) {
    console.log("savepanier", panier);
    // modifie tableau au format JSON( chaine de caractere )
    localStorage.setItem("panier", JSON.stringify(panier));
}
// *******fin FONCTION qui enregistre le panier dans le localStorage

// *******debut FONCTION qui recupere les elements du tableau
function getPanier() {
    // enregistre dans une variable le panier
    let panier = localStorage.getItem("panier");
    // verifie que le tableau existe
    // si il n'existe pas,  sinon on ajoute les elements
    if(panier == null) {
        // on retourne un tableau vide,
        return [];
    } else {
        // sinon on ajoute les elements au format JSON
        return JSON.parse(panier);
    }
}
// *******fin FONCTION qui recupere les elements du tableau

// *******debut FONCTION qui ajoute les elements au panier
function addPanier(produit) {
    // recupere le tableau dans une variable
    let panier = getPanier();
    // si panier vide ajoute le produit
    if (panier.length == 0) {
        panier.push(produit);
    } else {
        // sinon ajout nombre ou ajout produit
        // ajoute nombre boucle pour voir si id et couleur produit existe : Vrai , sauvegarde et fin function
        // QUESTION for of ?
        for (i = 0; i < panier.length; i++){
            if (panier[i]._id == produit._id && panier[i].colors == produit.colors) {
                panier[i].nombre =  Number(produit.nombre); 
                console.log("ajout nombre", panier);
                savePanier(panier);
                return;
            }  
        }
        // ajout produit
        console.log("ajout produit",panier);
        panier.push(produit);         
    }            
    // enregistre le panier
    triTableau(panier);    
}   
// *******fin FONCTION qui ajoute les elements au panier                          

// *******debut FONCTION tri tableau
function triTableau(panier) {
    console.log("panier f tri", panier);
    panier.sort(function(a, b){
        a = a._id;
        b = b._id;
        if (a < b) { return -1; }
        if (a > b) { return 1; }
        if (a === b) { return a.colors - b.colors; }
    })
    savePanier(panier);
}
// *******fin FONCTION tri tableau
        
     
    
   
    






















