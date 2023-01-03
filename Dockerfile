FROM node

WORKDIR /appNodeApi

COPY ./package.json .

RUN npm install

ENV 

ENV SECRET_KEY=mysecret

ENV 

COPY . .

EXPOSE 3000

CMD npm run start:dev
