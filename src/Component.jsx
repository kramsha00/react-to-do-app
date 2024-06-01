import React from "react";
import { useState } from "react";

export default function Component(props) {
  const [count, setCount] = useState(0);

  function decrement() {
    setCount((prevCount) => prevCount - 1);
  }

  function increment() {
    setCount((prevCount) => prevCount + 1);
  }

  return (
    <div className="p-4">
      <p>This is {props.name}'s counter!</p>
      <span className="text-3xl font-bold text-green-600">Count: {count}</span>
      <div className="flex flex-row gap-4">
        <button
          onClick={decrement}
          className="bg-blue-500 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded"
        >
          -
        </button>
        <button
          onClick={increment}
          className="bg-green-500 hover:bg-green-300 text-white font-bold py-2 px-4 rounded"
        >
          +
        </button>
      </div>
    </div>
  );
}
