
function pedirLista() {
  const productos = [];

  while (true) {
    let nombre = prompt("Nombre del producto: ");
    if (nombre === null || nombre === "") {
      break;
    }

    let comparador = prompt("Precio de " + nombre + " (numeros enteros):");
    let precio = parseInt(comparador); 

    if (isNaN(precio)) {
      alert("precio inválido. ingresa un numero entero.");
    } else {
      productos.push({ nombre: nombre, precio: precio });
    }
  }

  return productos;
}

function mostrarResultado(lista) {
  let mensaje = "Lista del super:\n";
  let total = 0;

  for (let item of lista) {
    mensaje = mensaje+ "- " + item.nombre + ": $" + item.precio + "\n";
    total = total+ item.precio;
  }

  mensaje = mensaje+ "\nTotal a pagar: $" + total;
  alert(mensaje);
}

function simulador() {
  alert("lista del supermercado.");
  const lista = pedirLista();

mostrarResultado(lista);
}
 
simulador();

