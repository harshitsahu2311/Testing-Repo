// Dockerfile
FROM node:20-alpine

WORKDIR /app

COPY . /app

ENV NODE_ENV=development

RUN npm install --legacy-peer-deps

EXPOSE 8080

CMD ["npm", "run", "dev"]
