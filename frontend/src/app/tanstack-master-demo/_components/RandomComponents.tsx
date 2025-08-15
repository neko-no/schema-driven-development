import { useQuery } from "@tanstack/react-query";
import createUserQueryOptions from "../../../../queryOptions/createUserQueryOptions";
import styles from "./RandomComponents.module.css";

export default function RandomComponent() {
  const userQueryOptions = createUserQueryOptions();
  const { data: users } = useQuery(userQueryOptions);

  const handleClick = () => {
    console.log("click");
  };

  return (
    <div className={styles.container}>
      <button onClick={handleClick} className={styles.button}>
        データを再取得
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
