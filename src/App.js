import logo from "./logo.svg";
import "./App.css";
import { Component } from "react";
import ExpenseForm from "./components/ExpenseForm";
import { MachineLearning } from "aws-sdk";
import ExpenseList from "./components/ExpenseList";

export default class App extends Component {
  render() {
    return (
      <main className="main-container">
        <h1>예산 계산기</h1>

        <div
          style={{ width: "100%", backgroundColor: "white", padding: "1rem" }}
        >
          {/* Expense Form */}
          {/* 컴포넌트 사용 */}
          <ExpenseForm />
        </div>

        <div
          style={{ width: "100%", backgroundColor: "white", padding: "1rem" }}
        >
          {/* Expense list */}
          <ExpenseList></ExpenseList>
        </div>

        <div
          style={{ display: "flex", justifyContent: "end", marginTop: "1rem" }}
        >
          <p style={{ fontSize: "2rem" }}>
            총 지출 :<span>원</span>
          </p>
        </div>
      </main>
    );
  }
}
