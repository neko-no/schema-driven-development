# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクトについて
このプロジェクトはフロントエンド開発におけるスキーマ駆動開発（Schema-Driven Development）の学習と実装を目的としています。

## 開発方針
- スキーマファーストアプローチを採用し、API仕様から型定義とコードを生成する
- TypeScriptを使用した型安全な開発
- OpenAPIやGraphQLスキーマからの自動コード生成を活用

## 想定される技術スタック
スキーマ駆動開発に適した以下の技術の使用を想定：
- TypeScript
- OpenAPI Generator または GraphQL Code Generator
- JSON Schema
- Zod（スキーマバリデーション）
- React/Next.js（フロントエンド）

## 開発時の注意点
- スキーマ定義を変更した場合は、必ず型定義の再生成を行う
- 手動でのAPI型定義の編集は避け、スキーマから生成された型を使用する
- バリデーションロジックもスキーマから自動生成する仕組みを構築する
