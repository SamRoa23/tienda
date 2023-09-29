const modalContainer = document.getElementById("modal-container");
const modalPay = document.getElementById("modal-pay");
const modalOverlay = document.getElementById("modal-overlay");

const cartBtn = document.getElementById("cart-btn");
const payBtn = document.getElementById("pay-btn");

const cartCounter = document.getElementById("cart-counter");
let ptotal = 0;

const displayCart = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "block";
    //modalOverlay.style.display = "block";

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
        modalContainer.style.display = "none";
        modalOverlay.style.display = "none";
    });

    modalContainer.append(modalHeader);
    //console.log(cart.length);

    if(cart.length > 0){

    //Body del Modal Carrito
    cart.forEach((itemProducto) =>{
        const modalBody = document.createElement("div");
        modalBody.className = "modal-body";
        modalBody.innerHTML = `
        <div class="container ">
            <div class="row">
                <div class="col">
                    <img class="product-img" src="${itemProducto.img}" />   
                </div>
                <div class="col">
                    <h4>${itemProducto.productName}</h4>        
                </div>
                <div class="col">
                    <span class"quantity-btn-decrese" id="quantity-btn-decrese"> -  </span>            
                </div>
                <div class="col">
                    <span class"quantity-input" id="quantity-input"> (${itemProducto.quantity}) </span>    
                </div>
                <div class="col">
                    <span class"quantity-btn-increse" id="quantity-btn-increse"> +  </span>    
                </div>
                <div class="col">
                    <div class="price">$${itemProducto.price * itemProducto.quantity}</div>        
                </div>
                <div class="col">
                    <div class="delete-product" id="delete-product"><img src="./icons/deleteItemCart.png" width=20 height=20></div>
                </div>
            </div>
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
    ptotal = total;

    //Modal footer
    
    const modalFooter = document.createElement("div");
    modalFooter.className = "modal-footer";
    modalFooter.innerHTML = `
        <div class="total-price" id="total-price">Total $ ${ptotal}</div>
    `;
    modalContainer.append(modalFooter);
  
    }
    else{
        const modalText = document.createElement("h2");
        modalText.className = "modal-body";
        modalText.innerText = "El carrito esta vacio";
        modalContainer.append(modalText);
    }

    if(cart.length > 0){
        console.log("Muestra el boton de Pago, si hay elementos al mostrar el carrito!");
        payBtn.style.display = "block";
    }

};

cartBtn.addEventListener("click", displayCart);

const deleteCartProd = (id) => {
    const foundId = cart.findIndex((elem) => elem.id === id);
    cart.splice(foundId, 1);
    displayCart();
    displayCartCounter();
}

//Modal Pay (ventana de Pagar)
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

<div class="container ">
    <div class="row">
    <div class="col">
        Datos del Cliente    
    </div>
    </div>
      <div class="row">

        <div class="col">
            Nombre:
        </div>
        <div class="col-sm-7">
        <input type="text" class="inputtexto" id="InputName" placeholder="nombre de cliente" style="width: 205px;">
        </div>
      </div>
      
      <div class="row">
        <div class="col">
          Email:
        </div>
        <div class="col-sm-7">
          <input type="email" class="inputtexto" id="InputEmail" placeholder="nombree@dominio.com">
        </div>
      </div>

      <div class="row">  
        <div class="col">
            Tipo Pago:
        </div>
        <div class="col-sm-7">
        <input class="form-control" list="datalistOptions" id="ListTipoPago" placeholder="Escoja...">
        <datalist id="datalistOptions">
          <option value="Efectivo">
          <option value="Tarjeta Debito">
          <option value="Tarjeta Credito">
          <option value="Nequi">
          <option value="Consignacion Bancaria">
        </datalist>
        </div>
      </div>

      <div class="row">
        <div class="col">
            Valor Pago:
        </div>
        <div class="col">
        <input type="text" class="inputnumero" id="InputValor" value="0" disabled readonly>
        </div>
      </div> 

      <div class="row">
      <div class="col">
          Flete:
      </div>
      <div class="col">
      <input type="text" class="InputFlete" id="InputFlete" value="0">
      </div>
    </div>        
     
 </div>

`;

modalBodyPay.className = "close";

modalPay.append(modalBodyPay);

 const enviarPago = () => {
    
    //var x = document.getElementById("InputEmail");
    let nomCliente = document.querySelector("#InputName");
    let emailDestino = document.querySelector("#InputEmail");
    let tipoPago = document.querySelector("#ListTipoPago");
    let flete = document.querySelector("#InputFlete");

    document.getElementById("InputValor").value = ptotal;
    let rtotal = document.querySelector("#InputValor"); 

    var gtotal = parseInt(rtotal.value) + parseInt(flete.value);
    
/*     if(isNaN(gtotal)){
        console.log(ptotal);
        console.log(flete.value);
        console.log("is non");
        return;
    }
 */
    console.log("gtotal ...." + gtotal);
    
    let html = "";

    //Arma los productos del Carrito que se estan pagando
    cart.forEach((itemProducto) =>{
        html += '(' + itemProducto.quantity + ')' +  '\t' + itemProducto.productName + '\n';
    });

    //console.log(html);

    modalTitlePay.addEventListener("click", () => {
    
    //console.log("Enviando correo a...." + " " + emailDestino.value);
    let mensaje = "Nombre Cliente: " + nomCliente.value + "\n";
    mensaje += "Forma de Pago: " + tipoPago.value + "\n";
    mensaje += "Valor de la factura $" + ptotal + "\n\n";
    mensaje += "Valor del flete $" + flete.value + "\n\n";
    mensaje += "Valor Total $" + gtotal + "\n\n";
    mensaje += "Encontrara la Remision adjunta en el correo";

    var templateParams = {
        name: 'TiendaMeca',
        from_name: emailDestino.value,
        to_email: emailDestino.value,
        nombre_cliente: nomCliente.value,
        message: mensaje,
        message_productos: html,
        notes: 'Gracias por la Compra!'
    };
    
    //service_id, template_id, templateParams, Public Key   (EmailJS)
    emailjs.send('service_4qs3lwo', 'template_bmp256o', templateParams, 'Wc8w-ntVwOQLrcWmy')
        .then(function(response) {
           //console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
           console.log('FAILED...', error);
        });

        modalPay.style.display = "none"; 
         
});

modalTitlePay.className = "close";
modalTitlePay.innerHTML = `
    <div>
    <span class="close">
    <button class="btn btn-primary">Pagar</button>
    </span>
    </div>
`;

 modalPay.append(modalTitlePay);
 modalPay.style.display = "block";
     
}

/* Boton Pagar en el Modal de Pago*/

payBtn.addEventListener("click", enviarPago);

const displayCartCounter = ()=> {
    const totel = cart.reduce((acc, el) => acc + el.quantity, 0);
    cartCounter.style.display = "block";
    cartCounter.innerText = totel;
    
}

function formatearNum(n, sep, decimals) {
    sep = sep || ","; // Default to period as decimal separator
    decimals = decimals || 2; // Default to 2 decimals

    return n.toLocaleString("en-US", {style:"currency", currency:"USD"});
}

