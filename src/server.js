const express = require("express");
const session = require("express-session");
const { login } = require("./controllers/authController");

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(session({ secret: "clave_secreta", resave: false, saveUninitialized: true }));

// Ruta de autenticación por contraseña (sin OTP)
app.post("/login", login);

// No se necesita la ruta /verificar-otp por ahora

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
