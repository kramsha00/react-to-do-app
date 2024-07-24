import React, { useState } from 'react';
import { TextField, IconButton, Paper, Box, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

function Chatbot() {
	const [question, setQuestion] = useState('');
	const [messages, setMessages] = useState([]);

	const handleSend = async () => {
		if (question.trim() === '') return;

		// Add user's question to chat
		const userMessage = { text: question, isUser: true };
		setMessages([...messages, userMessage]);
		setQuestion('');

		try {
			const response = await fetch('http://localhost:3005/chatbot', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ question }),
			});
			const data = await response.json();

			// Add the chatbot's response to chat
			const botMessage = { text: data.answer, isUser: false };
			setMessages([...messages, userMessage, botMessage]);
		} catch (error) {
			console.error('Error:', error);
			// Handle error here (e.g., show an error message)
		}
	};

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', padding: 2 }}>
			<Paper sx={{ padding: 2, width: '100%', maxWidth: 600 }}>
				<Typography variant="h5" gutterBottom>
					FAQs Chatbot
				</Typography>
				<Paper sx={{ marginBottom: 2, height: '60vh', overflowY: 'auto' , boxShadow: 'none'}}>
					{messages.map((msg, index) => (
						<Box
							key={index}
							sx={{
								display: 'flex',
								justifyContent: msg.isUser ? 'flex-end' : 'flex-start',
								marginBottom: 1,
							}}
						>
							<Typography
								sx={{
									padding: 1,
									borderRadius: 2,
									backgroundColor: msg.isUser ? '#11bda8' : '#e0e0e0',
									color: msg.isUser ? '#1a1919' : '#000',
									maxWidth: '75%',
									wordBreak: 'break-word',
									fontSize: '0.875rem',
								}}
							>
								{msg.text}
							</Typography>
						</Box>
					))}
				</Paper>
				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					<TextField
						fullWidth
						variant="outlined"
						placeholder="Type your question..."
						value={question}
						onChange={(e) => setQuestion(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								handleSend();
								e.preventDefault();
							}
						}}
					/>
					<IconButton color="primary" onClick={handleSend}>
						<SendIcon />
					</IconButton>
				</Box>
			</Paper>
		</Box>
	);
}

export default Chatbot;
