const { exec } = require("child_process");

const COMPUTADORES = {
    pc1: { usuario: "arthur", puerto: 2222 }
};

const apagarComputador = (req, res) => {
    const { pc } = req.body;
    if (!COMPUTADORES[pc]) return res.status(400).json({ error: "PC no válida" });

    const { usuario, puerto } = COMPUTADORES[pc];
    exec(`ssh -p ${puerto} ${usuario}@localhost "sudo shutdown -h now"`, (error, stdout, stderr) => {
        if (error) return res.status(500).json({ error: `Error al apagar: ${stderr}` });
        res.json({ mensaje: `Orden de apagado enviada a ${pc}` });
    });
};

const programarApagado = (req, res) => {
    const { pc, minutos } = req.body;
    if (!COMPUTADORES[pc]) return res.status(400).json({ error: "PC no válida" });
    if (!minutos || isNaN(minutos)) return res.status(400).json({ error: "Tiempo inválido" });

    const { usuario, puerto } = COMPUTADORES[pc];
    exec(`ssh -p ${puerto} ${usuario}@localhost "sudo shutdown -h +${minutos}"`, (error, stdout, stderr) => {
        if (error) return res.status(500).json({ error: `Error al programar apagado: ${stderr}` });
        res.json({ mensaje: `Apagado programado en ${minutos} minutos para ${pc}` });
    });
};

const estadoComputador = (req, res) => {
    const { pc } = req.query;
    if (!COMPUTADORES[pc]) return res.status(400).json({ error: "PC no válida" });

    const { usuario, puerto } = COMPUTADORES[pc];

    exec(`ssh -p ${puerto} ${usuario}@localhost "echo activo"`, (error, stdout, stderr) => {
        if (error) {
            res.json({ estado: "Apagado o Suspendido", ip: "localhost" });
        } else {
            res.json({ estado: "Encendido", ip: "localhost" });
        }
    });
};

module.exports = { apagarComputador, programarApagado, estadoComputador };
