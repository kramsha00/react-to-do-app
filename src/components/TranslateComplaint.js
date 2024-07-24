import React, { useState } from 'react';
import { TextField, Button, Paper, Box, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

function TranslateComplaint() {
	const [complaintText, setComplaintText] = useState('');
	const [sourceLanguage, setSourceLanguage] = useState('en');
	const [targetLanguage, setTargetLanguage] = useState('es');
	const [translatedText, setTranslatedText] = useState('');

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

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', height: '80vh', maxWidth: '600px', margin: '0', padding: 2 }}>
			<Paper sx={{ padding: 2 }}>
				<Typography variant="h5" gutterBottom>Translate Complaint</Typography>
				<TextField
					fullWidth
					multiline
					rows={4}
					variant="outlined"
					placeholder="Enter complaint text"
					value={complaintText}
					onChange={(e) => setComplaintText(e.target.value)}
					sx={{ marginBottom: 2 }}
				/>
				<FormControl fullWidth sx={{ marginBottom: 2 }}>
					<InputLabel id="source-language-label">Source Language</InputLabel>
					<Select
						labelId="source-language-label"
						value={sourceLanguage}
						onChange={(e) => setSourceLanguage(e.target.value)}
						label="Source Language"
					>
						<MenuItem value="en">English</MenuItem>
						<MenuItem value="ar">Arabic</MenuItem>
						<MenuItem value="ur">Urdu</MenuItem>
						{/* Add more languages as needed */}
					</Select>
				</FormControl>
				<FormControl fullWidth sx={{ marginBottom: 2 }}>
					<InputLabel id="target-language-label">Target Language</InputLabel>
					<Select
						labelId="target-language-label"
						value={targetLanguage}
						onChange={(e) => setTargetLanguage(e.target.value)}
						label="Target Language"
					>
						<MenuItem value="en">English</MenuItem>
						<MenuItem value="ar">Arabic</MenuItem>
						<MenuItem value="ur">Urdu</MenuItem>
						{/* Add more languages as needed */}
					</Select>
				</FormControl>
				<Button variant="contained" color="primary" onClick={translateText} sx={{ marginBottom: 2 }}>
					Translate
				</Button>
				{translatedText && (
					<Typography variant="body1" sx={{ backgroundColor: '#f0f0f0', padding: 2, borderRadius: 1 }}>
						{translatedText}
					</Typography>
				)}
			</Paper>
		</Box>
	);
}

export default TranslateComplaint;
