import React, { useState, useEffect } from "react";

const SumCalculator = () => {
  const [numbers, setNumbers] = useState([]); // store all input numbers
  const [currentInput, setCurrentInput] = useState(""); // current input value
  const [sum, setSum] = useState(0); // store the total sum

  // Handle input change
  const handleChange = (e) => {
    setCurrentInput(e.target.value);
  };

  // Handle adding a number to the list
  const handleAddNumber = () => {
    const parsedNumber = parseInt(currentInput, 10);
    if (!isNaN(parsedNumber)) {
      setNumbers((prevNumbers) => [...prevNumbers, parsedNumber]);
      setCurrentInput(""); // clear input
    }
  };

  // Asynchronously calculate sum whenever numbers change
  useEffect(() => {
    let isCancelled = false;

    const calculateSum = async () => {
      // Simulate async calculation with setTimeout
      const result = await new Promise((resolve) => {
        setTimeout(() => {
          const total = numbers.reduce((acc, num) => acc + num, 0);
          resolve(total);
        }, 0); // 0ms delay ensures async but non-blocking
      });

      if (!isCancelled) {
        setSum(result);
      }
    };

    calculateSum();

    return () => {
      isCancelled = true; // cleanup to prevent state update if component unmounted
    };
  }, [numbers]);

  // Handle pressing Enter key to add number
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddNumber();
    }
  };

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
