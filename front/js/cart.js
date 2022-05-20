const url = "http://localhost:3000/api/products/";

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

function displayProduct(products){
    panier = getPanier();
    let id = `${panier[0]._id}`;
    for (let i = 0; i < products.length; i++) {
        let foundProducts = products[i].find(p => p._id == id);
        console.log(foundProducts);
    }
    
    console.log(foundProducts);
}