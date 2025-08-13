"use client";

import { useQuery } from "@tanstack/react-query";
import { resolve } from "path";
import { useState } from "react";

export default function TanstackDemo() {
  const [id, setId] = useState(1);
  const { data, isPending } = useQuery({
    queryKey: ["todos", id],
    queryFn: () => getComments(id),
  });

  return (
    <>
      <div>{isPending ? "Pending" : JSON.stringify(data?.slice(0, 10))}</div>
      <button
        onClick={() => {
          setId((prev) => prev + 1);
        }}
      >
        Increment ID
      </button>
    </>
  );
}

const getComments = async (id: number) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${id}`
  );
  return (await response).json();
};
