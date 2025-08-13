"use client";

import { useQuery } from "@tanstack/react-query";
import createTodoQueryOptions from "../../../queryOptions/createTodoQueryOptions";

export default function TanstackDemo() {
  const { data, isPending } = useQuery(createTodoQueryOptions());

  return (
    <>
      <div>{isPending ? "Pending" : JSON.stringify(data?.slice(0, 10))}</div>
    </>
  );
}
