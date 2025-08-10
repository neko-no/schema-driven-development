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
