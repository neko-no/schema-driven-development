import { queryOptions } from "@tanstack/react-query";

export default function createTodoQueryOptions() {
  return queryOptions({
    queryKey: ["todos"],
    queryFn: getTodos,
  });
}

const getTodos = async (): Promise<Todo[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/comments?todos"
  );
  return response.json();
};

// Type definitions
type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};
