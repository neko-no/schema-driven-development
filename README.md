# schema-driven-development
フロントエンド開発にて，スキーマ駆動開発を行う方法論を学ぶ

## TypeSpec

```
// インストール
pnpm i

// typespecからopenapiを生成
tsp compile .
```

フォルダー構成
```
.
└── Schema/
    ├── app/
    │   ├── routes/
    │   │   ├── main.tsp
    │   │   └── notices.tsp
    │   └── main.tsp
    ├── common/
    │   ├── main.tsp
    │   └── models/
    │       ├── main.tsp
    │       ├── errors.tsp
    │       ├── notices.tsp
    │       └── responses.tsp
    └── main.tsp
```

> [!WARNING]
> 今後は別の方法論で管理する可能性がある． 管理が細かすぎる可能性がある．NameSpaceの運用なども考えないといけない


## Orval

```
pnpm i

pnpm run generate:api
```

[HRBrain](https://zenn.dev/hrbrain/articles/3ca5d37dd0b80e)
REST設計で，TanStack QueryやSWRのようなライブラリを採用している場合には，高い価値を発揮すると思われる．

Orvalで提供する3つの特徴
1. 標準的な形式を適用できるのでヒューマンエラーを防げる
2. OpenAPIとOrvalによって，UIに集中することができる
3. バックエンドの実装を待つことなく，mockによってAPIとの接続を確認できる

こちらの記事はTanStack Queryを使い際に再度参照しても良いものになっている．

Orvalで生成されるTanStack Queryのコードの評価
筆者の観点からは，生成されるコードの設計思想にかなり良い印象を持っているとのこと．誰が実装しても似たような結果になるコードを自動生成できる．

[teamLab](https://zenn.dev/teamlab_fe/articles/b895776223a3b2)
Orvalとは？
- OpenAPIから型安全なAPIクライアントコードを自動で生成してくれるツール
- 他のツールもあるが，カスタマイズが豊富なため，ほとんどのケースで問題なく使えるのではないか

Orvalの導入
1. OpenAPIスキーマファイルの用意:
2. Orvalのインストール:
3. 設定ファイルの作成と基本設定: 入力となるスキーマファイルの場所と出力先を設定
4. コード生成スクリプトの実行:


Orvalの設定ファイルの意味について
- TanStack Query: クライアントコンポーネント
- Fetch: Data Cacheを最大限扱うために利用
- ファイル変換: tags-split ファイルサイズが大きくなる場合は，こちらを利用することを推奨

MSWの導入
1. MSWをインストール
2. Service Workerスクリプトの初期化
3. MSW起動に必要なファイルを作成: ブラウザ・Node環境で実行するために必要なファイルを生成
4. MSW Provider コンポーネントの作成: クライアントコンポーネントからはブラウザのものを叩きに行って，サーバーコンポーネントからはNode環境のものを叩きに行く．
5. MSWの起動

Orvalからの生成物に関しては，handler(controllerのようなもの)で紐付けを行う．

[rakus](https://qiita.com/yassii_dev/items/619b5d7542e4b78d786a)

Orvalとは何なのか？
- OpenAPIで記載されたWebAPIの仕様から，フロントエンド側でWebAPIを利用するために必要なTypeScriptで書かれたコードを生成してくれるツール
- メリット
	- APIを利用するコードを書く際の人為的なミスを防げる
	- チーム内に標準が確立される
	- モックを生成することでバックエンドの開発を待たなくても良い

Orvalの基本的な使い方に関して
- https://orval.dev/overview
- https://github.com/orval-labs/orval/tree/master/samples

活用事例
- 使用ライブラリ: tanstack, storybook, msw,msw-storybook-addon, vitest, biome
- 実際の例に関してはリポジトリで公開しているとのこと．https://github.com/yuichiyasui/orval-example
