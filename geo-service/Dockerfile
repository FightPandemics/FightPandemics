FROM python:3.7-slim

ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

RUN addgroup --system app && adduser --system --ingroup app app

COPY --chown=app:app . /app

CMD ["gunicorn", "--workers=2", "--threads=4", "--worker-class=gthread", "--worker-tmp-dir=/dev/shm", "--bind=0.0.0.0:5000", "app:app"]
