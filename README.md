# Schema-Driven Development

フロントエンド開発におけるスキーマ駆動開発の方法論を学ぶプロジェクト

## 概要

このプロジェクトでは、以下の技術スタックを使用してスキーマ駆動開発のワークフローを構築する：

- **TypeSpec**: OpenAPIスキーマの生成
- **Orval**: 型安全なAPIクライアントコードの自動生成  
- **MSW**: APIモック・テスト環境の構築

## プロジェクト構成

```
schema-driven-development/
├── schema/              # TypeSpecによるAPIスキーマ定義
│   ├── app/            # アプリケーション固有の定義
│   │   ├── main.tsp
│   │   └── routes/     # APIエンドポイント定義
│   ├── common/         # 共通モデル・レスポンス定義
│   │   └── models/     # データモデル定義
│   └── tsp-output/     # OpenAPI生成結果
├── frontend/           # Next.jsフロントエンドアプリ
│   └── src/schema/     # Orvalで生成されたAPIクライアント
├── docs/              # プロジェクト仕様書・要件定義
└── .claude/           # Claude Code設定・コマンド集
```

## 開発フロー

1. **スキーマ定義**: `schema/`でTypeSpecによるAPI仕様定義
2. **スキーマ生成**: `tsp compile`でOpenAPI生成
3. **クライアント生成**: `orval`でフロントエンド用のAPIクライアント自動生成
4. **モック開発**: MSWでモック環境を構築してフロントエンド先行開発

## セットアップ

### 基本コマンド

```bash
# 依存関係のインストール
pnpm i

# TypeSpecからOpenAPIを生成
tsp compile .

# OrvalでAPIクライアントコードを生成
pnpm run generate:api
```

### TypeSpecプロジェクト詳細構成

```
schema/
├── app/
│   ├── routes/
│   │   ├── main.tsp     # ルート定義のエントリーポイント
│   │   └── notices.tsp  # お知らせ関連のエンドポイント
│   └── main.tsp
├── common/
│   ├── models/
│   │   ├── main.tsp     # モデル定義のエントリーポイント
│   │   ├── errors.tsp   # エラーレスポンス定義
│   │   ├── notices.tsp  # お知らせモデル定義
│   │   └── responses.tsp # 共通レスポンス型定義
│   └── main.tsp
├── main.tsp            # プロジェクトのルートファイル
└── tsp-output/
    └── schema/
        └── openapi.yaml # 生成されたOpenAPIスキーマ
```

## 技術詳細

### TypeSpec
- **役割**: OpenAPIスキーマの型安全な定義
- **特徴**: 
  - TypeScriptライクな構文でAPIスキーマを記述
  - モデル、エンドポイント、レスポンスを構造化して管理
  - OpenAPI 3.0形式での出力に対応

### Orval
- **役割**: OpenAPIから型安全なAPIクライアントを自動生成
- **特徴**:
  - TanStack Query・SWRとの統合に適している
  - TypeScriptの型安全性を維持
  - カスタムAxiosインスタンス対応
- **メリット**: ヒューマンエラー防止、標準化、モック機能によるフロントエンド先行開発

### MSW (Mock Service Worker)  
- **役割**: ネットワークレベルでリクエストをモック
- **特徴**:
  - SSR・CSR両対応
  - ローカル開発・テスト・Storybookで利用可能  
  - 実際のHTTPリクエストをインターセプト
- **テスト戦略**: Integration Test中心のTesting Trophy採用

## テスト方針

- **Integration Test**: 複数コンポーネントを組み合わせたユースケースをテスト
- **Unit Test**: 独立したHooks・utilsのロジックをテスト
- MSWによるテストライフサイクル管理で堅牢なテスト環境を構築

## 参考記事

### Orval関連
- [HRBrain - OrvalでOpenAPIからTanStack Query用のコードを自動生成](https://zenn.dev/hrbrain/articles/3ca5d37dd0b80e)
- [teamLab - OrvalでOpenAPIからクライアントを自動生成](https://zenn.dev/teamlab_fe/articles/b895776223a3b2)
- [Rakus - OrvalとMSWを活用したフロントエンド開発](https://qiita.com/yassii_dev/items/619b5d7542e4b78d786a)
- [Orval公式ドキュメント](https://orval.dev/overview)
- [Orvalサンプル集](https://github.com/orval-labs/orval/tree/master/samples)
- [実践的なOrval活用例](https://github.com/yuichiyasui/orval-example)

### MSW関連  
- [フロントエンドのテストでMSWを使ってAPIをモック](https://zenn.dev/azukiazusa/articles/using-msw-to-mock-frontend-tests)
- [MSWを使ったIntegrationテストの書き方](https://zenn.dev/sirosuzume/articles/5caab9d47f2f2c)
- [テスト戦略とMSWの実践的活用](https://zenn.dev/overflow_offers/articles/20240209-testing-strategy)
- [MSWによるAPIモック導入のメリット](https://qiita.com/curious_george/items/28a35eade3030ccf1a11)
