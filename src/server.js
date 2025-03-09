const express = require("express");
const session = require("express-session");
const { login, verificarOTPController } = require("./controllers/authController");

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(session({ secret: "clave_secreta", resave: false, saveUninitialized: true }));

// Rutas de autenticación
app.post("/login", login);
app.post("/verificar-otp", verificarOTPController);

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
