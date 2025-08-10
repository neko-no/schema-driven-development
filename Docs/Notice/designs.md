# お知らせ管理アプリケーション設計書

## 概要

お知らせの管理機能を提供するWebアプリケーションの設計。TypeSpec、Orval、TanstackQuery、Vitest、Next.js、Zod、PandaCSS、Jotaiなどのモダンな技術スタックを使用し、スキーマ駆動開発によるCRUD操作を実装する。

## アーキテクチャ

### 全体構成

```text
src/
├── components/
│   ├── notice/               # 新規: お知らせ関連コンポーネント
│   │   ├── NoticeList.tsx    # 一覧表示コンポーネント
│   │   ├── NoticeDetail.tsx  # 詳細表示コンポーネント
│   │   └── NoticeCard.tsx    # リストアイテムコンポーネント
│   ├── forms/                # 新規: フォーム関連コンポーネント
│   │   ├── NoticeForm.tsx    # 作成・編集フォーム
│   │   ├── FormField.tsx     # フィールドコンポーネント
│   │   └── FormButtons.tsx   # フォームボタン群
│   ├── ui/                   # 新規: 共通UIコンポーネント
│   │   ├── Button.tsx        # ボタンコンポーネント
│   │   ├── Modal.tsx         # モーダルコンポーネント
│   │   └── LoadingSpinner.tsx # ローディングコンポーネント
│   └── layout/               # 新規: レイアウトコンポーネント
│       └── AppLayout.tsx     # アプリケーション全体レイアウト
├── hooks/                    # 新規: カスタムフック
│   ├── useNotice.ts         # お知らせ取得・操作フック
│   ├── useNoticeForm.ts     # フォーム管理フック
│   └── useConfirmDialog.ts  # 確認ダイアログフック
├── lib/
│   ├── api/                 # 新規: API関連
│   │   └── notices.ts       # お知らせAPI定義
│   ├── schemas/             # 新規: スキーマ定義
│   │   └── notice.ts        # Zodスキーマ
│   └── stores/              # 新規: 状態管理
│       └── notice.ts        # Jotai atoms
├── styled-system/           # PandaCSS生成ファイル
│   ├── css/                 # CSS関数
│   ├── patterns/            # パターン関数
│   └── tokens/              # トークン定義
└── panda.config.ts          # PandaCSS設定ファイル
```

## コンポーネント設計

### 1. noticeコンポーネント

#### NoticeList.tsx

```typescript
interface NoticeListProps {
  notices: Notice[];
  onSelectNotice: (id: string) => void;
  isLoading?: boolean;
}

interface Notice {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
```

**機能:**

- 全お知らせの一覧表示
- 各お知らせの基本情報（タイトル、作成日）表示
- クリックによる詳細画面への遷移
- ローディング状態の表示

#### NoticeDetail.tsx

```typescript
interface NoticeDetailProps {
  notice: Notice | null;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onBack: () => void;
}
```

**機能:**

- お知らせの詳細情報表示
- 編集・削除ボタンの表示
- 一覧への戻る機能
- 存在しないお知らせの処理

#### NoticeCard.tsx

```typescript
interface NoticeCardProps {
  notice: Notice;
  onClick: (id: string) => void;
  variant?: 'default' | 'compact';
}
```

**機能:**

- お知らせ情報のカード表示
- クリック処理
- 表示形式の選択
- 日付のフォーマット

### 2. formsコンポーネント

#### NoticeForm.tsx

```typescript
interface NoticeFormProps {
  initialData?: Partial<Notice>;
  onSubmit: (data: NoticeFormData) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
}

interface NoticeFormData {
  title: string;
  content: string;
}
```

**機能:**

- お知らせの作成・編集フォーム
- バリデーション機能
- 送信状態の管理
- キャンセル処理

#### FormField.tsx

```typescript
interface FormFieldProps {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}
```

**機能:**

- フィールドラベル表示
- エラーメッセージ表示
- 必須項目の明示
- 再利用可能なフィールドラッパー

### 3. uiシステム

#### useNotice.ts

```typescript
interface UseNoticeProps {
  enabled?: boolean;
}

interface UseNoticeReturn {
  notices: Notice[];
  notice: Notice | null;
  isLoading: boolean;
  error: Error | null;
  fetchNotices: () => void;
  fetchNotice: (id: string) => void;
  createNotice: (data: NoticeFormData) => Promise<void>;
  updateNotice: (id: string, data: NoticeFormData) => Promise<void>;
  deleteNotice: (id: string) => Promise<void>;
}
```

#### Button.tsx

```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}
```

**機能:**

- 複数のボタンスタイル
- サイズバリエーション
- 無効化・ローディング状態
- アクセシビリティ対応

### 4. layoutシステム

#### useConfirmDialog.ts

```typescript
interface ConfirmOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

interface UseConfirmDialogReturn {
  isOpen: boolean;
  confirm: (options: ConfirmOptions) => Promise<boolean>;
  close: () => void;
}
```

#### Modal.tsx

```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
}
```

**機能:**

- オーバーレイモーダル
- サイズ調整可能
- ESCキーでの閉じる機能
- フォーカストラップ

## データ管理とパフォーマンス

### 1. API統合実装

#### useNoticeForm.ts

```typescript
interface UseNoticeFormProps {
  initialData?: Partial<Notice>;
  onSuccess?: () => void;
}

interface UseNoticeFormReturn {
  values: NoticeFormData;
  errors: Record<string, string>;
  isSubmitting: boolean;
  handleChange: (name: string, value: string) => void;
  handleSubmit: (onSubmit: (data: NoticeFormData) => Promise<void>) => Promise<void>;
  reset: () => void;
}
```

### 2. 状態管理の最適化

#### Notice状態管理

```typescript
interface NoticeState {
  data: {
    notices: Notice[];
    selectedNotice: Notice | null;
    isLoading: boolean;
  };
  ui: {
    currentView: 'list' | 'detail' | 'create' | 'edit';
    selectedId: string | null;
  };
  form: {
    isSubmitting: boolean;
    errors: Record<string, string>;
  };
}
```

### 3. キャッシュ戦略

- **お知らせ一覧**: TanStack Queryでの5分間キャッシュ
- **お知らせ詳細**: localStorage での一時保存
- **フォーム入力値**: sessionStorage での保持
- **API レスポンス**: 楽観的更新とバックグラウンド再検証

## スタイリングとテーマ（PandaCSS）

### 1. PandaCSS設定ファイル

```typescript
// panda.config.ts
import { defineConfig } from '@pandacss/dev'

export default defineConfig({
  preflight: true,
  include: ['./src/**/*.{js,jsx,ts,tsx}'],
  exclude: [],
  
  theme: {
    extend: {
      tokens: {
        colors: {
          notice: {
            primary: { value: '#3b82f6' },
            secondary: { value: '#6b7280' },
            background: { value: '#ffffff' },
            surface: { value: '#f8fafc' }
          },
          status: {
            success: { value: '#10b981' },
            warning: { value: '#f59e0b' },
            danger: { value: '#ef4444' },
            info: { value: '#06b6d4' }
          },
          feedback: {
            error: { value: '#dc2626' },
            success: { value: '#059669' }
          }
        },
        spacing: {
          notice: {
            xs: { value: '0.5rem' },
            sm: { value: '1rem' },
            md: { value: '1.5rem' },
            lg: { value: '2rem' },
            xl: { value: '3rem' }
          }
        }
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        },
        slideIn: {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(0)' }
        },
        spin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' }
        }
      }
    }
  },
  
  patterns: {
    noticeCard: {
      description: 'お知らせカードのスタイルパターン',
      properties: {
        variant: { type: 'enum', value: ['default', 'featured'] }
      },
      transform(props) {
        return {
          display: 'flex',
          flexDirection: 'column',
          padding: 'notice.md',
          borderRadius: 'md',
          backgroundColor: props.variant === 'featured' 
            ? 'notice.surface' 
            : 'white',
          border: '1px solid',
          borderColor: 'gray.200',
          cursor: 'pointer',
          transition: 'all 0.2s',
          _hover: {
            borderColor: 'notice.primary',
            transform: 'translateY(-2px)',
            boxShadow: 'md'
          }
        }
      }
    }
  },

  outdir: 'styled-system'
})
```

### 2. コンポーネントでのスタイル使用例

```typescript
// NoticeCard.tsx
import { css } from '../styled-system/css'
import { noticeCard } from '../styled-system/patterns'

export const NoticeCard = ({ notice, onClick, variant = 'default' }: NoticeCardProps) => {
  return (
    <div 
      className={noticeCard({ variant })}
      onClick={() => onClick(notice.id)}
    >
      <h3 className={css({
        fontSize: 'lg',
        fontWeight: 'semibold',
        color: 'gray.900',
        marginBottom: 'notice.xs'
      })}>
        {notice.title}
      </h3>
      <time className={css({
        fontSize: 'sm',
        color: 'gray.500'
      })}>
        {formatDate(notice.createdAt)}
      </time>
    </div>
  )
}

// Button.tsx
import { css, cva } from '../styled-system/css'

const buttonStyles = cva({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 'md',
    fontWeight: 'medium',
    transition: 'all 0.2s',
    cursor: 'pointer',
    _disabled: {
      opacity: 0.5,
      cursor: 'not-allowed'
    }
  },
  variants: {
    variant: {
      primary: {
        backgroundColor: 'notice.primary',
        color: 'white',
        _hover: { backgroundColor: 'blue.600' }
      },
      secondary: {
        backgroundColor: 'gray.100',
        color: 'gray.900',
        _hover: { backgroundColor: 'gray.200' }
      },
      danger: {
        backgroundColor: 'status.danger',
        color: 'white',
        _hover: { backgroundColor: 'red.600' }
      }
    },
    size: {
      sm: { padding: 'notice.xs notice.sm', fontSize: 'sm' },
      md: { padding: 'notice.sm notice.md', fontSize: 'md' },
      lg: { padding: 'notice.md notice.lg', fontSize: 'lg' }
    }
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md'
  }
})
```

### 3. レスポンシブデザイン

```typescript
// レスポンシブスタイルの例
const responsiveStyles = css({
  display: 'grid',
  gap: 'notice.md',
  gridTemplateColumns: {
    base: '1fr',           // モバイル: 1列
    md: 'repeat(2, 1fr)',  // タブレット: 2列
    lg: 'repeat(3, 1fr)'   // デスクトップ: 3列
  },
  padding: {
    base: 'notice.sm',     // モバイル: 小さいパディング
    md: 'notice.md',       // タブレット: 中程度
    lg: 'notice.lg'        // デスクトップ: 大きいパディング
  }
})
```

### 4. アニメーション活用

```typescript
// アニメーション付きコンポーネント
const animatedStyles = css({
  animation: 'fadeIn 0.3s ease-out',
  
  '&.loading': {
    animation: 'spin 1s linear infinite'
  },
  
  '&.slide-enter': {
    animation: 'slideIn 0.2s ease-out'
  }
})
```

## アクセシビリティ

### 1. キーボードナビゲーション

- Tabキーでのフォーカス移動
- Enterキーでのアクション実行
- ESCキーでのモーダル・ダイアログ閉じる

### 2. スクリーンリーダー対応

- セマンティックなHTML要素の使用
- aria-label、aria-describedbyの適切な設定
- ロールとプロパティの明示

### 3. 視覚的配慮

- 十分なカラーコントラスト比の確保
- フォーカス状態の視覚的表示
- 読みやすいフォントサイズと行間

## エラーハンドリング

### 1. フォームエラー処理

```typescript
interface FormErrorState {
  hasError: boolean;
  fieldErrors?: Record<string, string>;
  generalError?: string;
}
```

### 2. API エラー処理

- ネットワークエラーの再試行機能
- 適切なエラーメッセージの表示
- フォールバックコンテンツの提供

### 3. 境界エラー処理

- Error Boundaryによる予期しないエラーのキャッチ
- エラー情報のログ出力
- ユーザーフレンドリーなエラー画面

## テスト戦略

### 1. 単体テスト

- カスタムフックのテスト
- ユーティリティ関数のテスト
- コンポーネントの個別機能テスト

### 2. 統合テスト

- フォーム送信フローのテスト
- API連携処理のテスト
- ルーティング機能のテスト

### 3. E2Eテスト

- お知らせ作成から削除までの一連の流れ
- エラーハンドリングのテスト
- ユーザビリティテスト

## 実装フェーズ

### Phase 1: 基盤構築

- プロジェクト設定とTypeSpec定義
- 基本的なコンポーネント作成
- 状態管理の実装

### Phase 2: CRUD機能実装

- お知らせ一覧表示機能
- お知らせ詳細表示機能
- 作成・編集フォーム実装

### Phase 3: UX向上

- バリデーション機能追加
- 削除確認ダイアログ実装
- ローディング・エラー状態の改善

### Phase 4: 品質向上

- テストコード作成
- アクセシビリティ対応
- パフォーマンス最適化

---

**注意**: この設計書はお知らせ管理アプリケーションの要件に基づいて作成されています。実装時には技術的制約や追加要件に応じて適切に調整してください。
