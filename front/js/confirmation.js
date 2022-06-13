// recuperation de l'id du produit 
const url2 = window.location.search;
const urlId = new URLSearchParams(url2);
const id = urlId.get("orderId");

// affiche le numéro de commande
orderId = document.getElementById("orderId");
orderId.textContent = `${id}`;

// si numéro de commande, on efface le localstorage
if (id !== 'undefined') {
    localStorage.clear();
};