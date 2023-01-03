FROM node

WORKDIR /appNodeApi

COPY ./package.json .

RUN npm install

ENV DB_HOST=mongodb+srv://Ruslan:nsO7ZFXj1yPKA9PF@cluster0.pyp6sf4.mongodb.net/db-contacts?retryWrites=true&w=majority

ENV SECRET_KEY=mysecret

ENV SENDGRID_API_KEY=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

COPY . .

EXPOSE 3000

CMD npm run start:dev