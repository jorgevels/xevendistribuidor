/* let consecutivo = 1;

function generarReferencia() {
  let referencia = `RF-PRANA${consecutivo.toString().padStart(4, "0")}`;
  consecutivo++;
  return referencia;
}

export { generarReferencia }; */

let consecutivo = localStorage.getItem("consecutivo");

if (!consecutivo) {
  consecutivo = 1;
} else {
  consecutivo = parseInt(consecutivo);
}

function generarReferencia() {
  let referencia = `RF-PRANA${consecutivo.toString().padStart(4, "0")}`;
  consecutivo++;

  localStorage.setItem("consecutivo", consecutivo);

  return referencia;
}

export { generarReferencia };
