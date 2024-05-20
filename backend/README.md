## 環境構築

- backend 配下で`docker compose up`を実行
  - docker環境構築の参考サイトは[こちら](https://zenn.dev/satton/articles/162735f93d5e6f)

## DB設定

- 環境変数`DATABASE_URL`について
  - [公式サイト](https://docs.nestjs.com/recipes/prisma#set-up-prisma)参照。docker-compose.ymlを参照して設定してください。

## migrationについて

- ※ BEコンテナ内にて実行してください。
- `npx prisma migrate reset`
  - DB内のデータを削除してseederを再実行します。
  - TBLがない時にはmigrationファイルを元にTBLを作成します。
- `npx prisma migrate dev --name init`
  - `init`部分はmigrationファイルを保持するディレクトリ名の末尾になります。
- `npx prisma db seed`
  - seederを実行します。
