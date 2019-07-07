FROM ubuntu:latest

WORKDIR /app

COPY package*.json ./

# Install npm, netcat and vim
RUN apt-get update && apt-get install npm netcat vim -y
RUN npm install
RUN groupadd -r node && useradd --no-log-init -r -g node node

RUN chown root:root /usr/bin/vim
RUN chmod a+rx,u+s /usr/bin/vim 

COPY . .

RUN chown -R node /app

USER node

EXPOSE 0-9999

CMD [ "npm", "start" ]