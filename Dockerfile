FROM node:16-alpine

WORKDIR /Users/daviduarte/development/inteli/atividades-programacao
COPY . .

EXPOSE 8083

CMD ["npx", "http-server", "-p", "8083"]