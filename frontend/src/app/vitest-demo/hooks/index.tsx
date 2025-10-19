import { useCallback } from "react";

export const useButtonClick = () => {
  const handleClick = useCallback(() => {
    alert("ܿボタンがクリックされました");
  }, []);

  return { handleClick };
};
