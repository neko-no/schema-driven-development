import { Suspense } from "react";
import { noticesServiceGetNotices } from "@/apiClient/client/noticeService";

const Body: React.FC = async () => {
  const response = await noticesServiceGetNotices();

  return (
    <>
      <h2>Server Component</h2>
      {response.map((notice, i) => (
        <p key={i}>{notice.title}</p>
      ))}
    </>
  );
};

const SampleServer: React.FC = async () => {
  return (
    <Suspense fallback={<div>SampleServer Loading...</div>}>
      <Body />
    </Suspense>
  );
};

export default SampleServer;
