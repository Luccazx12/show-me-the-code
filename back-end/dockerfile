FROM node:16.13.2

RUN mkdir -p /home/app/back-end/node_modules && chown -R node:node /home/app/back-end

WORKDIR /home/app/back-end

COPY package*.json ./

RUN npm install

COPY . .

COPY --chown=node:node . .

USER node

EXPOSE 8080

CMD ["npm", "start"]