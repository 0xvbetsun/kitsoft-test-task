FROM node:latest

# Create app directory
RUN mkdir -p /usr/src/app

WORKDIR /usr/src/

COPY package.json /usr/src

RUN npm install --silent --production

ENV PATH /usr/src/node_modules/.bin:$PATH

COPY . /usr/src/app

WORKDIR /usr/src/app

EXPOSE 6000
CMD ["npm", "start"]
