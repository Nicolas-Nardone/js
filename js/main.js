document.addEventListener("DOMContentLoaded", () => {
    let reservas = JSON.parse(localStorage.getItem("reservas")) || [];

    const inputEquipo1 = document.getElementById("input-equipo1");
    const inputEquipo2 = document.getElementById("input-equipo2");
    const inputFecha = document.getElementById("input-fecha");
    const inputHoraComienzo = document.getElementById("input-hora-comienzo");
    const inputHoraFin = document.getElementById("input-hora-fin");
    const inputCancha = document.getElementById("input-cancha");
    const btnAgregarReserva = document.getElementById("btn-agregar-reserva");
    const listaReservas = document.getElementById("lista-reservas");

    function mostrarReservas() {
        listaReservas.innerHTML = "";

        reservas.sort((a, b) => {
            if(a.fecha === b.fecha){
                return a.horaComienzo.localeCompare(b.horaComienzo);
            }
            return a.fecha.localeCompare(b.fecha);
        });

        reservas.map((reserva, index) => {
            const li = document.createElement("li");
            li.textContent = `${reserva.fecha} | ${reserva.horaComienzo} - ${reserva.horaFin} | ${reserva.cancha} | ${reserva.equipo1} vs ${reserva.equipo2}`;
            const btnEliminar = document.createElement("button");
            btnEliminar.textContent = "Eliminar";
            btnEliminar.addEventListener("click", () => {
                eliminarReserva(index);
            });
            li.appendChild(btnEliminar);
            listaReservas.appendChild(li);
        });
    }

    function agregarReserva() {
        const equipo1 = inputEquipo1.value.trim();
        const equipo2 = inputEquipo2.value.trim();
        const fecha = inputFecha.value;
        const horaComienzo = inputHoraComienzo.value;
        const horaFin = inputHoraFin.value;
        const cancha = inputCancha.value;

        if(!equipo1 || !equipo2 || !fecha || !horaComienzo || !horaFin || !cancha){
            alert("Complete todos los campos de la reserva.");
            return;
        }

        if(horaFin <= horaComienzo){
            alert("La hora de fin debe ser mayor que la hora de comienzo.");
            return;
        }

       
        const solapadas = reservas.filter(r => 
            r.fecha === fecha && r.cancha === cancha &&
            ((horaComienzo >= r.horaComienzo && horaComienzo < r.horaFin) ||
             (horaFin > r.horaComienzo && horaFin <= r.horaFin) ||
             (horaComienzo <= r.horaComienzo && horaFin >= r.horaFin))
        );

        if(solapadas.length === 0){
            reservas.push({equipo1, equipo2, fecha, horaComienzo, horaFin, cancha});
            localStorage.setItem("reservas", JSON.stringify(reservas));
            mostrarReservas();
            
            inputEquipo1.value = "";
            inputEquipo2.value = "";
        } else {
            alert("El horario seleccionado se solapa con otra reserva.");
        }
    }

    function eliminarReserva(index) {
        reservas = reservas.filter((_, i) => i !== index);
        localStorage.setItem("reservas", JSON.stringify(reservas));
        mostrarReservas();
    }

    btnAgregarReserva.addEventListener("click", agregarReserva);

    mostrarReservas();
});
