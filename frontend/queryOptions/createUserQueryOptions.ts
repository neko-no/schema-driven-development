import { queryOptions } from "@tanstack/react-query";

export default function createUserQueryOptions() {
  return queryOptions({
    queryKey: ["users"],
    queryFn: getUsers,
  });
}

const getUsers = async (): Promise<User[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  return response.json();
};

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