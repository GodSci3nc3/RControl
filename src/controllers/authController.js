const CONTRASEÑA_CORRECTA = "1234";

const login = (req, res) => {
    const { password } = req.body;

    if (password === CONTRASEÑA_CORRECTA) {
        req.session.autenticado = true;  
        res.json({ mensaje: "Acceso concedido" });
    } else {
        res.status(401).json({ error: "Contraseña incorrecta" });
    }
};

/* 
const verificarOTPController = (req, res) => {
    res.status(403).json({ error: "OTP desactivado temporalmente" });
};
*/

module.exports = { login };
