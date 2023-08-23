import logo from "./logo.svg";
import "./App.css";
import { Component, useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import { MachineLearning } from "aws-sdk";
import ExpenseList from "./components/ExpenseList";
import Alert from "./components/Alert";
import userEvent from "@testing-library/user-event";

const App = () => {
  const [expenses, setExpenses] = useState([
    { id: 1, charge: "렌트비", amount: 1600 },
    { id: 2, charge: "교통비", amount: 1800 },
    { id: 3, charge: "식비", amount: 16000 },
  ]);

  const [charge, setCharge] = useState("");
  const [amount, setAmount] = useState(0);

  // 수정을 위한 속성
  const [edit, setEdit] = useState(false);
  // 어떠한 것을 눌렀는지 기억
  const [id, setId] = useState("");

  const [alert, setAlert] = useState({ show: false, type: " ", text: " " });

  const clearItems = () => {
    expenses([]);
  };

  // 제출 시 알람
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type: type, text: text });
    setTimeout(() => {
      setAlert({ show: false, type: " ", text: " " });
    }, 5000);
  };

  const handleEdit = (id) => {
    const expense = expenses.find((item) => item.id === id);
    setCharge(expense.charge);
    setAmount(expense.amount);
    setEdit(true);
    setId(id);
  };

  //타이핑하는 값 받아오기
  const handleCharge = (event) => {
    console.log(event.target.value);
    setCharge(event.target.value); //타이핑 할 때마다 charge 값 변경
  };

  const handleAmount = (event) => {
    setAmount(event.target.valueAsNumber); //target 값 Number로 변경
  };

  // submit 함수
  const handleSubmit = (event) => {
    event.preventDefault(); //페이지 새로고침 방지(state 초기화방지)

    if (charge !== "" && amount > 0) {
      // expenses state에 새로운 객체 만들어서 추가, state 업데이트
      // state update 할 때는 불변성 지키기 = 이전에 있던 값을 건드리면 안됨
      // 새로운 값을 만들어서 교체

      if (edit) {
        const newExpenses = expenses.map((item) => {
          // 원래 id랑 클릭한 것에 대한 아이디
          return item.id === id
            ? { ...item, charge: charge, amount: amount }
            : item;
        });

        setExpenses(newExpenses);
        setEdit(false);
        handleAlert({ type: "success", text: "아이템이 수정되었습니다." });
      } else {
        // 새로운 객체 생성
        const newExpense = { id: crypto.randomUUID(), charge: charge, amount }; //속성이랑 속성 값이 같으면 하나로 줄일 수 있음 charge를 amount 처럼
        // 원래 객체, 새로운 객체 추가
        const newExpenses = [newExpense, ...expenses]; //얉은 복사

        setExpenses(newExpenses);

        //값 초기화

        handleAlert({ type: "success", text: "아이템이 생성되었습니다." });
      }

      setCharge("");
      setAmount("");
    } else {
      console.log("값을 입력해주세요.");
      handleAlert({ type: "danger", text: "값을 입력해주세요." });
    }
  };

  // 리스트 item 지우는 함수
  const handleDelete = (id) => {
    // 받아온 id 값이랑 전체 id(expense.id) 값이랑 다른걸 삭제하고 남은 아이템 다른 배열에 생성
    const newExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(newExpenses);
    // // state를 update를 해주려면 setState 함수를 쓰면됨
    // this.setState({
    //   expenses: newExpenses,
    // });
  };
  return (
    <main className="main-container">
      {alert.show ? <Alert type={alert.type} text={alert.text} /> : null}

      <h1>예산 계산기</h1>

      <div style={{ width: "100%", backgroundColor: "white", padding: "1rem" }}>
        {/* Expense Form */}
        {/* 컴포넌트 사용 */}
        <ExpenseForm
          handleCharge={handleCharge}
          charge={charge}
          handleAmount={handleAmount}
          amount={amount}
          handleSubmit={handleSubmit}
          edit={edit}
        />
      </div>

      <div style={{ width: "100%", backgroundColor: "white", padding: "1rem" }}>
        {/* Expense list */}
        {/* props로 내려주기 클래스니까 this */}
        <ExpenseList
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems}
        />
      </div>

      <div
        style={{ display: "flex", justifyContent: "end", marginTop: "1rem" }}
      >
        <p style={{ fontSize: "2rem" }}>
          총 지출 :
          <span>
            {expenses.reduce((acc, curr) => {
              return (acc += curr.amount);
            }, 0)}{" "}
            원
          </span>
        </p>
      </div>
    </main>
  );
};

export default App;
