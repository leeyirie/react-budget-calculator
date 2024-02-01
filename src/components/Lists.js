import React, { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { MdOutlineSaveAlt } from "react-icons/md";
import { BsBackspace } from "react-icons/bs";

import "./Lists.css";

export default function Lists({ expenseData, setExpenseData }) {
  const [editedTitle, setEditedTitle] = useState(""); //수정할 제목
  const [editedCost, setEditedCost] = useState(""); //수정할 비용값
  const [editingId, setEditingId] = useState(null);

  const handleDeleteItem = (id) => {
    const updatedData = expenseData.filter((item) => item.id !== id);
    setExpenseData(updatedData);
    localStorage.setItem("expenseData", JSON.stringify(updatedData));
  };

  const handleSave = (id) => {
    const updatedData = expenseData.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          title: editedTitle !== "" ? editedTitle : item.title,
          cost: editedCost !== "" ? editedCost : item.cost,
        };
      }
      return item;
    });
    setExpenseData(updatedData);
    setEditingId(null); // 편집 모드 종료
    setEditedTitle("");
    setEditedCost("");
  };


  const handleEditClick = (id) => {
    setEditingId(id);
    // 편집
    const currentData = expenseData.find((item) => item.id === id);
    setEditedTitle(currentData.title);
    setEditedCost(currentData.cost);
  };

  const handleCancelEdit = () => {
    // 편집 상태를 취소하고 초기화
    setEditingId(null);
    setEditedTitle("");
    setEditedCost("");
  };

  return (
    <div className="expense-list">
      {expenseData.map((data) => (
        <div key={data.id} className="list">
          {editingId === data.id ? (
            // 현재 편집 중인 항목의 입력 필드를 표시
            <>
              <input
                type="text"
                placeholder="지출 항목"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
              <input
                type="text"
                placeholder="비용"
                value={editedCost}
                onChange={(e) => setEditedCost(e.target.value)}
              />
              <MdOutlineSaveAlt
                style={{ fontSize: "20px" }}
                onClick={() => handleSave(data.id)}
              />
              <BsBackspace
                style={{ color: "#1E90FF", strokeWidth: "0.5" }}
                onClick={handleCancelEdit}
              />
            </>
          ) : (
            // 편집 중이 아니면 항목 내용을 표시
            <>
              <p className="text">
                <span>{data.title}</span>
                <span>{data.cost}</span>
              </p>
              <FiEdit onClick={() => handleEditClick(data.id)} />
              <FaRegTrashAlt
                style={{ color: "#EB3232" }}
                onClick={() => handleDeleteItem(data.id)}
              />
            </>
          )}
        </div>
      ))}
    </div>
  );
}
