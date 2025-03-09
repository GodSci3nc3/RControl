const transporter = require("../config/email");
const { generarCodigoOTP, guardarOTP, verificarOTP } = require("../services/otpService");

const CONTRASEÑA_CORRECTA = "1234";

const login = (req, res) => {
    const { password } = req.body;
    if (password === CONTRASEÑA_CORRECTA) {
        const codigo = generarCodigoOTP();
        guardarOTP("usuario", codigo);

        transporter.sendMail({
            from: '"Seguridad Web" <rosalesvelazquezarturo@gmail.com>',
            to: "2430152@upv.edu.mx",
            subject: "Código de Verificación",
            text: `Tu código de verificación es: ${codigo}`
        });

        res.json({ mensaje: "Código OTP enviado al correo" });
    } else {
        res.status(401).json({ error: "Contraseña incorrecta" });
    }
};

const verificarOTPController = (req, res) => {
    const { otp } = req.body;
    if (verificarOTP("usuario", otp)) {
        req.session.autenticado = true;
        res.json({ mensaje: "Acceso concedido" });
    } else {
        res.status(401).json({ error: "Código incorrecto" });
    }
};

module.exports = { login, verificarOTPController };
