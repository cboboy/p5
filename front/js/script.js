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

function displayProduct(products) {
  for (let i = 0; i < products.length; i++) {
    let a = document.createElement("a");
    a.setAttribute("href", `./product.html?id=${products[i]._id}`);
    a.innerHTML = `
    <article>
        <img src="${products[i].imageUrl}" alt="${products[i].altTxt}">
        <h3 class="productName">${products[i].name}</h3>
        <p class="productDescription">${products[i].description}</p>
    </article>
    `;
    document.querySelector("#items").appendChild(a);
  }
}
