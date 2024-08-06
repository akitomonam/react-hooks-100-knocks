"use client";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Home() {
  const [counterNum, setCounterNum] = useState(0);
  const [fieldText, setFieldText] = useState("どんどん編集しちゃって！！");
  const [weatherPlace, setWeatherPlace] = useState("");

  const handleCountUp = () => {
    setCounterNum((prevCounterNum) => prevCounterNum + 1);
  };

  const handleCountDown = () => {
    setCounterNum((prevCounterNum) => prevCounterNum - 1);
  };

  const getWeather = () => {
    const API_URL = "https://www.jma.go.jp/bosai/forecast/data/forecast/340000.json"
    axios.get(API_URL)
      .then((response) => {
        const placeName = response.data[0].publishingOffice
        setWeatherPlace(placeName)
      }
      )
  }

  useEffect(getWeather, [])

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
      <h2>お天気情報</h2>
      <div>
        地名：{weatherPlace}
      </div>
    </div>
  );
}
