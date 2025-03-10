document.querySelectorAll(".checkStatusBtn").forEach(button => {
    button.addEventListener("click", async (e) => {
        const pc = e.target.getAttribute("data-pc");
        const statusResult = document.getElementById(`status-${pc}`);

        try {
            const response = await axios.get(`/ssh/estado?pc=${pc}`);
            const data = response.data;

            if (data.estado === "Encendido") {
                statusResult.textContent = `Estado: 🟢 Encendido (${data.pc})`;
                statusResult.style.color = "green";
            } else {
                statusResult.textContent = `Estado: 🔴 Apagado o Suspendido (${data.pc})`;
                statusResult.style.color = "red";
            }
        } catch (error) {
            statusResult.textContent = "Error al conectar con el servidor.";
            statusResult.style.color = "red";
        }
    });
});

document.querySelectorAll(".shutdownBtn").forEach(button => {
    button.addEventListener("click", async (e) => {
        const pc = e.target.getAttribute("data-pc");

        try {
            const response = await axios.post(`/ssh/apagar`, { pc });
            alert(response.data.mensaje);
        } catch (error) {
            alert("Error al apagar el computador.");
        }
    });
});

document.querySelectorAll(".scheduleShutdownBtn").forEach(button => {
    button.addEventListener("click", async (e) => {
        const pc = e.target.getAttribute("data-pc");
        const minutesInput = e.target.previousElementSibling.value; 

        if (!minutesInput || isNaN(minutesInput) || minutesInput <= 0) {
            alert("Por favor, ingresa un tiempo válido.");
            return;
        }

        try {
            const response = await axios.post(`/ssh/programar-apagado`, { pc, minutos: minutesInput });
            alert(response.data.mensaje);
        } catch (error) {
            alert("Error al programar el apagado.");
        }
    });
});
