FROM node:20.5-slim

# Create app directory
WORKDIR /app

COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 5000

# Start app
CMD [ "npm", "start" ]