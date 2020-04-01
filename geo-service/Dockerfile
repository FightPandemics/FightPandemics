FROM python:3.8-slim

WORKDIR /app

COPY . .

RUN pip install -r requirements.txt

EXPOSE 5000

VOLUME . .

CMD ["python", "app.py"]