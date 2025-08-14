import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import createUserQueryOptions, {
  createUserInfiniteQueryOptions,
} from "../../../../queryOptions/createUserQueryOptions";
import styles from "./RandomComponents.module.css";

export default function RandomComponent() {
  const userQueryOptions = createUserInfiniteQueryOptions();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(userQueryOptions);

  const handleClick = () => {
    console.log("click");
  };

  const handleFetchNextPage = () => {
    fetchNextPage();
  };

  const users = data?.pages.flatMap((page) => page.users);

  return (
    <div className={styles.container}>
      <button onClick={handleClick} className={styles.button}>
        データを再取得
      </button>

      <button
        onClick={handleFetchNextPage}
        className={styles.button}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage ? "次のページを読み込み中..." : "次のページを取得"}
      </button>

      {users && Array.isArray(users) ? (
        <div className={styles.grid}>
          {users.map((item: any, index: number) => (
            <div key={index} className={styles.card}>
              {Object.entries(item).map(([key, value]) => (
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
          ))}
        </div>
      ) : users ? (
        <div className={styles.singleCard}>
          {Object.entries(users).map(([key, value]) => (
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
      ) : (
        <div className={styles.loadingContainer}>
          <p className={styles.loadingText}>データを読み込み中...</p>
        </div>
      )}
    </div>
  );
}
