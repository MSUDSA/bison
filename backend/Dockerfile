FROM ubuntu:24.04

RUN apt-get update && \
    apt-get install -y python3 python3-pip python3-venv git make libmagic-dev && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt .

RUN apt-get install python3.12-venv && \
    python3.12 -m venv venv && \
    ./venv/bin/pip install -r requirements.txt

RUN cd /tmp \
    git clone --branch v0.8.0 https://github.com/pgvector/pgvector.git \
    cd pgvector \
    make \
    make install

COPY . .

EXPOSE 8000

CMD ["./venv/bin/uvicorn", "main:app", "--host 0.0.0.0", "--port", "8000"]
