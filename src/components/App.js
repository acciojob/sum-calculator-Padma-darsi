import React, { useState, useEffect } from "react";
import "./../styles/App.css";

const SumCalculator = () => {
  const [numbers, setNumbers] = useState([]);
  const [sum, setSum] = useState(0);
  const [inputValue, setInputValue] = useState("");

  // ✅ Handle input change
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  // ✅ Add number asynchronously
  const handleAdd = () => {
    const num = parseInt(inputValue);
    if (!isNaN(num)) {
      setNumbers((prev) => [...prev, num]);
      setInputValue("");
    }
  };

  // ✅ Calculate sum asynchronously to prevent UI freeze
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
      <h2>Sum Calculator</h2>
      <input
        type="number"
        value={inputValue}
        onChange={handleChange}
        placeholder="Enter a number"
      />
      <button onClick={handleAdd}>Add Number</button>
      <h3>Numbers: {numbers.join(", ")}</h3>
      <h3>Total Sum: {sum}</h3>
    </div>
  );
};

export default SumCalculator;

