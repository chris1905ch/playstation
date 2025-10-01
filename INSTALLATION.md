# 🚀 Instrucciones de Instalación - LudereNet App

## ⚠️ Prerrequisito Requerido: Node.js

Para ejecutar esta aplicación, necesitas tener **Node.js** instalado en tu sistema.

### 📥 Instalación de Node.js

1. **Visita el sitio oficial de Node.js:**
   - Ve a: https://nodejs.org
   - Descarga la versión **LTS** (recomendada para la mayoría de usuarios)

2. **Instala Node.js:**
   - Ejecuta el instalador descargado
   - Sigue las instrucciones del asistente de instalación
   - Asegúrate de marcar la opción "Add to PATH" durante la instalación

3. **Verifica la instalación:**
   - Abre una nueva terminal/PowerShell
   - Ejecuta: `node --version`
   - Ejecuta: `npm --version`
   - Deberías ver los números de versión si se instaló correctamente

### 🏃‍♂️ Pasos para Ejecutar la Aplicación

Una vez que Node.js esté instalado:

1. **Instala las dependencias:**
   ```bash
   npm install
   ```

2. **Inicia el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

3. **Abre tu navegador:**
   - Ve a: `http://localhost:5173`
   - ¡Disfruta de tu aplicación LudereNet!

### 🎯 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la construcción de producción
- `npm run lint` - Ejecuta el linter para revisar el código

### 🔧 Solución de Problemas

**Si ves errores relacionados con 'npm' no reconocido:**
- Reinicia tu terminal/PowerShell después de instalar Node.js
- Verifica que Node.js se añadió correctamente al PATH del sistema
- En Windows, podrías necesitar reiniciar tu computadora

**Si tienes problemas con permisos:**
- En Windows, ejecuta PowerShell como administrador
- En Mac/Linux, podrías necesitar usar `sudo` para algunos comandos

### 📞 Soporte

Si sigues teniendo problemas:
1. Asegúrate de usar una versión reciente de Node.js (16 o superior)
2. Verifica que no haya firewalls bloqueando el puerto 5173
3. Intenta limpiar la caché de npm: `npm cache clean --force`

---

¡Una vez que Node.js esté instalado, podrás disfrutar de todas las características de la aplicación LudereNet! 🎮
