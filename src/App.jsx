import logo from "./logo.svg";
import "./App.css";
import Component from "./Component";

function App() {

	const someTestStyle = {
		background : 'cyan',
		color: 'black',
		fontSize: '30px',
		fontWeight: 'bold',
		padding: '10px'
	}

	return (
		<div className="App">
			<header className="App-header">
				<Component name='Ramsha' />
				<img src={logo} className="App-logo" alt="logo" />
				<h5>This is my to-do list project to learn react from Laracasts</h5>
				<p style={someTestStyle}>some work to do</p>
				<span style={{background: 'blue', padding: '10px'}}>some more testing</span>
			</header>
		</div>
	);
}

export default App;
