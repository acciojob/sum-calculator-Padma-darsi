import React, { useState, useEffect } from "react";
import "./../styles/App.css";

const App = () => {
  const [numbers, setNumbers] = useState([]);
  const [sum, setSum] = useState(0);
  const [inputValue, setInputValue] = useState("");

  // handle input change
  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    const num = parseInt(value);
    if (!isNaN(num)) {
      // update numbers dynamically as user types
      setNumbers((prev) => [...prev.slice(0, prev.length - 1), num]);
    }
  };

  // add number on Enter or button click
  const handleAdd = () => {
    const num = parseInt(inputValue);
    if (!isNaN(num)) {
      setNumbers((prev) => [...prev, num]);
      setInputValue("");
    }
  };

  // async sum calculation
  useEffect(() => {
    const calculateSum = async () => {
      const total = await new Promise((resolve) => {
        setTimeout(() => {
          const result = numbers.reduce((acc, val) => acc + val, 0);
          resolve(result);
        }, 0);
      });
      setSum(total);
    };

    calculateSum();
  }, [numbers]);

  return (
    <div>
      {/* Do not remove the main div */}
      <h1>Sum Calculator</h1>
      <input
        type="number"
        value={inputValue}
        onChange={handleChange}
        placeholder="Enter number"
      />
      <button onClick={handleAdd}>Add</button>
      <p>Numbers: {numbers.join(", ")}</p>
      <p>Sum: {sum}</p>
    </div>
  );
};

export default App;

