"use client";

import { useNoticesServiceGetNotices } from "@/apiClient/client/noticeService";

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
      {data.map((notice) => (
        <p key={notice.id}>{notice.title}</p>
      ))}
    </>
  );
};

const SampleClient: React.FC = () => {
  return <Body />;
};

export default SampleClient;
