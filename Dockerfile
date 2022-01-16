FROM node:14.18.3-alpine

WORKDIR /alpha
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm ci --production
COPY . .
RUN npm i -g pm2

EXPOSE 80

CMD ["npm", "start"]