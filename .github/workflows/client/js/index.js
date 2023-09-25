//Cargo las imagenes
const shopContent = document.getElementById("shopContent");

const cart = [];

products.forEach((itemProducto) =>{
    const content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
        <img alt="${itemProducto.productName}" src="${itemProducto.img}" >
        <h3>${itemProducto.productName}</h3>
        <p>${itemProducto.price} $</p>
        `;
        //console.log("Agregando...");
        shopContent.append(content);

        const buyButton = document.createElement("button");
        
        buyButton.innerText = "Carrito";

        content.append(buyButton); 

        buyButton.addEventListener('click', ()=> {

            const repeat = cart.some((repeatProduct) => (repeatProduct.id === itemProducto.id));
            
            if(repeat){
                 cart.map((repeatProduct) => {
                     if(repeatProduct.id === itemProducto.id){
                         repeatProduct.quantity++;
                         displayCartCounter();
                     }
                 });
            }else{
                cart.push({
                    id: itemProducto.id,
                    productName:  itemProducto.productName,
                    price: itemProducto.price,
                    quantity: itemProducto.quantity,
                    img: itemProducto.img,
                });
                displayCartCounter();
                //console.log(cart);
            } 
        });

});
