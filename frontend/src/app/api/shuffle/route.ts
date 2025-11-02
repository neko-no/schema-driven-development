import { NextResponse } from "next/server";

const SORT_NUMBER = 0.5;

export async function POST(request: Request) {
  const { members } = (await request.json()) as { members: string[] };
  const result = members.sort(() => Math.random() - SORT_NUMBER);
  return NextResponse.json({ members: result });
}
