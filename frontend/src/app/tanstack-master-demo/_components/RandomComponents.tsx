import { useInfiniteQuery } from "@tanstack/react-query";
import createUserQueryOptions, {
  createUserInfiniteQueryOptions,
} from "../../../../queryOptions/createUserQueryOptions";
import styles from "./RandomComponents.module.css";

export default function RandomComponent() {
  const userQueryOptions = createUserInfiniteQueryOptions();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useInfiniteQuery(userQueryOptions);

  const handleClick = () => {
    refetch();
  };

  return (
    <div className={styles.container}>
      <button onClick={handleClick} className={styles.button}>
        データを再取得
      </button>

      {data?.pages ? (
        <div className={styles.grid}>
          {data.pages.map((page, pageIndex) =>
            page.users.map((user: any, userIndex: number) => (
              <div key={`${pageIndex}-${userIndex}`} className={styles.card}>
                {Object.entries(user).map(([key, value]) => (
                  <div key={key} className={styles.fieldContainer}>
                    <span className={styles.fieldLabel}>{key}:</span>
                    <p className={styles.fieldValue}>
                      {typeof value === "object"
                        ? JSON.stringify(value)
                        : String(value)}
                    </p>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      ) : (
        <div className={styles.loadingContainer}>
          <p className={styles.loadingText}>データを読み込み中...</p>
        </div>
      )}

      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className={styles.button}
        >
          {isFetchingNextPage ? "読み込み中..." : "さらに読み込む"}
        </button>
      )}
    </div>
  );
}
