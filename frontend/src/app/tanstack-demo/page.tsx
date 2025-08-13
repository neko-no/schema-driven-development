"use client";

import { useQuery } from "@tanstack/react-query";
import { resolve } from "path";

export default function TanstackDemo() {
  const { data, isPending, refetch } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });
  return (
    <>
      <div>{isPending ? "Pending" : JSON.stringify(data.slice(0, 10))}</div>
      <button onClick={() => refetch()}>Refetch</button>
    </>
  );
}

const getTodos = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = fetch("https://jsonplaceholder.typicode.com/todos");
  return (await response).json();
};
