
# 🔌 RControl

## 🌟 Controla y programa el apagado de múltiples computadoras desde una interfaz web segura.

RControl es una aplicación que permite apagar y programar el apagado de varios computadores Linux y Windows de manera remota, utilizando un servidor central en la nube. Todo esto se gestiona a través de una web intuitiva y protegida con autenticación, evitando accesos no autorizados.  


## 🚀 **Características**
✅ **Interfaz web intuitiva** para administrar los equipos.  
✅ **Control remoto** de apagado inmediato o programado.  
✅ **Soporte para Linux y Windows** (SSH habilitado en ambos).  
✅ **Autenticación de usuarios** para mayor seguridad.  
✅ **Servidor seguro alojado en DigitalOcean** con firewall configurado.  
✅ **API en Node.js con Express** para manejar las peticiones.  


## 🛠️ **Tecnologías utilizadas**
- **Backend:** Node.js (Express.js)
- **Frontend:** HTML, CSS, JavaScript (puede ser React o Vanilla JS)
- **Servidor:** Ubuntu en DigitalOcean con Apache y PM2 para administración de procesos
- **Comunicación remota:** SSH con claves públicas
- **Seguridad:** Autenticación de usuarios con JSON Web Tokens (JWT)
- **Opcional:** Base de datos (MongoDB o SQLite) para almacenar historial de apagados


## 📌 **Instrucciones de Instalación y Uso**

### **Clonar el repositorio**
```bash
git clone https://github.com/tu_usuario/remote-shutdown-web.git
cd remote-shutdown-web
```

### **Configurar el servidor en el Droplet**
1. Instalar Node.js y Apache:
   ```bash
   sudo apt update && sudo apt install nodejs npm apache2 -y
   ```
2. Instalar PM2 para ejecutar el backend en segundo plano:
   ```bash
   npm install -g pm2
   ```

### **Configurar SSH en los computadores remotos**
1. **En los PCs Linux**, habilitar SSH e intercambiar claves públicas:
   ```bash
   sudo apt install openssh-server -y
   ssh-copy-id usuario@192.168.1.X
   ```

2. **En los PCs Windows**, habilitar OpenSSH y agregar la clave pública manualmente.



### **Acceder a la web**
- Abre el navegador y entra a:  
  ```
  http://69.55.60.119
  ```
- Inicia sesión y accede al panel de control.

