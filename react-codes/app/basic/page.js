"use client";
import axios from "axios";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";

const SubHome = ({ onButtonClick }) => {
  return (
    <button onClick={onButtonClick}> Click me</button>
  )
}

export default function Home() {
  const [counterNum, setCounterNum] = useState(0);
  const [counterNum2, setCounterNum2] = useState(0);
  const [fieldText, setFieldText] = useState("どんどん編集しちゃって！！");
  const [weatherPlace, setWeatherPlace] = useState("");

  const inputRef = useRef(null)
  const prevCountRef = useRef();

  let sampleNum = 0

  const double = (num) => {
    let i = 0;
    while (i < 1000000000) {
      i++;
    }
    return num * 2;
  }

  const handleClick = useCallback(() => {
    console.log("Button clicked")
  }, []);

  const handleCountUp = () => {
    setCounterNum((prevCounterNum) => {
      prevCountRef.current = counterNum
      sampleNum += 1
      return prevCounterNum + 1
    });
  };

  const handleCountDown = () => {
    setCounterNum((prevCounterNum) => {
      prevCountRef.current = counterNum
      sampleNum -= 1
      return prevCounterNum - 1
    });
  };

  const handleCountUp2 = () => {
    setCounterNum2((prevCounterNum) => {
      return prevCounterNum + 1
    });
  };

  const handleCountDown2 = () => {
    setCounterNum2((prevCounterNum) => {
      return prevCounterNum - 1
    });
  };

  const getWeather = () => {
    const API_URL = "https://www.jma.go.jp/bosai/forecast/data/forecast/340000.json"
    axios.get(API_URL)
      .then((response) => {
        const placeName = response.data[0].publishingOffice
        console.log("placeName:", placeName);
        setWeatherPlace(placeName);
      }
      )
      .catch((error) => {
        console.error("Error fetching weather data: ", error);
      })
  }

  // const doubleNum = double(counterNum);
  const doubleNum = useMemo(() => double(counterNum2), [counterNum2])

  useEffect(() => {
    getWeather();
    const intervalId = setInterval(() => {
      console.log('Interval running...');
    }, 1000);

    if (inputRef.current) {
      inputRef.current.focus();
    }

    return () => {
      clearInterval(intervalId);
      console.log("unmounted and interval cleared");
    };
  }, [])

  return (
    <div>
      <h1>基礎</h1>
      <h2>useCallBackのクリック</h2>
      <SubHome onButtonClick={handleClick} />
      <h2>カウント(fast)</h2>
      <div>
        <div>カウンター(after)：{counterNum}</div>
        <div>カウンター(before)：{prevCountRef.current}</div>
        <div>カウンター(sample)：{sampleNum}</div>
        <div>
          <button type="button" onClick={handleCountUp}>
            up
          </button>
          <button type="button" onClick={handleCountDown}>
            down
          </button>
        </div>
      </div>
      <h2>カウント(slow)</h2>
      <div>
        <div>カウンター2(after)：{counterNum2}</div>
        <div>カウンター2(double)：{doubleNum}</div>
        <div>
          <button type="button" onClick={handleCountUp2}>
            up2
          </button>
          <button type="button" onClick={handleCountDown2}>
            down2
          </button>
        </div>
      </div>
      <h2>フォーム</h2>
      <div>
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="自由に記述してください"
          value={fieldText}
          onChange={(e) => setFieldText(e.target.value)}
        />
      </div>
      <div><input ref={inputRef} type="text" placeholder="自動でフォーカスが当たります" /></div>
      <h2>お天気情報</h2>
      <div>
        地名：{weatherPlace}
      </div>
    </div>
  );
}
