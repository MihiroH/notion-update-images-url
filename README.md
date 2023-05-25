# notion-update-images-url
[Notion](https://www.notion.so/)の画像URLの更新プログラム

## 技術スタック
- [Node.js](https://nodejs.org/) - 16.6.2
- [jest](https://jestjs.io/docs/getting-started) - ^29.5.0

## セットアップ
### Nodeモジュールをインストール
```
$ npm install
```

### NotionAPIの設定
以下の`Step 3: Save the database ID`まで進めてください。  
https://developers.notion.com/docs/create-a-notion-integration

### 環境変数を設定
```
$ cp .env.example .env
```

## 環境変数
| 名称 | 説明 | 例 | 備考 |
| -- | -- | -- | -- |
| NOTION_TOKEN | NotionAPIのトークン | secret_*** | [参考リンク](https://developers.notion.com/docs/authorization) |
| NOTION_DATABASE_ID | NotionのデータベースID (32桁) |  | [参考リンク](https://developers.notion.com/docs/create-a-notion-integration#step-3-save-the-database-id) |
| BEFORE_IMAGE_BASE_URL | 置換対象の画像のベースURL | https://example.com/uploads/ |  |
| AFTER_IMAGE_BASE_URL | 置換後の画像のベースURL | https://uploads.example.com/ |  |
| OUTPUT_CSV_FILE_DIR | 置換した画像情報が記載されるCSVのディレクトリー名 | ./out | ./out以外の場合、.gitignoreに追加してください |

## コマンド
### 実行
```
$ npm run execute
```
#### オプション
オプションを使用する場合は`npm run execute -- `の後につけてください。

```
$ npm run execute -- --token=*** --databaseId=***
```

| 項目 | alias | 説明 |
| -- | -- | -- |
| --NOTION_TOKEN | --token | NotionAPIのトークン<br />.envのものを上書きします |
| --NOTION_DATABASE_ID | --databaseId | NotionのデータベースID<br />.envのものを上書きします |
| --OUTPUT_CSV_FILE_DIR | --outputCsvFileDir | 置換した画像情報が記載されるCSVのディレクトリー名<br />.envのものを上書きします |

### テスト
```
$ npm run test
```
