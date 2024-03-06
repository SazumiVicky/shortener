FROM node:latest
WORKDIR /sazumi-cloud
RUN apt-get update && apt-get upgrade -y
COPY package*.json ./
RUN npm install
RUN npm install -g pm2
COPY . .
EXPOSE 8080
CMD ["pm2-runtime", "start", "server.js"]