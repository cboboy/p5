// recuperation de l'id du produit et enleve les 4 premieres lettres
// const id = window.location.search.slice(4);

// methode complique, plus sure ?????
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
    console.log("une erreur !!!");
  });

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
    const commande = document.getElementById("addToCart");
    commande.addEventListener('click', event => {
        let liste, value, couleur, quantite;
        liste = document.getElementById("colors");
        value = liste.options[liste.selectedIndex].value;
        couleur = liste.options[liste.selectedIndex].text;
        quantite = document.getElementById("quantity").value;
        if ((value != "valeur") || (quantite == 0)) {
            window.alert("choisir une couleur et/ou le nombre d'articles");
        } else {
            let ajoutPanier = {_id : products._id, colors : couleur, nombre : quantite};
            addPanier(ajoutPanier)
        }
    });
}
// fonction qui enregistre le panier dans le localStorage
function savePanier(panier) {
    // modifie tableau au format JSON( chaine de caractere )
    localStorage.setItem("panier", JSON.stringify(panier));
}

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

// fonction qui ajoute les elements au panier
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
                panier[i].nombre = Number(panier[i].nombre)+ Number(produit.nombre); 
                savePanier(panier);
                return;    
            }  
        }
        // ajout produit
        panier.push(produit);
        console.log(panier);
         
    }            
    // enregistre le panier
    savePanier(panier);    
}                             
                
            
        
     
    
   
    






















