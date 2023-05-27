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
| NOTION_TOKEN | NotionAPIのトークン | secret_****** | [参考リンク](https://developers.notion.com/docs/authorization) |
| NOTION_DATABASE_ID | NotionのデータベースID (32桁) |  | [参考リンク](https://developers.notion.com/docs/create-a-notion-integration#step-3-save-the-database-id) |
| NOTION_PAGE_ID | NotionのページID (32桁) |  | [参考リンク](https://developers.notion.com/docs/working-with-page-content#:~:text=Open%20the%20page%20in%20Notion,ends%20in%20a%20page%20ID.) |
| IMAGE_URL_BEFORE_UPDATE | 置換前の画像URL | https://example.com/uploads/ <br /> https://example.com/uploads/a.png |  |
| IMAGE_URL_AFTER_UPDATE | 置換後の画像URL | https://uploads.example.com/ <br /> https://uploads.example.com/a.png |  |
| OUTPUT_CSV_FILE_DIR | 置換した画像情報が記載されるCSVのディレクトリー名 | ./out | ./out以外の場合、.gitignoreに追加してください |

## コマンド
### 実行
```
$ npm run execute
```
#### オプション
オプションを使用する場合は`npm run execute -- `の後につけてください。  
各オプションは.envより優先されます。

```
$ npm run execute -- --token=*** --databaseId=***
```

| 項目 | alias | 説明 |
| -- | -- | -- |
| --NOTION_TOKEN | --token | NotionAPIのトークン |
| --NOTION_DATABASE_ID | --databaseId | NotionのデータベースID |
| --NOTION_PAGE_ID | --pageId | NotionのページID<br />設定されている場合、NOTION_DATABASE_IDを無視してページの更新のみ行います |
| --IMAGE_URL_BEFORE_UPDATE | --imageURLBeforeUpdate | 置換前の画像URL |
| --IMAGE_URL_AFTER_UPDATE | --imageURLAfterUpdate | 置換後の画像URL |
| --OUTPUT_CSV_FILE_DIR | --outputCsvFileDir | 置換した画像情報が記載されるCSVのディレクトリー名 |

### テスト
```
$ npm run test
```
