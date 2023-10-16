// declaro las variables globales
let seleccion, opcion=0, total=0.00, iva=0.05;
let display = document.getElementById('display');
const resultadoMenu = document.getElementById("menu");
const resultadoDiv = document.getElementById("resultado");
const resultadoTotal = document.getElementById("divTotal");
const tituloSelec = document.querySelector(".seleccion");
const imgResultado = document.querySelector("#imgResul img");

// array de menús
const menus = {
    1: {nombre: "Pizza", precio: 9, ingredientes: ["Queso", "Pepperoni", "Champiñones"]},
    2: {nombre: "Hamburguesa", precio: 8, ingredientes: ["Carne", "Queso", "Lechuga", "Tomate"]},
    3: {nombre: "Ensalada", precio: 5, ingredientes: ["Lechuga", "Tomate", "Pepino", "Champiñones"]},
    4: {nombre: "Perrito", precio: 4, ingredientes: ["Lechuga", "Ketchup", "Mostaza"]},
    5: {nombre: "Burrito", precio: 6, ingredientes: ["Carne", "Cebolla", "Pimientos"]}
};

// array de ingredientes
const ingredientes = [
    { nombre: "Queso", imagen: "imgPizza/queso.png", precio: 1 },
    { nombre: "Pepperoni", imagen: "imgPizza/pepperoni.png", precio: 0.9 },
    { nombre: "Champiñones", imagen: "imgPizza/champiñones.png", precio: 0.7 },
    { nombre: "Carne", imagen: "imgPizza/carne.png", precio: 2 },
    { nombre: "Lechuga", imagen: "imgPizza/lechuga.png", precio: 1.2 },
    { nombre: "Tomate", imagen: "imgPizza/tomate.png", precio: 1 },
    { nombre: "Pepino", imagen: "imgPizza/pepino.png", precio: 0.8 },
    { nombre: "Ketchup", imagen: "imgPizza/ketchup.png", precio: 0.6 },
    { nombre: "Mostaza", imagen: "imgPizza/mostaza.png", precio: 0.6 },
    { nombre: "Cebolla", imagen: "imgPizza/cebolla.png", precio: 0.5 },
    { nombre: "Pimientos", imagen: "imgPizza/pimientos.png", precio: 0.7 }
];

// objeto pedido
let pedido = {
    menu: "",
    total: 0.00,
    ingredientes: [],
    getValores: function(){ // genero la factura
        let texto = "";
        let now = new Date(); // fecha actual

        texto += "🛒FACTURA";
        texto += "\nFecha: " + now.getDate() + "/" + (now.getMonth()+1) + "/" + now.getFullYear() + " (" + now.getHours() + "h:" + now.getMinutes() + "m)";
        texto += "\n\nMENU ELEGIDO:\n\t-" + this.menu + "";
        for (let i = 0; i < this.ingredientes.length; i++){
            texto += "\n\t-" + this.ingredientes[i] + "";
        }
        texto += "\nSubtotal: " + this.total.toFixed(2) + "€";
        texto += "\nIVA: " + (iva * 100) + "%";
        texto += "\nTOTAL: " + ((this.total * iva) + this.total).toFixed(2) + "€";
        texto += "\n\n¡bon appétit!\n😊🍕🍔🥗🌭🌮";
        alert(texto);
    }
}

function buscarIngrediente(objeto){ // muestro los ingredientes disponibles de cada menú
    let menuObj = objeto;
    let precio = 0.00;
    tituloSelec.style.display = "block";
    resultadoMenu.innerHTML = "Menú elegido: ";
    resultadoMenu.innerHTML += menuObj.nombre;
    console.log(menuObj.nombre);
    resultadoMenu.innerHTML += ", " + menuObj.precio + "€";
    precio = menuObj.precio;
    for (let i = 0; i < menuObj.ingredientes.length; i++){
        nombreIng = menuObj.ingredientes[i];
        if(nombreIng != ""){
            for (let j = 0; j < ingredientes.length; j++){
                if(nombreIng === ingredientes[j].nombre){
                    resultadoDiv.innerHTML += "<div class='item'><img src='" + ingredientes[j].imagen + "' alt='" + ingredientes[j].nombre + "'><input type='checkbox' name='opciones' value='" + ingredientes[j].nombre + ", " + ingredientes[j].precio + "€' onchange='selecIngrediente(" + precio + ", " + ingredientes[j].precio + ")'>" + ingredientes[j].nombre + " (" + ingredientes[j].precio + "€)</div>";
                    break;
                }
            }
        }								
    }
    mostrarTotal(precio);
}

function selecIngrediente(precioMenu, precioSubMenu){
    total = precioMenu;
    const collection = document.getElementsByName("opciones");
    for (let i = 0; i < collection.length; i++) {
        if (collection[i].type == "checkbox" && collection[i].checked) {
            total += precioSubMenu;				
        }
    }
    display.value = total.toFixed(2); // muestro dos decimales
}

function mostrarIngredientes(valor, imagenBtn){		
    let precio, valorOp, nombreIng = "", opciones = [], menuSelec = true;
    display.value = "";
    opcion = 0;
    total = 0.00;
    valorOp = valor;

    imgResultado.setAttribute("src", "imgPizza/"+imagenBtn+".png");
    imgResultado.setAttribute("alt", imagenBtn);

    resultadoMenu.innerHTML = "";
    resultadoDiv.innerHTML = "";
    
    switch(valorOp){
        case 1: // pizza
            opciones = menus[1];
            break;
        case 2: // hamburguesa
            opciones = menus[2];
            break;
        case 3: // ensalada
            opciones = menus[3];
            break;
        case 4: // perrito
            opciones = menus[4];
            break;
        case 5: // burrito
            opciones = menus[5];
            break;
        default:
            alert("No se ha seleccionado ningún menú");
            menuSelec = false;
    }
    
    if (menuSelec){
        resultadoTotal.style.display = 'block';
        resultadoTotal.style.width = 'fit-content';
        resultadoTotal.style.margin = '0 auto';
        buscarIngrediente(opciones);
    } else { // oculto el total si no ha seleccionado ningún menú
        resultadoTotal.style.display = 'none';
    }
}

function mostrarTotal(precio){
    total = total + precio;
    display.value = total.toFixed(2); // muestro dos decimales
}

function guardarIngredientes(){
    pedido.menu = resultadoMenu.innerHTML;
    pedido.total = total;
    let cadena = "";
    const collection = document.getElementsByName("opciones");

    // confirmo el pedido
    let isConfirm = confirm("¿Estás seguro de realizar el pedido?");
    if(isConfirm){
        for (let i = 0; i < collection.length; i++) {
            if (collection[i].type == "checkbox" && collection[i].checked) {
                cadena = collection[i].value;
                pedido.ingredientes.push(cadena); // añado los ingredientes seleccionados al pedido 			
            }
        }
        pedido.getValores(); // paso por caja
    }else{
        alert("Pedido cancelado 😔");
    }
    location.reload(); // refresco la página
}