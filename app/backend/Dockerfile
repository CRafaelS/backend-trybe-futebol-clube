FROM node:16.15-alpine
WORKDIR /app-backend
COPY package*.json .
RUN npm install
COPY . .
CMD ["npm", "start"] 