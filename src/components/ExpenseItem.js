import React, { Component } from "react";
import "./ExpenseItem.css";
import { MdDelete, MdEdit } from "react-icons/md";

const ExpenseItem = ({ expense, handleDelete, handleEdit }) => {
  console.log(expense);
  return (
    <li className="item">
      <div className="info">
        <span className="expense">{expense.charge}</span>
        <span className="amount">{expense.amount}원 </span>
      </div>
      <div>
        <button
          className="edit-btn"
          onClick={() => {
            handleEdit(expense.id);
          }}
        >
          <MdEdit />
        </button>
        <button
          className="clear-btn"
          onClick={() => {
            // 지우는 함수 호출(this.props.expense.id)
            this.props.handleDelete(expense.id);
            console.log(`${expense.id} clicked`);
          }}
        >
          <MdDelete />
        </button>
      </div>
    </li>
  );
};

export default ExpenseItem;
