FROM node:20

WORKDIR /app

# Étape 1 : Installer les dépendances
COPY package*.json ./
RUN npm install

# Étape 2 : Copier uniquement le schéma avant generate
COPY prisma ./prisma
RUN npx prisma generate

# Étape 3 : Copier le reste du code
COPY . .

# Étape 4 : Build et exécution
RUN npm run build

EXPOSE 5000
CMD ["node", "dist/server.js"]
