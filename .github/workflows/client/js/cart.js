const modalContainer = document.getElementById("modal-container");
const modalOverlay = document.getElementById("modal-overlay");

const cartBtn = document.getElementById("cart-btn");
const cartCounter = document.getElementById("cart-counter");

// Get the <span> element that closes the modal
//var span = document.getElementsByClassName("close")[0];

const displayCart = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "block";
    //modalOverlay.style.display = "block";

    //Header
    const modalHeader = document.createElement("div");

    const modalClose = document.createElement("div");
    
    modalClose.innerHTML = `
        <span class="close">❌</span>
        
    `;
    
    modalClose.className = "close";
    modalHeader.append(modalClose);

    const modalTitle = document.createElement("div");
    modalTitle.innerHTML = "Carrito";
    modalTitle.className = "close";
    modalHeader.append(modalTitle);

    modalClose.addEventListener("click", () => {
        modalContainer.style.display = "none";
        modalOverlay.style.display = "none";
        //console.log("?");
    });

    modalContainer.append(modalHeader);
    console.log(cart.length);

    if(cart.length > 0){

    //Body del Modal
    cart.forEach((itemProducto) =>{
        const modalBody = document.createElement("div");
        modalBody.className = "modal-body";
        modalBody.innerHTML = `
            <div class="product">
                <img class="product-img" src="${itemProducto.img}" />
                <div class="product-info">
                    <h4>${itemProducto.productName}</h4>
                </div>
                <div class="quantity">
                    <span class"quantity-btn-decrese" id="quantity-btn-decrese"> -  </span>
                    <span class"quantity-input" id="quantity-input"> (${itemProducto.quantity}) </span>
                    <span class"quantity-btn-increse" id="quantity-btn-increse"> +  </span>
                </div>   
                <div class="price"> ${itemProducto.price * itemProducto.quantity} $</div>
                <div class="delete-product" id="delete-product">❌</div>
            </div>    
        `;

        modalContainer.append(modalBody);

        const decrese = modalBody.querySelector("#quantity-btn-decrese");

        if(decrese){
            decrese.addEventListener('click', () => {
                if(itemProducto.quantity !== 1){;
                    itemProducto.quantity--;
                    displayCart();
                    displayCartCounter();
                }
            });
        }
        else{
            //console.log("NO decrese....");
        }

        const increse = modalBody.querySelector("#quantity-btn-increse");

        if(increse){
            increse.addEventListener('click', () => {
                itemProducto.quantity++;
                displayCart();
                displayCartCounter();
            });
        }
        
        const delproduct = modalBody.querySelector("#delete-product");

        if(delproduct){
            delproduct.addEventListener('click', () => {
                deleteCartProd(itemProducto.id);
                displayCartCounter();
            });
        }

    });

    const total = cart.reduce((acum, elem) => acum + (elem.price * elem.quantity), 0);

    //Modal footer
    const modalFooter = document.createElement("div");
    modalFooter.className = "modal-footer";
    modalFooter.innerHTML = `
        <div class="total-price">Total $ ${total}</div>
    `;
    modalContainer.append(modalFooter);

    }
    else{
        const modalText = document.createElement("h2");
        modalText.className = "modal-body";
        modalText.innerText = "El carrito esta vacio";
        modalContainer.append(modalText);
    }
};

cartBtn.addEventListener("click", displayCart);

const deleteCartProd = (id) => {
    const foundId = cart.findIndex((elem) => elem.id === id);
    cart.splice(foundId, 1);
    displayCart();
    displayCartCounter();
}

const displayCartCounter = ()=> {
    const totel = cart.reduce((acc, el) => acc + el.quantity, 0);
    cartCounter.style.display = "block";
    cartCounter.innerText = totel;
}