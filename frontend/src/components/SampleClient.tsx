"use client";

import { useNoticesServiceGetNotices } from "@/schema/noticeService";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Body: React.FC = () => {
  const { data, isPending, error, isError } = useNoticesServiceGetNotices();

  if (isError) {
    return <p>{error.message}</p>;
  }

  if (isPending) {
    return <p>SampleClient Loading...</p>;
  }

  return (
    <>
      <h2>Client Component</h2>
      {data.map((notice, i) => (
        <p key={i}>{notice.title}</p>
      ))}
    </>
  );
};

const SampleClient: React.FC = () => {
  // TanStack Queryを使用するためのQueryClientを作成し、QueryClientProviderでラップ
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Body />
    </QueryClientProvider>
  );
};

export default SampleClient;
