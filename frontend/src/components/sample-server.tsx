import { Suspense } from "react";
import { noticesServiceGetNotices } from "@/apiClient/client/noticeService";

const Body: React.FC = async () => {
  const response = await noticesServiceGetNotices();

  return (
    <>
      <h2>Server Component</h2>
      {response.map((notice) => (
        <p key={notice.id}>{notice.title}</p>
      ))}
    </>
  );
};

const SampleServer: React.FC = () => {
  return (
    <Suspense fallback={<div>SampleServer Loading...</div>}>
      <Body />
    </Suspense>
  );
};

export default SampleServer;
