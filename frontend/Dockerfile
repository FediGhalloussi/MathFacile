FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN test -f src/wasm/math.wasm.js
RUN test -f src/wasm/math.wasm.wasm

RUN npm run build

EXPOSE 4173

CMD ["npm", "run", "preview"]
