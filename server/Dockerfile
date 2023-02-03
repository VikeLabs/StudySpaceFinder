# docker hub: https://hub.docker.com/r/hn275/spf
FROM python:3.10.9-alpine3.17
WORKDIR /app
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app", "--reload", "--host", "0.0.0.0"]
