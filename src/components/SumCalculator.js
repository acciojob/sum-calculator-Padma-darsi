import React, { useState, useEffect } from "react";

const SumCalculator = () => {
  const [numbers, setNumbers] = useState([]); // store all numbers
  const [currentInput, setCurrentInput] = useState(""); // current input
  const [sum, setSum] = useState(0); // total sum

  // Handle input change
  const handleChange = (e) => {
    setCurrentInput(e.target.value);
  };

  // Add number to the list
  const handleAddNumber = () => {
    const parsed = parseFloat(currentInput); // allow decimals
    if (!isNaN(parsed)) {
      setNumbers((prev) => [...prev, parsed]);
      setCurrentInput(""); // clear input
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddNumber();
    }
  };

  // Asynchronously calculate sum whenever numbers change
  useEffect(() => {
    let isCancelled = false;

    const calculateSum = async () => {
      const result = await new Promise((resolve) => {
        setTimeout(() => {
          const total = numbers.reduce((acc, num) => acc + num, 0);
          resolve(total);
        }, 0); // async but non-blocking
      });

      if (!isCancelled) setSum(result);
    };

    calculateSum();

    return () => {
      isCancelled = true;
    };
  }, [numbers]);

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto", textAlign: "center" }}>
      <input
        type="number"
        value={currentInput}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        placeholder="Enter a number"
      />
      <button onClick={handleAddNumber} style={{ marginLeft: "10px" }}>
        Add
      </button>

      <div style={{ marginTop: "20px" }}>
        <h3>Numbers: {numbers.join(", ") || "None"}</h3>
        <h3>Total Sum: {sum}</h3>
      </div>
    </div>
  );
};

export default SumCalculator;
