"use client";

import { useQueries } from "@tanstack/react-query";
import createPostQueryOptions from "../../../queryOptions/create-post-query-options";
import createTodoQueryOptions from "../../../queryOptions/create-todo-query-options";
import createUserQueryOptions from "../../../queryOptions/create-user-query-options";
import styles from "./page.module.css";

// Display limits
const MAX_TODOS_DISPLAY = 6;
const MAX_USERS_DISPLAY = 4;
const MAX_POSTS_DISPLAY = 8;
const POST_PREVIEW_LENGTH = 100;

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export default function TanstackDemo() {
  const [todoQuery, userQuery, postQuery] = useQueries({
    queries: [
      createTodoQueryOptions(),
      createUserQueryOptions(),
      createPostQueryOptions(),
    ],
  });

  if (todoQuery.isLoading || userQuery.isLoading || postQuery.isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner} />
          <p className={styles.loadingText}>データを読み込み中...</p>
        </div>
      </div>
    );
  }

  if (todoQuery.error || userQuery.error || postQuery.error) {
    return (
      <div className={styles.container}>
        <div className={styles.errorContainer}>
          <h2 className={styles.errorTitle}>エラーが発生しました</h2>
          <p className={styles.errorMessage}>
            データの取得に失敗しました。再度お試しください。
          </p>
        </div>
      </div>
    );
  }

  const todos = (todoQuery.data as Todo[]) || [];
  const users = (userQuery.data as User[]) || [];
  const posts = (postQuery.data as Post[]) || [];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>📊 TanStack Query デモ</h1>
        <p className={styles.subtitle}>リアルタイムデータ表示ダッシュボード</p>
      </header>

      <div className={styles.grid}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>✅ Todos ({todos.length})</h2>
          <div className={styles.cardGrid}>
            {todos.slice(0, MAX_TODOS_DISPLAY).map((todo) => (
              <div className={styles.card} key={todo.id}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardId}>#{todo.id}</span>
                  <span
                    className={`${styles.status} ${todo.completed ? styles.completed : styles.pending}`}
                  >
                    {todo.completed ? "完了" : "未完了"}
                  </span>
                </div>
                <h3 className={styles.cardTitle}>{todo.title}</h3>
                <p className={styles.cardMeta}>ユーザー: {todo.userId}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>👥 Users ({users.length})</h2>
          <div className={styles.cardGrid}>
            {users.slice(0, MAX_USERS_DISPLAY).map((user) => (
              <div className={styles.userCard} key={user.id}>
                <div className={styles.userHeader}>
                  <h3 className={styles.userName}>{user.name}</h3>
                  <span className={styles.username}>@{user.username}</span>
                </div>
                <div className={styles.userInfo}>
                  <p className={styles.userEmail}>📧 {user.email}</p>
                  <p className={styles.userPhone}>📞 {user.phone}</p>
                  <p className={styles.userCompany}>🏢 {user.company.name}</p>
                  <p className={styles.userCity}>📍 {user.address.city}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>📝 Posts ({posts.length})</h2>
          <div className={styles.postGrid}>
            {posts.slice(0, MAX_POSTS_DISPLAY).map((post) => (
              <article className={styles.postCard} key={post.id}>
                <div className={styles.postHeader}>
                  <span className={styles.postId}>#{post.id}</span>
                  <span className={styles.postAuthor}>
                    by User {post.userId}
                  </span>
                </div>
                <h3 className={styles.postTitle}>{post.title}</h3>
                <p className={styles.postBody}>
                  {post.body.length > POST_PREVIEW_LENGTH
                    ? `${post.body.substring(0, POST_PREVIEW_LENGTH)}...`
                    : post.body}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>

      <footer className={styles.footer}>
        <p className={styles.footerText}>
          🚀 Powered by TanStack Query | データ更新時刻:{" "}
          {new Date().toLocaleTimeString("ja-JP")}
        </p>
      </footer>
    </div>
  );
}
