## 概要

- カップル用の todo(行きたいところ)リスト
- (スケジュール)
- (チャット)

## アーキテクチャ/言語

- (なるべく)クリーンアーキテクチャ
- モジュラモノリス
- github(public)
- docker
- Prisma/PostgreSQL
- BE: Typescript/NestJs
- FE: Next.js
- API: GraphQL

## 要件

- 1 つのリストを 2 人(1 組)が crud できる
- 自分の持っているリストしか閲覧できない
- 1 組につき複数リストの作成が可能

## 環境構築

- backend 配下で`docker compose up`を実行
  - 参考サイトは[こちら](https://zenn.dev/satton/articles/162735f93d5e6f)
- `curl localhost:3000`で'Hello World!'が返ってきたら OK (暫定)

## ER 図(暫定)

- ![](backend/db.drawio.svg)
