import { useQuery } from "@tanstack/react-query";
import createUserQueryOptions from "../../../../queryOptions/createUserQueryOptions";

export default function RandomComponent() {
  const { data } = useQuery(createUserQueryOptions());

  return <div>{JSON.stringify(data)}</div>;
}
