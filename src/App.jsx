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

//   return (
//     <div className="todo-app-container">
//       <div className="todo-app">
//         <h2>Todo App</h2>
//         <form action="#" onSubmit={addTodo}>
//           <input
//             type="text"
//             className="todo-input"
//             value={todoInput}
//             placeholder="What do you need to do?"
//             onChange={handleInput}
//           />
//         </form>
//
//         <ul className="todo-list">
//           {todos.map((todo, index) => (
//             <li key={todo.id} className="todo-item-container">
//               <div className="todo-item">
//                 <input type="checkbox" />
//                 <span className="todo-item-label">
//                   {index} - {todo.title}
//                 </span>
//                 {/* <input type="text" className="todo-item-input" value="Finish React Series" /> */}
//               </div>
//               <button onClick={() => deleteTodo(todo.id)} className="x-button">
//                 <svg
//                   className="x-button-icon"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               </button>
//             </li>
//           ))}
//         </ul>
//         <div className="check-all-container">
//           <div>
//             <div className="button">Check All</div>
//           </div>
//           <span>3 items remaining</span>
//         </div>
//         <div className="other-buttons-container">
//           <div>
//             <button className="button filter-button filter-button-active">
//               All
//             </button>
//             <button className="button filter-button">Active</button>
//             <button className="button filter-button">Completed</button>
//           </div>
//           <div>
//             <button className="button">Clear completed</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

  const [complaintText, setComplaintText] = useState('');
  const [responseText, setResponseText] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);

  const analyzeComplaint = async () => {
    try {
      const response = await fetch('http://localhost:3000/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: complaintText }),
      });
      const data = await response.json();
      setAnalysisResult(data);
    } catch (error) {
      console.error('Error analyzing complaint:', error);
    }
  };

  const analyzeResponse = async () => {
    try {
      const response = await fetch('/api/analyze-response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: responseText }),
      });
      const data = await response.json();
      setAnalysisResult(data);
    } catch (error) {
      console.error('Error analyzing response:', error);
    }
  };

  // return (
  //     <div>
  //       <h1>Complaint Management System</h1>
  //       <div>
  //         <h2>Complaint</h2>
  //         <textarea
  //             value={complaintText}
  //             onChange={(e) => setComplaintText(e.target.value)}
  //         ></textarea>
  //         <button onClick={analyzeComplaint}>Analyze Complaint</button>
  //       </div>
  //       <div>
  //         <h2>Response</h2>
  //         <textarea
  //             value={responseText}
  //             onChange={(e) => setResponseText(e.target.value)}
  //         ></textarea>
  //         <button onClick={analyzeResponse}>Analyze Response</button>
  //       </div>
  //       {analysisResult && (
  //           <div>
  //             <h2>Analysis</h2>
  //             <p>Sentiment: {analysisResult.sentiment.ResultList[0].Sentiment}</p>
  //             <h3>Key Phrases:</h3>
  //             <ul>
  //               {analysisResult.keyPhrases.ResultList[0].KeyPhrases.map((phrase, index) => (
  //                   <li key={index}>{phrase.Text}</li>
  //               ))}
  //             </ul>
  //             <h3>Entities:</h3>
  //             <ul>
  //               {analysisResult.entities.ResultList[0].Entities.map((entity, index) => (
  //                   <li key={index}>{entity.Text}</li>
  //               ))}
  //             </ul>
  //           </div>
  //       )}
  //     </div>
  // );

  return (
      <div
          style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '2rem',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
      >
        <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Complaint Management System</h1>
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Complaint</h2>
          <textarea
              style={{
                width: '100%',
                height: '150px',
                padding: '1rem',
                fontSize: '1rem',
                border: '1px solid #ccc',
                borderRadius: '4px',
                resize: 'vertical',
              }}
              value={complaintText}
              onChange={(e) => setComplaintText(e.target.value)}
          ></textarea>
          <button
              style={{
                display: 'block',
                width: '100%',
                padding: '0.75rem 1.5rem',
                fontSize: '1rem',
                fontWeight: 'bold',
                color: '#fff',
                backgroundColor: '#4CAF50',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
              }}
              onClick={analyzeComplaint}
          >
            Analyze Complaint
          </button>
        </div>
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Response</h2>
          <textarea
              style={{
                width: '100%',
                height: '150px',
                padding: '1rem',
                fontSize: '1rem',
                border: '1px solid #ccc',
                borderRadius: '4px',
                resize: 'vertical',
              }}
              value={responseText}
              onChange={(e) => setResponseText(e.target.value)}
          ></textarea>
          <button
              style={{
                display: 'block',
                width: '100%',
                padding: '0.75rem 1.5rem',
                fontSize: '1rem',
                fontWeight: 'bold',
                color: '#fff',
                backgroundColor: '#4CAF50',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
              }}
              onClick={analyzeResponse}
          >
            Analyze Response
          </button>
        </div>
        {analysisResult && (
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Analysis</h2>
              <p style={{ marginBottom: '0.5rem' }}>
                Sentiment: <span style={{ fontWeight: 'bold' }}>{analysisResult.sentiment.ResultList[0].Sentiment}</span>
              </p>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
                Key Phrases:
              </h3>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {analysisResult.keyPhrases.ResultList[0].KeyPhrases.map((phrase, index) => (
                    <li key={index} style={{ marginBottom: '0.5rem' }}>
                      {phrase.Text}
                    </li>
                ))}
              </ul>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
                Entities:
              </h3>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {analysisResult.entities.ResultList[0].Entities.map((entity, index) => (
                    <li key={index} style={{ marginBottom: '0.5rem' }}>
                      {entity.Text}
                    </li>
                ))}
              </ul>
            </div>
        )}
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
