FROM node:14-alpine


WORKDIR /app

COPY . .
RUN npm install
RUN npm run build

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait

RUN chmod +x /wait

EXPOSE 3005

CMD /wait && sh run.sh
