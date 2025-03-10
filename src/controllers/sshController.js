const { exec } = require("child_process");

const COMPUTADORES = {
    pc1: { usuario: "arthur", puerto: 2222 },
    pc2: { usuario: "root", puerto: 2223 },
    pc3: { usuario: "root", puerto: 2224 },
    pc4: { usuario: "root", puerto: 2225 }
};

const apagarComputador = (req, res) => {
    const { pc } = req.body;
    if (!COMPUTADORES[pc]) return res.status(400).json({ error: "PC no válida" });

    const { usuario, puerto } = COMPUTADORES[pc];
    exec(`ssh -p ${puerto} ${usuario}@localhost "shutdown -h now"`, (error, stdout, stderr) => {
        if (error) return res.status(500).json({ error: `Error al apagar ${pc}: ${stderr}` });
        res.json({ mensaje: `Orden de apagado enviada a ${pc}` });
    });
};

const programarApagado = (req, res) => {
    const { pc, minutos } = req.body;
    if (!COMPUTADORES[pc]) return res.status(400).json({ error: "PC no válida" });
    if (!minutos || isNaN(minutos)) return res.status(400).json({ error: "Tiempo inválido" });

    const { usuario, puerto } = COMPUTADORES[pc];
    exec(`ssh -p ${puerto} ${usuario}@localhost "shutdown -h +${minutos}"`, (error, stdout, stderr) => {
        if (error) return res.status(500).json({ error: `Error al programar apagado en ${pc}: ${stderr}` });
        res.json({ mensaje: `Apagado programado en ${minutos} minutos para ${pc}` });
    });
};

const estadoComputador = (req, res) => {
    const { pc } = req.query;
    if (!COMPUTADORES[pc]) return res.status(400).json({ error: "PC no válida" });

    const { usuario, puerto } = COMPUTADORES[pc];

    exec(`ssh -p ${puerto} ${usuario}@localhost "echo activo"`, (error, stdout, stderr) => {
        if (error) {
            res.json({ estado: "Apagado o Suspendido", pc });
        } else {
            res.json({ estado: "Encendido", pc });
        }
    });
};

module.exports = { apagarComputador, programarApagado, estadoComputador };
