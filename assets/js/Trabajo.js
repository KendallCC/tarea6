// window.onload=cargaDatos();

function cargaDatos() {
  if (localStorage.getItem("cliente")) {
    let cliente = JSON.parse(localStorage.getItem("cliente"));

    //itemms formulario
    var nombre = (document.getElementById("name").value = cliente.nombre);
    var correo = (document.getElementById("mail").value = cliente.correo);
    var fecha = (document.getElementById("fecha").value = cliente.fecha);
    var salario = (document.getElementById("salario").value = cliente.salario);
    var interes = (document.getElementById("interes").value = cliente.interes);
    var annos = (document.getElementById("annos").value = cliente.annos);
    var vivienda = (document.getElementById("vivienda").value =
      cliente.vivienda);
    var monto = (document.getElementById("monto").value = cliente.monto);
    cuadros();
  } else {
    alert("No tiene datos guardados");
  }
}

function cuadros() {

    let cliente = JSON.parse(localStorage.getItem("cliente"));
  //items cuadro
  var correocuadro = (document.getElementById("correocuadro").innerHTML =
    "Correo Electronico: " + cliente.correo);

  var nombrecuadro = (document.getElementById("nombrecuadro").innerHTML =
    "Nombre: " + cliente.nombre);

  var fechacuadro = (document.getElementById("fechacuadro").innerHTML =
    "Fecha Nacimiento: ");
  cliente.fecha;
  var salariocuadro = (document.getElementById("salariocuadro").innerHTML =
    "Salario Neto Mensual: " + cliente.salario);
  var viviendacuadro = (document.getElementById("valorcuadro").innerHTML =
    "Valor de la vivienda: " + cliente.vivienda);
  var montocuadro = (document.getElementById("montocuadro").innerHTML =
    "Monto a Solicitar: " + cliente.valorSolicitado);

  var plazocuadro = (document.getElementById("plazocuadro").innerHTML =
    "Plazo en años: " + cliente.annos);

  var tazacuadro = (document.getElementById("tazacuadro").innerHTML =
    "Taza interes: " + cliente.interes + "%");

  var cuotacuadro = (document.getElementById("cuotacuadro").innerHTML =
    "Cuota: " + cliente.cuota);
  var porsentajecuadro = (document.getElementById(
    "porsentajecuadro"
  ).innerHTML = "ingreso Neto Requerido: " + cliente.ingresoNeto);

  var textoFinal = document.getElementById("textoFinal");

  var textoFinal2 = document.getElementById("textoFinal2");



  if (cliente.salario >= cliente.ingresoNeto) {
    textoFinal.innerHTML = "Monto de salario suficiente para el crédito";
  } else {
    textoFinal.innerHTML = "Monto de salario insuficiente";
  }

  var edad=calcularEdad(cliente.fecha);
if (edad>22&&edad<55) {
    textoFinal2.innerHTML="Cliente con edad suficiente para crédito";
} else {
    textoFinal2.innerHTML="Cliente no califica para crédito por edad";
}

var meses=cliente.annos*12;
generarTablaPagos(cliente.salario,cliente.interes,meses,cliente.cuota);

}


function calcularEdad(fecha) {
    var hoy = new Date();
    var cumpleanos = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }

    return edad;
}

function valoresCliente() {
  var nombre = document.getElementById("name").value;
  var correo = document.getElementById("mail").value;
  var fecha = document.getElementById("fecha").value;
  var salario = document.getElementById("salario").value;
  var interes = document.getElementById("interes").value;
  var annos = document.getElementById("annos").value;
  var vivienda = document.getElementById("vivienda").value;
  var monto = document.getElementById("monto").value;

  if (
    nombre == "" ||
    correo == "" ||
    fecha == "" ||
    correo == "" ||
    salario == "" ||
    interes == "" ||
    annos == "" ||
    vivienda == "" ||
    monto == ""
  ) {
    alert("rellene los campos obligatorios porfavor");
    return;
  } else {
    var valorSolicitado = vivienda * (monto / 100);

    let cliente = {
      nombre: nombre,
      correo: correo,
      fecha: fecha,
      salario: salario,
      interes: interes,
      annos: annos,
      vivienda: vivienda,
      monto: monto,
      valorSolicitado: valorSolicitado,
      cuota: "",
      ingresoNeto: "",
    };

    localStorage.setItem("cliente", JSON.stringify(cliente));
    montopagomensual(interes, valorSolicitado, annos);
  }
}

function montopagomensual(interes, valorSolicitado, annos) {
  let cliente = JSON.parse(localStorage.getItem("cliente"));

  var meses = annos * 12;

  var calculo =
    (valorSolicitado * (interes / 100) * Math.pow(1 + interes / 100, meses)) /
      Math.pow(1 + interes / 100, meses) -
    1;

  cliente.cuota = ~~calculo;
  cliente.ingresoNeto = ~~(calculo * 0.4);
  localStorage.removeItem("cliente");

  localStorage.setItem("cliente", JSON.stringify(cliente));
  cuadros();
}



function generarTablaPagos(capitalInicial, tasaInteres, plazoMeses, pagoMensual) {

    
    let saldo = capitalInicial;
    let tabla = document.getElementById("tablaPagos").getElementsByTagName("tbody")[0];
    tabla.innerHTML = "";
    for (let i = 1; i <= plazoMeses; i++) {
      let intereses = saldo * (tasaInteres / 12);
      let amortizacion = pagoMensual - intereses;
      saldo -= amortizacion;
      tabla.innerHTML += `<tr><td>${i}</td><td>${pagoMensual.toFixed(2)}</td><td>${intereses.toFixed(2)}</td><td>${amortizacion.toFixed(2)}</td><td>${saldo.toFixed(2)}</td></tr>`;
    }
  }