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
      const idProd = productos.id;
      const nombreProd = productos.producto;
      const precioProd = productos.precio;

      for (let producto of productos){
        const innerProduct = document.getElementById("floatingSelect");
        var value = 1;
        innerProduct.innerHTML = 
        `<option value="${value}">${nombreProd}</option>`;
      }
      
    }
  });

  /* addEventListener al botón que agrega productos */
  const button = document.getElementById("ADDNAME");
  button.addEventListener("click", () =>{



  })
});
