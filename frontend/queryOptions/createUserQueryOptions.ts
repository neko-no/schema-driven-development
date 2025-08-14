import { infiniteQueryOptions, queryOptions, UseQueryOptions } from "@tanstack/react-query";

export default function createUserQueryOptions<
  TData = User[],
  TError = Error
  >(
    params?: GetUserOptions,
    options?: Omit<UseQueryOptions<User[], TError, TData>, "queryKey" | "queryFn">
  ) {
  return queryOptions({
    ...options,
    queryKey: ["users", params],
    queryFn: () => getUsers(params),
    staleTime: 60000,
  });
}

export function createUserInfiniteQueryOptions () {
  return infiniteQueryOptions({
    queryKey: ["users"],
    queryFn: ({pageParam}) => getUsersPagination({page: pageParam, limit: 1}),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.pagination.hasMore ? lastPage.pagination.currentPage + 1 : undefined
    }
  })
}

const getUsers = async (params?: GetUserOptions): Promise<User[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  return response.json();
};

const getUsersPagination = async (params?: GetUserOptions): Promise<UserPagenation> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users: User[] = await response.json();

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
      hasMore: currentPage < totalPages
    }
  };
};

type GetUserOptions = {
  page?: number;
  limit?: number;
}

type UserPagenation = {
  users: User[],
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    hasMore: boolean;
  }
}

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    }
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

