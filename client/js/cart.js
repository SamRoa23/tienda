const modalContainer = document.getElementById("modal-container");
const modalPay = document.getElementById("modal-pay");
const modalOverlay = document.getElementById("modal-overlay");

const cartBtn = document.getElementById("cart-btn");
const payBtn = document.getElementById("pay-btn");
const cartCounter = document.getElementById("cart-counter");

const displayCart = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "block";
    //modalOverlay.style.display = "block";

    //Header
    const modalHeader = document.createElement("div");

    const modalClose = document.createElement("div");
    
    modalClose.innerHTML = `
        <span class="close"><img src="./icons/closeCart.png" width=50 height=50></span>
        
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
                <div class="delete-product" id="delete-product"><img src="./icons/deleteItemCart.png" width=10 height=10></div>
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

//Modal Pay
const modalHeaderPay = document.createElement("div");
const modalBodyPay = document.createElement("div");
const modalClosePay = document.createElement("div");
const modalTitlePay = document.createElement("div");

modalHeaderPay.className = "modal-pay"; 
modalTitlePay.className = "modal-pay";
modalClosePay.className = "modal-pay";
modalBodyPay.className = "modal-pay";

modalClosePay.innerHTML = `
        <div><span class="close"><img src="./icons/closeCart.png" width=50 height=50></span></div>
    `;
    
 modalClosePay.className = "close";

modalPay.append(modalClosePay);

modalClosePay.addEventListener("click", () => {
        modalPay.style.display = "none";
        //modalOverlay.style.display = "none";
    });

modalBodyPay.innerHTML = `
<div></div>
<div class="cliente">Nombre Cliente</div>

<div>
        <div><h3>Tipo de Pago: </h3></div>
        <div><h3>Valor del Pago: $ </h3></div>
        
</div>
`;
modalBodyPay.className = "close";

 modalPay.append(modalBodyPay);

 const displayPay = () => {
    modalTitlePay.addEventListener("click", () => {
    modalPay.style.display = "none";
    console.log("enviando correo....");
    var templateParams = {
        name: 'TiendaMeca',
        notes: 'Gracias por la Compra!'
    };
    
    //template_yqw1fkj
    emailjs.send('service_qkm6l0c', 'template_p33kgq1', templateParams, '1hs4qNrXUTUhq0AoD')
        .then(function(response) {
           console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
           console.log('FAILED...', error);
        });
});

modalTitlePay.className = "close";
modalTitlePay.innerHTML = `
    <div>
    <span class="close">
    <button class="btn btn-primary">Aplicar Pago</button>
    </span>
    </div>
`;

 modalPay.append(modalTitlePay);
 modalPay.style.display = "block";
     
}

payBtn.addEventListener("click", displayPay);

const displayCartCounter = ()=> {
    const totel = cart.reduce((acc, el) => acc + el.quantity, 0);
    cartCounter.style.display = "block";
    cartCounter.innerText = totel;
    if(cart.length > 0){
        payBtn.style.display = "block";
    }
}

