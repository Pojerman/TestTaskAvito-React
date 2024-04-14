FROM node:18-alpine
WORKDIR /work/
COPY package.json /work/
RUN npm install
COPY . .
EXPOSE 7070
CMD [ "npm", "start" ]

