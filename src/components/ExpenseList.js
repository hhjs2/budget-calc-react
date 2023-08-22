import React, { Component } from "react";
import "./ExpenseList.css";
import ExpenseItem from "./ExpenseItem";

export default class ExpenseList extends Component {
  render() {
    // props 받기
    // this.props.initialExpenses;
    console.log(this.props.expenses);
    return (
      <>
        <ul className="list">
          {/* Expense Item */}
          {this.props.expenses.map((expense) => {
            return (
              <ExpenseItem
                expense={expense}
                key={expense.id}
                handleDelete={this.props.handleDelete}
              />
            );
          })}
        </ul>
        <button className="btn">목록지우기</button>
      </>
    );
  }
}
