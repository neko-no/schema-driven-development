import {
  infiniteQueryOptions,
  queryOptions,
  type UseQueryOptions,
} from "@tanstack/react-query";
import { z } from "zod";
import {
  type GetUserOptions,
  type User,
  type UserPagination,
  userSchema,
} from "../types/users";

export default function createUserQueryOptions<TData = User[], TError = Error>(
  params?: GetUserOptions,
  options?: Omit<UseQueryOptions<User[], TError, TData>, "queryKey" | "queryFn">
) {
  return queryOptions({
    ...options,
    queryKey: ["users", params],
    queryFn: () => getUsers(params),
    select: (data) => {
      return data.sort((a, b) => a.phone.localeCompare(b.phone));
    },
    refetchInterval: 1000,
  });
}

export function createUserInfiniteQueryOptions() {
  return infiniteQueryOptions({
    queryKey: ["users"],
    queryFn: ({ pageParam }) =>
      getUsersPagination({ page: pageParam, limit: 1 }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.pagination.hasMore
        ? lastPage.pagination.currentPage + 1
        : undefined;
    },
  });
}

const getUsers = async (params?: GetUserOptions): Promise<User[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();

  // zodでパースしてバリデーション
  const usersSchema = z.array(userSchema);
  return usersSchema.parse(data);
};

const getUsersPagination = async (
  params?: GetUserOptions
): Promise<UserPagination> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();

  // zodでパースしてバリデーション
  const usersSchema = z.array(userSchema);
  const users = usersSchema.parse(data);

  const currentPage = params?.page || 1;
  const limit = params?.limit || 10;
  const totalItems = users.length;
  const totalPages = Math.ceil(totalItems / limit);

  const startIndex = (currentPage - 1) * limit;
  const endIndex = Math.min(startIndex + limit, totalItems);
  const paginatedUsers = users.slice(startIndex, endIndex);

  return {
    users: paginatedUsers,
    pagination: {
      currentPage,
      totalPages,
      totalItems,
      hasMore: currentPage < totalPages,
    },
  };
};
