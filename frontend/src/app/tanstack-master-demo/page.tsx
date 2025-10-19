"use client";

import { useState } from "react";
import RandomComponent from "./_components/RandomComponents";

export default function AppDemo() {
  const [isShow, setShow] = useState(false);

  return (
    <div>
      <RandomComponent />
      {isShow && <RandomComponent />}
      <button onClick={() => setShow((prev) => !prev)}>
        Show Other Component
      </button>
    </div>
  );
}
