//Cargo los productos en la pagina html, desde el arreglo (products.js)

//Enlazo en una variable la etiqueta con el ID correspondiente del DOM (Document Object Model) o pagina html
const shopContent = document.getElementById("shopContent");             //Div en que adiciono la lista de productos
const modalDescripcion = document.getElementById("modal-descripcion");  //Modal descripcion del producto

const cart = [];                                                        //Defino arreglo para manejo de los productos desde products.js

products.forEach((itemProducto) =>{                                     //Recorre el arreglo por cada item

    const content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
        <img id="${itemProducto.id}" alt="${itemProducto.productName}" src="${itemProducto.img}">
        <h3>${itemProducto.productName}</h3>
        <p>${itemProducto.price} $</p>
        `;

        shopContent.append(content);

        //Evento Imagen
        const linkimagen = document.getElementById(itemProducto.id);
        linkimagen.addEventListener('click', () => {
            displayProducto(itemProducto.id);
        });

        const buyButton = document.createElement("button");
        
        buyButton.innerText = "Carrito";
        buyButton.className = "modal-body"

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
            } 
        });

});

const displayProducto = (idx)=> {
    modalDescripcion.innerHTML = "";
    modalDescripcion.style.display = "block";
    //Header
    const modalHeader = document.createElement("div");

    const modalClose = document.createElement("div");
    
    modalClose.innerHTML = `
    <div class="container ">
      <div class="row">
        <span class="close"><img src="./icons/closeCart.png" width=50 height=50></span>
      </div>
    </div>
    `;
    
    modalClose.className = "modal-body";
    modalHeader.append(modalClose);

    //const modalTitle = document.createElement("div");

    modalClose.addEventListener("click", () => {
        modalDescripcion.style.display = "none";
        modalOverlay.style.display = "none";
    });

    modalDescripcion.append(modalHeader);

    const modalBody = document.createElement("div");
        modalBody.className = "modal-body";
        modalBody.innerHTML = `
        <div class="container ">
        <div class="row">
            <div class="col">
             
            </div>
            <div class="col">
                      
            </div>
            
            <div class="col">
                     
            </div>
            <div class="col">
                <p>Descripcion del producto ${idx}</p>
            </div>
        
        </div>
    
     </div>
    

        `;

        modalDescripcion.append(modalBody);
    //alert(idx);
};