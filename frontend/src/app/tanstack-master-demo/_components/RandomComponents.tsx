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
      <button className={styles.button} onClick={handleClick}>
        データを再取得
      </button>

      {data?.pages ? (
        <div className={styles.grid}>
          {data.pages.map((page, pageIndex) =>
            page.users.map((user: any, userIndex: number) => (
              <div className={styles.card} key={`${pageIndex}-${userIndex}`}>
                {Object.entries(user).map(([key, value]) => (
                  <div className={styles.fieldContainer} key={key}>
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
          className={styles.button}
          disabled={isFetchingNextPage}
          onClick={() => fetchNextPage()}
        >
          {isFetchingNextPage ? "読み込み中..." : "さらに読み込む"}
        </button>
      )}
    </div>
  );
}
