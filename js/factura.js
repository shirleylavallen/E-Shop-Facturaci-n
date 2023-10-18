let productos = [];
const url = "api/productos.json";

function mostrarToast() {
  var miToast = document.getElementById("miToast");
  var cartel = new bootstrap.Toast(miToast);
  cartel.show();
}

document.addEventListener("DOMContentLoaded", () => {
  mostrarToast();
});

// similar a  función getJSONData.
let obtener = (url) => {
  var resultado = {};
  return fetch(url)
    .then((respuesta) => {
      if (respuesta.ok) {
        return respuesta.json();
      } else {
        throw Error(respuesta.statusText);
      }
    })
    .then((respuesta) => {
      resultado.status = "ok";
      resultado.data = respuesta;

      return resultado;
    })
    .catch((error) => {
      resultado.status = "error";
      resultado.data = error;

      return resultado;
    });
};

document.addEventListener("DOMContentLoaded", () => {
  obtener(url).then((resultado) => {
    //Agrego los productos a la lista
    if (resultado.status === "ok") {
      productos = resultado.data;
      //cargarProductos(productos); funcion que carga productos en la lista disponible
      console.log(productos);
    }

    const innerProduct = document.getElementById("floatingSelect");
    let value = 1;
    for (const producto of productos) {
      const option = document.createElement("option");
      option.text = `${producto.producto}, ${producto.precio}`;
      option.value = value;
      innerProduct.appendChild(option);
      value++;
    }
  });

  /* addEventListener al botón que agrega productos */
const button = document.getElementById("agregarProducto");
button.addEventListener("click", () => {
  let clienteNombreInput = document.getElementById("cliente");
  let clienteRutInput = document.getElementById("rut");
  let productoSelect = document.getElementById("floatingSelect");
  let selectedOption = productoSelect.options[productoSelect.selectedIndex];

  let clienteNombre = clienteNombreInput.value;
  let clienteRut = clienteRutInput.value;

  if (!clienteNombre && !clienteRut) {
    clienteNombre = "Consumidor Final";
    clienteRut = "Sin RUT";
  }

  if (selectedOption && selectedOption.value !== "Seleccione su producto") {
    const productoNombre = selectedOption.text.split(", ")[0];
    const productoPrecio = parseFloat(selectedOption.text.split(", ")[1]);

    const tablaProductos = document.getElementById("tablaProductos");
    const newRow = tablaProductos.insertRow();
    const productNameCell = newRow.insertCell(0);
    const productPriceCell = newRow.insertCell(1);

    productNameCell.innerText = `${clienteNombre} - ${clienteRut} - ${productoNombre}`;
    productPriceCell.innerText = productoPrecio;

    productoSelect.selectedIndex = 0;
  }
});
});
