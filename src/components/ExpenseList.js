import React, { Component } from "react";
import "./ExpenseList.css";
import ExpenseItem from "./ExpenseItem";

//구조 분해 할당으로 props 나눠서 설정
const ExpenseList = ({ expenses, handleDelete }) => {
  // props 안에 들어가 있음
  // props.expenses
  // props.handleDelete
  return (
    <>
      <ul className="list">
        {/* Expense Item */}
        {expenses.map((expense) => {
          return (
            <ExpenseItem
              expense={expense}
              key={expense.id}
              handleDelete={handleDelete}
            />
          );
        })}
      </ul>
      <button className="btn">목록지우기</button>
    </>
  );
};

export default ExpenseList;
