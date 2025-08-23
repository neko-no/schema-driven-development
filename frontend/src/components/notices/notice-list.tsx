"use client";

import { useNoticesServiceGetNotices } from "@/apiClient/client/noticeService";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export function NoticeList() {
  const { data: notices, isLoading, error } = useNoticesServiceGetNotices();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">読み込み中...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-red-500">
          エラーが発生しました: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">お知らせ一覧</h1>
        <p className="text-muted-foreground">
          システムからのお知らせを確認できます
        </p>
      </div>
      <DataTable columns={columns} data={notices || []} />
    </div>
  );
}
