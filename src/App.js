import logo from "./logo.svg";
import "./App.css";
import { Component } from "react";
import ExpenseForm from "./components/ExpenseForm";
import { MachineLearning } from "aws-sdk";
import ExpenseList from "./components/ExpenseList";

export default class App extends Component {
  initialExpenses = [
    { id: 1, charge: "렌트비", amount: 1600 },
    { id: 2, charge: "교통비", amount: 1800 },
    { id: 3, charge: "식비", amount: 16000 },
  ];

  //클래스를 객체로 바꿀때 가장 빨리 실행되는 함수
  constructor(props) {
    super(props);
    this.state = {
      expenses: [
        { id: 1, charge: "렌트비", amount: 1600 },
        { id: 2, charge: "교통비", amount: 1800 },
        { id: 3, charge: "식비", amount: 16000 },
      ],
    };
  }

  // 리스트 item 지우는 함수
  handleDelete = (id) => {
    // 받아온 id 값이랑 전체 id(expense.id) 값이랑 다른걸 삭제하고 남은 아이템 다른 배열에 생성
    const newExpenses = this.state.expenses.filter(
      (expense) => expense.id !== id
    );
    console.log("clicked");
    console.log(newExpenses);

    // state를 updata를 해주려면 setState 함수를 쓰면됨
    this.setState({
      expenses: newExpenses,
    });
  };

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
          {/* props로 내려주기 클래스니까 this */}
          <ExpenseList
            expenses={this.state.expenses}
            handleDelete={this.handleDelete}
          />
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
