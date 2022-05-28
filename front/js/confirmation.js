// recuperation de l'id du produit 
const url2 = window.location.search;
const urlId = new URLSearchParams(url2);
const id = urlId.get("orderId");

orderId = document.getElementById("orderId");
orderId.textContent = `${id}`;