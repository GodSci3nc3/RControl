const express = require("express");
const session = require("express-session");
const { login } = require("./controllers/authController");
const { apagarComputador, programarApagado, estadoComputador } = require("./controllers/sshController");

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(session({ secret: "clave_secreta", resave: false, saveUninitialized: true }));

app.post("/login", login);

app.post("/ssh/apagar", apagarComputador);
app.post("/ssh/programar-apagado", programarApagado);
app.get("/ssh/estado", estadoComputador);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
