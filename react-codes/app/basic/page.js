"use client";
import { useState } from "react";

export default function Home() {
  const [counterNum, setCounterNum] = useState(0);
  const [fieldText, setFieldText] = useState("どんどん編集しちゃって！！");

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
      <input
        type="text"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="自由に記述してください"
        value={fieldText}
        onChange={(e) => setFieldText(e.target.value)}
      />
    </div>
  );
}
