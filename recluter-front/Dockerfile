# Dockerfile para React
FROM node:18-alpine

# Crear y establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de dependencias
COPY package*.json ./

# Instalar las dependencias
RUN npm install --force

# Copiar el código fuente
COPY . .

# Construir la aplicación para producción
RUN npm run build

# Instalar un servidor estático para servir el frontend
RUN npm install -g serve

# Exponer el puerto donde se servirá la aplicación
EXPOSE 3000

# Comando para iniciar el servidor
CMD ["serve", "-s", "build"]
