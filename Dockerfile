
FROM node:18.17.1-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

# Run the app
CMD ["npm", "run", "dev"]
