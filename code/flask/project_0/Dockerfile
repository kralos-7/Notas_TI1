FROM python:3.11.7-alpine3.18

WORKDIR /app

COPY . /app
RUN pip install -r requirements.txt
RUN apk add --update nodejs npm
RUN npm install -D tailwindcss
RUN npx tailwindcss init

EXPOSE 3000

CMD python ./run.py