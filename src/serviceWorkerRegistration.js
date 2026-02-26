import Swal from "sweetalert2";
/* import Swal from "sweetalert2";box-window"; */

export default function registerServiceWorker() {
  if ("production" !== process.env.NODE_ENV) {
    return;
  }
  // Check if the serviceWorker Object exists in the navigator object ( means if browser supports SW )
  if ("serviceWorker" in navigator) {
    const wb = new Workbox("sw.js");

    wb.addEventListener("installed", (event) => {
      
      if (event.isUpdate) {
       
        Swal.fire({
          title: "Actualización",
          text: "Hemos mejorado algunas cosas para ti ",
          icon: "warning",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Aceptar",
          footer: "Tenemos nuevas promosiones",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
            Swal.fire("Actualizacion!", "App Actualizada.", "success");
          }
        });
      }
    });
    wb.register();
  }
}
