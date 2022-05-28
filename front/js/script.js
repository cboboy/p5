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

function displayProduct(products) {
  for (let i = 0; i < products.length; i++) {
    // let a = document.createElement("a");
    // a.setAttribute("href", `./product.html?id=${products[i]._id}`);
    //     a.innerHTML = `
    // <article>
    //     <img src="${products[i].imageUrl}" alt="${products[i].altTxt}">
    //     <h3 class="productName">${products[i].name}</h3>
    //     <p class="productDescription">${products[i].description}</p>
    // </article>
    // `;
    // document.querySelector("#items").appendChild(a);

    // declare et initialise les variables pour les elements
    let a = document.createElement("a");
    let article = document.createElement("article");
    let img = document.createElement("img");
    let h3 = document.createElement("h3");
    let p = document.createElement("p");
    // configure les elements
    a.href = `./product.html?id=${products[i]._id}`;
    img.src = products[i].imageUrl;
    img.setAttribute("alt", `${products[i].altTxt}`);
    h3.classList.add("productName");
    h3.textContent = `${products[i].name}`;
    p.classList.add("productDescription");
    p.textContent = `${products[i].description}`;
    // place les elements 
    a.appendChild(article);
    article.appendChild(img);
    article.appendChild(h3);
    article.appendChild(p);
    document.querySelector("#items").appendChild(a);
  }
}
