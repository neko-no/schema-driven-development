import { queryOptions, UseQueryOptions } from "@tanstack/react-query";

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

const getUsers = async (params?: GetUserOptions): Promise<User[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  return response.json();
};

type GetUserOptions = {
  page?: number;
  limit?: number;
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

