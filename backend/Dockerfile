# pythonのTags名を指定。
FROM python:3.11.8-alpine

# poetryのPATHを$PATHに追加
ENV PATH /root/.local/bin:$PATH
ENV LANG C.UTF-8
ENV TZ Asia/Tokyo

# 処理を実行するフォルダ名を指定。
WORKDIR /backend
# pip install
COPY ./pyproject.toml ./poetry.lock* ./

RUN apk update \
    && apk add curl postgresql-dev gcc musl-dev \
    && curl -sSL https://install.python-poetry.org | python3 - \
    && poetry config virtualenvs.create false \
    && poetry install


