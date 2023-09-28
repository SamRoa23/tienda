//Proyecto Ingenieria Mecatronica
// Samuel Roa

//En este modulo, Cargo los productos en la pagina html, desde el arreglo (products.js)
//Ademas se carga una ventana Modal para mostrar la descripcion del Producto

//Instancia en un objeto la etiqueta con el ID correspondiente del DOM (Document Object Model) o pagina html

const shopContent = document.getElementById("shopContent");             //Etiqueta donde se adiciono la lista de productos
const modalDescripcion = document.getElementById("modal-descripcion");  //Etiqueta donde se agrega el Modal descripcion del producto

const cart = [];                                                        //Defino arreglo para manejo de los productos desde products.js

products.forEach((itemProducto) =>{                                     //Recorre el arreglo por cada item de Producto para armar Modal Carrito

    const content = document.createElement("div");
    content.className = "card";
                                                                        //Agrego la imagen, Nombre y Precio
    content.innerHTML = `                                       
        <img id="${itemProducto.id}" alt="${itemProducto.productName}" src="${itemProducto.img}">
        <h3>${itemProducto.productName}</h3>
        <p>${itemProducto.price} $</p>
        `;

        shopContent.append(content);

        const linkimagen = document.getElementById(itemProducto.id);    //Creo Evento de la  Imagen, para mostrar descripcion Producto
        linkimagen.addEventListener('click', () => {
            displayDescripcionProducto(itemProducto);
        });

        const buyButton = document.createElement("button");             //Se crea un boton, para agregar Productos al Carrito
        
        buyButton.innerText = "Carrito";
        buyButton.className = "modal-body"

        content.append(buyButton); 
                                                                        //Agrego un Evento al Boton Carrito que adicione items al 
                                                                        //Modal Carrito y valida que no sean repetidos
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
                                                                        //Defino una funcion que muestre la descripcion del Producto
                                                                        //Cada Modal esta compuesto por Header (boton Cerrar), Body para
                                                                        //Para mostrar informacion 
const displayDescripcionProducto = (pro)=> {                            
                                                                        
    modalDescripcion.innerHTML = "";
    modalDescripcion.style.display = "block";

    //Header
    const modalHeader = document.createElement("div");
    const modalClose = document.createElement("div");
    
    modalClose.innerHTML = `
    <div class="container ">
      <div class="row">
        <span class="close"><img src="./icons/closeCart.png" width=40 height=40></span>
      </div>
    </div>
    `;
    
    modalClose.className = "modal-body";
    modalHeader.append(modalClose);

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
                <img class="product-img" src="${pro.img}" />   
            </div>
            <div class="col">
            <h6>${pro.productName}</h6>   
            </div>
        </div>
        <div class="row">
            
            <div class="col">
                ${pro.description}
            </div>
        </div>
        <div class="row">
            <h6>Caracteristicas</h6>
            <div class="col">
                ${pro.specifications}
            </div>
        </div>
    </div>
    `;

    modalDescripcion.append(modalBody);
    
};