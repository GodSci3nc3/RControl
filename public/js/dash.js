document.getElementById("checkStatusBtn").addEventListener("click", async () => {
    const pc = document.getElementById("pcSelect").value;
    const statusResult = document.getElementById("statusResult");


    try {
        const response = await axios.get(`/ssh/estado?pc=${pc}`);
        const data = response.data;

        if (data.estado === "Encendido") {
            statusResult.textContent = `Estado: 🟢 Encendido (${data.ip})`;
            statusResult.style.color = "green";
        } else if (data.estado === "Apagado") {
            statusResult.textContent = `Estado: 🔴 Apagado (${data.ip})`;
            statusResult.style.color = "red";
        } else {
            statusResult.textContent = `Estado: 🟡 Suspendido o sin respuesta (${data.ip})`;
            statusResult.style.color = "orange";
        }
    } catch (error) {
        console.error("Error al obtener el estado:", error);
        statusResult.textContent = "Error al conectar con el servidor.";
        statusResult.style.color = "red";
    }
});
