# Dockerfile para Nest.js
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Generar el cliente de Prisma
RUN npx prisma generate

EXPOSE 3005

# Comando de inicio del contenedor
CMD ["sh", "-c", "npx prisma migrate dev --name init7 && npm run start:dev"]