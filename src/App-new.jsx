import "./App.css";
import { useState } from "react";
import React from "react";

function App() {
	const [complaintText, setComplaintText] = useState('');
	const [responseText, setResponseText] = useState('');
	const [analysisResult, setAnalysisResult] = useState(null);
	const [sourceLanguage, setSourceLanguage] = useState('en');
	const [targetLanguage, setTargetLanguage] = useState('es');
	const [translatedText, setTranslatedText] = useState('');
	const [responseError, setResponseError] = useState('');

	const analyzeComplaint = async () => {
		try {
			const response = await fetch('http://localhost:3005/analyze', {
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

	const translateText = async () => {
		try {
			const response = await fetch('http://localhost:3005/translate', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ text: complaintText, source: sourceLanguage, target: targetLanguage }),
			});
			const data = await response.json();
			setTranslatedText(data.translatedText);
		} catch (error) {
			console.error('Error translating text:', error);
		}
	};

	const analyzeResponse = async () => {
		try {
			console.log("translating")
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

	const checkResponseQuality = (text) => {
		const keywords = [
			'sorry', 'apologize', 'understand', 'appreciate', 'thank you', 'concerned', 'care', 'hope', 'sorry for any inconvenience',
			'resolve', 'fix', 'address', 'solution', 'action', 'improve', 'investigate', 'implement', 'plan',
			'follow-up', 'update', 'check back', 'keep you informed', 'contact', 'reach out', 'let you know',
			'clearly', 'precisely', 'detailed', 'explain', 'clarify', 'specify',
			'assure', 'guarantee', 'committed', 'ensure', 'confirm', 'promise',
			'feedback', 'improvement', 'suggestion', 'learn', 'enhance'
		];
		const hasKeyword = keywords.some(keyword => text.toLowerCase().includes(keyword));

		if (!hasKeyword) {
			setResponseError('The response seems to be of low quality.');
		} else {
			setResponseError('');
		}
	};

	const handleResponseChange = (event) => {
		const text = event.target.value;
		setResponseText(text);
		checkResponseQuality(text);
	};

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
			<div style={{ marginBottom: '2rem'}}>
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
				{analysisResult && (
					<div style={{ marginBottom: '2rem' }}>
						<h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Analysis</h2>
						<p style={{ marginBottom: '0.5rem' }}>
							Sentiment: <span style={{ fontWeight: 'bold' }}>{analysisResult.sentiment.ResultList[0].Sentiment}</span>
						</p>
						<h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
							Entities:
						</h3>
						{analysisResult.entities.ResultList[0].Entities.map((entity, index) => (
							<span key={index} style={{ marginBottom: '0.5rem' }}>
                            {entity.Text},
                        </span>
						))}
						<h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
							Key Phrases:
						</h3>
						{analysisResult.keyPhrases.ResultList[0].KeyPhrases.map((phrase, index) => (
							<span key={index} style={{ marginBottom: '0.5rem' }}>
                            {phrase.Text},
                        </span>
						))}
					</div>
				)}
				<div style={{ marginTop: '2rem' }}>
					<h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Translate Complaint</h2>
					<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
						<select value={sourceLanguage} onChange={(e) => setSourceLanguage(e.target.value)}>
							<option value="en">English</option>
							<option value="ar">Arabic</option>
							<option value="ur">Urdu</option>
							{/* Add more languages as needed */}
						</select>
						<select value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)}>
							<option value="en">English</option>
							<option value="ar">Arabic</option>
							<option value="ur">Urdu</option>
							{/* Add more languages as needed */}
						</select>
					</div>
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
						onClick={translateText}
					>
						Translate
					</button>
					{translatedText && (
						<div style={{ marginTop: '1rem' }}>
							<h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Translated Text:</h3>
							<p>{translatedText}</p>
						</div>
					)}
				</div>
			</div>
			<hr />
			<div style={{ marginBottom: '2rem' , marginTop: '2rem' }}>
				<h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Response</h2>
				<textarea
					style={{
						width: '100%',
						height: '150px',
						padding: '1rem',
						fontSize: '1rem',
						border: `1px solid ${responseError ? 'red' : '#ccc'}`,
						borderRadius: '4px',
						resize: 'vertical',
					}}
					value={responseText}
					onChange={handleResponseChange}
				></textarea>
				{responseError && (
					<p style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.5rem' }}>
						{responseError}
					</p>
				)}
				{/*<button*/}
				{/*    style={{*/}
				{/*        display: 'block',*/}
				{/*        width: '100%',*/}
				{/*        padding: '0.75rem 1.5rem',*/}
				{/*        fontSize: '1rem',*/}
				{/*        fontWeight: 'bold',*/}
				{/*        color: '#fff',*/}
				{/*        backgroundColor: '#4CAF50',*/}
				{/*        border: 'none',*/}
				{/*        borderRadius: '4px',*/}
				{/*        cursor: 'pointer',*/}
				{/*        transition: 'background-color 0.3s ease',*/}
				{/*        marginTop: '1rem',*/}
				{/*    }}*/}
				{/*    onClick={analyzeResponse}*/}
				{/*>*/}
				{/*    Analyze Response*/}
				{/*</button>*/}
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
