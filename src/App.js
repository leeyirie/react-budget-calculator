import React, { useState, useEffect} from "react";
import "./App.css";
import Lists from "./components/Lists";
import uuid from "react-uuid";

export default function App() {
  const [expenseData, setExpenseData] = useState([]); // 데이터
  const [expenseTitle, setExpenseTitle] = useState(""); // 지출 항목
  const [expenseCost, setExpenseCost] = useState(""); // 비용

  useEffect(() => {
    const loadedData = localStorage.getItem("expenseData");
    if (loadedData) {
      setExpenseData(JSON.parse(loadedData));
    }
  }, []); // 빈 배열을 두어 한 번만 실행되도록 설정

  const btnStyle = {
    backgroundColor: "rgb(109, 173, 229)",
    color: "white",
    border: "none",
    marginLeft: "30px",
    marginBottom: "0px",
    padding: "7px 20px",
    borderRadius: "5px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  const handleMouseOver = (e) => {
    e.target.style.backgroundColor = "rgb(92, 145, 191)";
  };

  const handleMouseOut = (e) => {
    e.target.style.backgroundColor = "rgb(109, 173, 229)";
  };

  const handleSubmit = () => {
    let newExpense = {
      id: uuid(),
      title: expenseTitle,
      cost: expenseCost,
      completed: false,
    };

    const updatedData = [...expenseData, newExpense];
    localStorage.setItem("expenseData", JSON.stringify(updatedData)); // 전체 배열 저장
    setExpenseData(updatedData);
    setExpenseTitle("");
    setExpenseCost("");
  };

  const handleTitleChange = (e) => {
    setExpenseTitle(e.target.value);
  };

  const handleCostChange = (e) => {
    setExpenseCost(e.target.value);
  };

  const handleDelete = () => {
    setExpenseData([]);
  };

  const calculateTotalCost = () => {
    let totalCost = 0;
    expenseData.forEach((data) => {
      totalCost += Number(data.cost);
    });
    return totalCost;
  };

  return (
    <div>
      <div className="container">
        <h1>Budget calculator 🤑</h1>
        <form>
          <div className="input-budget">
            <div className="expense">
              <p>지출 항목</p>
              <input
                type="text"
                placeholder="예) 렌트비"
                value={expenseTitle}
                onChange={handleTitleChange}
              />
            </div>
            <div className="cost">
              <p>비용</p>
              <input
                type="number"
                placeholder="54000"
                value={expenseCost}
                onChange={handleCostChange}
              />
            </div>
          </div>
          <button
            type="button"
            style={btnStyle}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            onClick={handleSubmit}
          >
            제출하기
          </button>
        </form>

        <Lists expenseData={expenseData} setExpenseData={setExpenseData} />

        {expenseData.length > 0 && (
          <div className="btn1">
            <button
              type="button"
              className="delete-btn"
              style={btnStyle}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
              onClick={handleDelete}
            >
              목록 지우기
            </button>
            <p className="total"> 총 지출: {calculateTotalCost()}원 </p>
          </div>
        )}
      </div>
    </div>
  );
}
