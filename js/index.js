const productos = [
  {
    id: 1,
    nombre: "Aros Amelie",
    cantidad: 1,
    precio: 2500,
    img: "img/pro1.jpg",
  },
  {
    id: 2,
    nombre: "Collar Lola",
    cantidad: 1,
    precio: 4000,
    img: "img/pro2.jpg",
  },
  {
    id: 3,
    nombre: "Aros Ester",
    cantidad: 1,
    precio: 2370,
    img: "img/pro3.jpg",
  },
  {
    id: 4,
    nombre: "Aros Somalia",
    cantidad: 1,
    precio: 3200,
    img: "img/pro4.jpg",
  },
  {
    id: 5,
    nombre: "Aros Olivia",
    cantidad: 1,
    precio: 2870,
    img: "img/pro5.jpg",
  },
  {
    id: 6,
    nombre: "Aros Luna",
    cantidad: 1,
    precio: 3000,
    img: "img/pro6.jpg",
  },
  {
    id: 7,
    nombre: "Aros Malva",
    cantidad: 1,
    precio: 3400,
    img: "img/pro7.jpg",
  },
  {
    id: 8,
    nombre: "Pulsera Michigan",
    cantidad: 1,
    precio: 4550,
    img: "img/pro8.jpg",
  },
];
let carrito = [];

const contenedor = document.querySelector("#contenedor");
const carritoContenedor = document.querySelector("#carritoContenedor");
const vaciarCarrito = document.querySelector("#vaciarCarrito");
const precioTotal = document.querySelector("#precioTotal");
const activarFuncion = document.querySelector("#activarFuncion");
const procesarCompra = document.querySelector("#procesarCompra");
const totalProceso = document.querySelector("#totalProceso");
const formulario = document.querySelector('#procesar-pago')

if (activarFuncion) {
  activarFuncion.addEventListener("click", procesarPedido);
}

document.addEventListener("DOMContentLoaded", () => {
  carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  mostrarCarrito();
  document.querySelector("#activarFuncion").click(procesarPedido);
});

if(formulario){
  formulario.addEventListener('submit', enviarCompra)
}


if (vaciarCarrito) {
  vaciarCarrito.addEventListener("click", () => {
    carrito.length = [];
    mostrarCarrito();
  });
}

if (procesarCompra) {
  procesarCompra.addEventListener("click", () => {
    if (carrito.length === 0) {
      Swal.fire({
        title: "¡Tu carrito está vacio!",
        text: "Compra algo para continuar con la compra",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    } else {
      location.href = "compra.html";
    }
  });
}

productos.forEach((prod) => {
  const { id, nombre, precio, img, cantidad } = prod;
  if (contenedor) {
    contenedor.innerHTML += `
    <div class="col-md-3">
      <div class="card-text-center">
          <div class="card-mt-3" style="width: 18rem;">
            <img class="card-img-top mt-2" src="${img}" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">${nombre}</h5>
              <p class="card-text">Precio: ${precio}</p>
              <p class="card-text">Cantidad: ${cantidad}</p>
              <button class="btn btn-success" onclick="agregarProducto(${id})">Agregar +</button>
            </div>
          </div>
      </div>
    </div>
    `;
  }
});

const agregarProducto = (id) => {
  const existe = carrito.some(prod => prod.id === id)

  if(existe){
    const prod = carrito.map(prod => {
      if(prod.id === id){
        prod.cantidad++
      }
    })
  } else {
    const item = productos.find((prod) => prod.id === id)
    carrito.push(item)
  }
  mostrarCarrito()

};

const mostrarCarrito = () => {
  const modalBody = document.querySelector(".modal .modal-body");
  if (modalBody) {
    modalBody.innerHTML = "";
    carrito.forEach((prod) => {
      const { id, nombre, precio, img, cantidad } = prod;
      console.log(modalBody);
      modalBody.innerHTML += `
      <div class="modal-contenedor">
        <div>
        <img class="img-fluid img-carrito" src="${img}"/>
        </div>
        <div>
        <p>Producto: ${nombre}</p>
      <p>Precio: ${precio}</p>
      <p>Cantidad :${cantidad}</p>
      <button class="btn btn-danger" onclick="eliminarProducto(${id})">Eliminar producto</button>
        </div>
      </div>
      
  
      `;
    });
  }

  if (carrito.length === 0) {
    console.log("Nada");
    modalBody.innerHTML = `
    <p class="text-center text-dark parrafo">No se agregaron productos al carrito</p>
    `;
  } else {
    console.log("Algo");
  }
  carritoContenedor.textContent = carrito.length;

  if (precioTotal) {
    precioTotal.innerText = carrito.reduce(
      (acc, prod) => acc + prod.cantidad * prod.precio,
      0
    );
  }

  guardarStorage();
};

function guardarStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function eliminarProducto(id) {
  const proId = id;
  carrito = carrito.filter((accesorio) => accesorio.id !== proId);
  mostrarCarrito();
}
function procesarPedido() {
  carrito.forEach((prod) => {
    const listaCompra = document.querySelector("#lista-compra tbody");
    const { id, nombre, precio, img, cantidad } = prod;
    if (listaCompra) {
      const row = document.createElement("tr");
      row.innerHTML += `
              <td>
              <img class="img-fluid img-carrito" src="${img}"/>
              </td>
              <td>${nombre}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>${precio * cantidad}</td>
            `;
      listaCompra.appendChild(row);
    }
  });
  totalProceso.innerText = carrito.reduce(
    (acc, prod) => acc + prod.cantidad * prod.precio,
    0
  );
}

 function enviarCompra(e){
   e.preventDefault()
   const cliente = document.querySelector('#cliente').value
   const email = document.querySelector('#correo').value

   if(email === '' || cliente == ''){
     Swal.fire({
       title: "Asegurate de completar el formulario para continuar",
       icon: "error",
       confirmButtonText: "Aceptar",
   })
 } else {
    Swal.fire({
      position: 'top-center',
      icon: 'success',
      title: "¡Pedido realizado con exito!",
      showConfirmButton: false,
      timer: 1500
    })



  const btn = document.getElementById('button');
   btn.value = 'Enviado';

 }
  form.reset()
  localStorage.clear()
 }
