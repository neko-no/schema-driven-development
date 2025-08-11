# Schema-Driven Development

フロントエンド開発におけるスキーマ駆動開発の方法論を学ぶプロジェクト

## 概要

このプロジェクトでは、以下の技術スタックを使用してスキーマ駆動開発のワークフローを構築する：

- **TypeSpec**: OpenAPIスキーマの生成
- **Orval**: 型安全なAPIクライアントコードの自動生成  
- **MSW**: APIモック・テスト環境の構築

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

### TypeSpecプロジェクト構成

```
Schema/
├── app/
│   ├── routes/         # APIエンドポイント定義
│   └── main.tsp
├── common/
│   ├── models/         # 共通データモデル
│   └── main.tsp
└── main.tsp
```

## 技術詳細

### Orval
- OpenAPIから型安全なAPIクライアントを自動生成
- TanStack Query・SWRとの統合に適している
- **メリット**: ヒューマンエラー防止、標準化、モック機能によるフロントエンド先行開発

### MSW (Mock Service Worker)  
- ネットワークレベルでリクエストをモック
- SSR・CSR両対応、ローカル開発・テスト・Storybookで利用可能
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
