const otpStorage = {}; 

function generarCodigoOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

function guardarOTP(usuario, codigo) {
    otpStorage[usuario] = codigo;
}

function verificarOTP(usuario, codigo) {
    if (otpStorage[usuario] && otpStorage[usuario] === codigo) {
        delete otpStorage[usuario]; 
        return true;
    }
    return false;
}

module.exports = { generarCodigoOTP, guardarOTP, verificarOTP };
