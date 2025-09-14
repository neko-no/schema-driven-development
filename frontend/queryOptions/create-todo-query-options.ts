import { queryOptions } from '@tanstack/react-query';

export default function createTodoQueryOptions() {
  return queryOptions({
    queryKey: ["todos"],
    queryFn: getTodos,
  });
}

const DELAY_MS = 1000;

const getTodos = async (): Promise<Todo[]> => {
  await new Promise((resolve) => setTimeout(resolve, DELAY_MS));
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
