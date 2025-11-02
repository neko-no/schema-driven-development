"use client";

import { useCallback, useRef, useState } from "react";

export function ShuffleMemberForm() {
  // 結果
  const [result, setResult] = useState([] as string[]);
  // 要素への参照
  const firstRef = useRef<HTMLInputElement>(null);
  const secondRef = useRef<HTMLInputElement>(null);
  const thirdRef = useRef<HTMLInputElement>(null);

  // 通信
  const callApi = useCallback(async () => {
    const members = [] as string[];
    const refs = [firstRef, secondRef, thirdRef];
    for (const ref of refs) {
      if (ref.current?.value) {
        members.push(ref.current?.value);
      }
    }
    const res = await fetch("/api/shuffle", {
      method: "post",
      body: JSON.stringify({ members }),
    });
    if (res.ok) {
      const apiResponse = (await res.json()) as { members: string[] };
      setResult(apiResponse.members);
    }
  }, []);

  return (
    <>
      <label htmlFor="first">1人目:</label>
      <input
        id="first"
        name="first"
        placeholder="1人目の名前を入力"
        ref={firstRef}
        type="text"
      />
      <br />
      <label htmlFor="second">2人目:</label>
      <input
        id="second"
        name="second"
        placeholder="2人目の名前を入力"
        ref={secondRef}
        type="text"
      />
      <br />
      <label htmlFor="third">3人目:</label>
      <input
        id="third"
        name="third"
        placeholder="3人目の名前を入力"
        ref={thirdRef}
        type="text"
      />
      <br />
      <button onClick={callApi} type="button">
        シャッフル
      </button>
      <br />
      <label htmlFor="result">結果</label>
      <br />
      <output htmlFor="first second third fourth" id="result">
        {result.join("→")}
      </output>
    </>
  );
}
