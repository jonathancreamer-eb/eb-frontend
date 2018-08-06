FROM node:10-slim

RUN mkdir -p /code
WORKDIR /code

ADD package.json .

RUN npm i

ADD . /code

EXPOSE 3000
CMD ["npm", "start"]