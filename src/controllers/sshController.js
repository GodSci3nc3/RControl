const { exec } = require("child_process");

const COMPUTADORES = {
    pc1: { ip: "192.168.0.20", usuario: "arthur" }
};

const apagarComputador = (req, res) => {
    const { pc } = req.body;
    if (!COMPUTADORES[pc]) return res.status(400).json({ error: "PC no válida" });

    const { ip, usuario } = COMPUTADORES[pc];
    exec(`ssh ${usuario}@${ip} "sudo shutdown -h now"`, (error, stdout, stderr) => {
        if (error) return res.status(500).json({ error: `Error al apagar: ${stderr}` });
        res.json({ mensaje: `Orden de apagado enviada a ${pc}` });
    });
};

const programarApagado = (req, res) => {
    const { pc, minutos } = req.body;
    if (!COMPUTADORES[pc]) return res.status(400).json({ error: "PC no válida" });
    if (!minutos || isNaN(minutos)) return res.status(400).json({ error: "Tiempo inválido" });

    const { ip, usuario } = COMPUTADORES[pc];
    exec(`ssh ${usuario}@${ip} "sudo shutdown -h +${minutos}"`, (error, stdout, stderr) => {
        if (error) return res.status(500).json({ error: `Error al programar apagado: ${stderr}` });
        res.json({ mensaje: `Apagado programado en ${minutos} minutos para ${pc}` });
    });
};

const estadoComputador = (req, res) => {
    const { pc } = req.query;
    if (!COMPUTADORES[pc]) return res.status(400).json({ error: "PC no válida" });

    const { ip, usuario } = COMPUTADORES[pc];

    exec(`ping -c 1 ${ip}`, (error, stdout, stderr) => {
        if (error) {
            res.json({ estado: "Apagado", ip });
        } else {
            exec(`ssh -o ConnectTimeout=3 ${usuario}@${ip} "echo activo"`, (sshError, sshStdout, sshStderr) => {
                if (sshError) {
                    res.json({ estado: "Suspendido", ip });
                } else {
                    res.json({ estado: "Encendido", ip });
                }
            });
        }
    });
};


module.exports = { apagarComputador, programarApagado, estadoComputador };
