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
        window.location.href = "/dashboard.html"; 
    } else {
        errorMessage.textContent = data.error; 
        errorMessage.style.display = "block"; 
        setTimeout(() => {
            errorMessage.style.display = "none"; 
        }, 3000);
    }
});
