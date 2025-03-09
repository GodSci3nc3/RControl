document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const password = document.getElementById("password").value;

    const response = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
    });

    const data = await response.json();
    if (response.ok) {
        mostrarModal();
    } else {
        alert(data.error);
    }
});

function mostrarModal() {
    document.getElementById("otpModal").style.display = "flex";
}

document.getElementById("verifyOtpBtn").addEventListener("click", async () => {
    const otp = document.getElementById("otpInput").value;

    const response = await fetch("/verificar-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp })
    });

    const data = await response.json();
    if (response.ok) {
        window.location.href = "/dashboard.html";
    } else {
        alert("Código OTP incorrecto.");
    }
});
