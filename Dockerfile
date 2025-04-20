
FROM node:20-alpine

WORKDIR /app

COPY . /app

ENV NODE_ENV=development

RUN npm install --legacy-peer-deps

//Testing Jenkins
EXPOSE 8080

CMD ["npm", "run", "dev"]
