import logo from "./logo.svg";
import "./App.css";
import Component from "./Component";
import { useState } from "react";
import React from "react";

function App() {
  const someTestStyle = {
    background: "cyan",
    color: "black",
    fontSize: "30px",
    fontWeight: "bold",
    padding: "10px",
  };

  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "Learn react",
      isComplete: false,
    },
    {
      id: 2,
      title: "Go grocery",
      isComplete: true,
    },
    {
      id: 3,
      title: "Iron uniform",
      isComplete: false,
    },
  ]);

  const [todoInput, setTodoInput] = useState("");

  const [todoId, setTodoId] = useState(4);

  function addTodo(event) {
    event.preventDefault();

    if (todoInput.trim().length === 0) {
      alert("Todo can't be empty");
      return;
    }

    setTodos([
      ...todos,
      {
        id: todoId,
        title: todoInput,
        isComplete: false,
      },
    ]);

    setTodoInput("");
    setTodoId((prevTodoId) => prevTodoId + 1);
  }

  function handleInput(event) {
    setTodoInput(event.target.value);
  }

  function deleteTodo(id) {
    console.log('deleting', id);
    setTodos([...todos].filter(todo => todo.id !== id))
  }

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        <form action="#" onSubmit={addTodo}>
          <input
            type="text"
            className="todo-input"
            value={todoInput}
            placeholder="What do you need to do?"
            onChange={handleInput}
          />
        </form>

        <ul className="todo-list">
          {todos.map((todo, index) => (
            <li key={todo.id} className="todo-item-container">
              <div className="todo-item">
                <input type="checkbox" />
                <span className="todo-item-label">
                  {index} - {todo.title}
                </span>
                {/* <input type="text" className="todo-item-input" value="Finish React Series" /> */}
              </div>
              <button onClick={() => deleteTodo(todo.id)} className="x-button">
                <svg
                  className="x-button-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </li>
          ))}
        </ul>
        <div className="check-all-container">
          <div>
            <div className="button">Check All</div>
          </div>
          <span>3 items remaining</span>
        </div>
        <div className="other-buttons-container">
          <div>
            <button className="button filter-button filter-button-active">
              All
            </button>
            <button className="button filter-button">Active</button>
            <button className="button filter-button">Completed</button>
          </div>
          <div>
            <button className="button">Clear completed</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

// return (
//   <div className="App">
//     <header className="App-header">
//       <Component name="Ramsha" />
//       <img src={logo} className="App-logo" alt="logo" />
//       <h5>This is my to-do list project to learn react from Laracasts</h5>
//       <p style={someTestStyle}>some work to do</p>
//       <span style={{ background: "blue", padding: "10px" }}>
//         some more testing
//       </span>
//     </header>
//   </div>
// );
