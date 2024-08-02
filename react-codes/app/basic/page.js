"use client";
import { useState } from "react";

export default function Home() {
  const [counterNum, setCounterNum] = useState(0);

  const handleCountUp = () => {
    setCounterNum((prevCounterNum) => prevCounterNum + 1);
  };

  const handleCountDown = () => {
    setCounterNum((prevCounterNum) => prevCounterNum - 1);
  };

  return (
    <div>
      <div>基礎</div>
      <div>カウンター：{counterNum}</div>
      <button type="button" onClick={handleCountUp}>
        up
      </button>
      <button type="button" onClick={handleCountDown}>
        down
      </button>
    </div>
  );
}
