# Neueste LTS-Version von Node
FROM node:22

# Arbeitsverzeichnis im Container
WORKDIR /app

# package.json & package-lock.json kopieren
# npx run prisma generate kann fehlschlagen, wenn das schema noch nicht drinnen ist deshalb hier und nicht dann bei copy ..
COPY package*.json prisma ./

# Dependencies installieren
RUN npm install

# Prisma Client generieren
RUN npx prisma generate

# Rest vom Projekt kopieren
COPY . .

# Port für Express
EXPOSE 3000

# Startbefehl
CMD ["npm", "run", "start"]