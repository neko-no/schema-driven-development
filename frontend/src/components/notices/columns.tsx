"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Notice } from "@/apiClient/schema"

export const columns: ColumnDef<Notice>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="font-mono">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "title",
    header: "タイトル",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "content",
    header: "内容",
    cell: ({ row }) => {
      const content = row.getValue("content") as string
      return (
        <div className="max-w-[500px] truncate" title={content}>
          {content}
        </div>
      )
    },
  },
  {
    accessorKey: "released_at",
    header: "公開日",
    cell: ({ row }) => {
      const date = new Date(row.getValue("released_at"))
      return <div>{date.toLocaleDateString("ja-JP")}</div>
    },
  },
  {
    accessorKey: "created_at",
    header: "作成日",
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at"))
      return <div>{date.toLocaleString("ja-JP")}</div>
    },
  },
  {
    accessorKey: "updated_at",
    header: "更新日",
    cell: ({ row }) => {
      const date = new Date(row.getValue("updated_at"))
      return <div>{date.toLocaleString("ja-JP")}</div>
    },
  },
]