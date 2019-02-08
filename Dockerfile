FROM keymetrics/pm2:latest-alpine

# Create app directory
RUN mkdir -p /usr/src/app

WORKDIR /usr/src/

COPY package.json /usr/src

RUN npm install --silent --production

ENV PATH /usr/src/node_modules/.bin:$PATH

COPY . /usr/src/app

WORKDIR /usr/src/app

EXPOSE 3000
# Show current folder structure in logs
RUN ls -al -R

CMD [ "pm2-runtime", "start", "ecosystem.config.js", "--env", "production" ]