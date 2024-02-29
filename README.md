# 2chライクな掲示板アプリ
## 概要
2chを参考にしたスレッドフロート型の掲示板アプリです。
機能はスレッドとポストの作成ができるシンプルなものです。

現在はローカルのdocker上で動作するように作っています。

## 技術スタック
‐ React + Typescript
‐ FastAPI(Python)
  ‐ SQLAlchemy(ORM)+pydantic
‐ PostgreSQL
‐ Docker, docker-compose

## 利用方法
まず初めにローカルにプロジェクトをcloneする。

次にターミナルに以下を入力してイメージをビルド
```
$ docker-compose build
```


次に以下を入力してコンテナ立ち上げ
```
$ docker-compose up -d
````

ブラウザで以下のURLを利用しアプリにアクセス
```
http://localhost:5173/
```

またFastAPIのドキュメントには以下のURLでアクセス可能
```
http://localhost:8000/docs
```
