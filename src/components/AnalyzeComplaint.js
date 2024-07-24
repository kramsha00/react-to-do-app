import React, { useState } from 'react';
import { TextField, Button, Paper, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

function AnalyzeComplaint() {
	const [complaintText, setComplaintText] = useState('');
	const [analysisResult, setAnalysisResult] = useState(null);
	const [summarizedText, setSummarizedText] = useState('');
	const [error, setError] = useState('');

	const analyzeText = async () => {
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
			console.error('Error analyzing text:', error);
		}
	};

	const summarizeText = async () => {
		try {
			const response = await fetch('http://localhost:3005/summarize', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ text: complaintText }),
			});
			const data = await response.json();
			setSummarizedText(data.summary);
		} catch (error) {
			console.error('Error summarizing text:', error);
			setError('Failed to summarize text');
		}
	};

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', padding: 2 }}>
			<Paper sx={{ padding: 2, width: '100%', maxWidth: '50vw' }}>
				<Typography variant="h5" gutterBottom>
					Analyze Complaint
				</Typography>
				<TextField
					label="Enter complaint text"
					multiline
					rows={6}
					fullWidth
					variant="outlined"
					value={complaintText}
					onChange={(e) => setComplaintText(e.target.value)}
					sx={{ marginBottom: 2 }}
				/>
				<Box sx={{ display: 'flex', gap: 1 }}>
					<Button variant="contained" color="primary" onClick={analyzeText} >
						Analyze
					</Button>
					<Button variant="contained" sx={{
						backgroundColor: '#11bda8',
						'&:hover': {
							backgroundColor: '#0f9a8d', // Optional: Adjust hover color
						},
						color: '#fff', // Optional: Set text color to white
					}} onClick={summarizeText} >
						Summarize
					</Button>
				</Box>
				{analysisResult && (
					<Box sx={{ marginTop: 2 }}>
						<Typography variant="h6" gutterBottom>
							Analysis Result
						</Typography>
						<Typography variant="body1" gutterBottom>
							<strong>Sentiment:</strong> <span style={{ fontWeight: 'bold', color: getColorBySentiment(analysisResult.sentiment?.ResultList?.[0]?.Sentiment) }}>{analysisResult.sentiment?.ResultList?.[0]?.Sentiment}</span>
						</Typography>
						<Box sx={{ marginTop: 2 }}>
							<Typography variant="body1" gutterBottom>
								<strong>Entities:</strong>
							</Typography>
							<TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
								<Table sx={{ '& td, & th': { padding: '4px 8px' } }}>
									<TableHead>
										<TableRow>
											<TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>Type</TableCell>
											<TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>Entity</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{analysisResult.entities?.ResultList?.[0]?.Entities.reduce((acc, entity) => {
											if (!acc[entity.Type]) {
												acc[entity.Type] = [];
											}
											acc[entity.Type].push(entity.Text);
											return acc;
										}, {}) && Object.keys(analysisResult.entities?.ResultList?.[0]?.Entities.reduce((acc, entity) => {
											if (!acc[entity.Type]) {
												acc[entity.Type] = [];
											}
											acc[entity.Type].push(entity.Text);
											return acc;
										}, {})).map((type, index) => (
											<React.Fragment key={index}>
												{analysisResult.entities?.ResultList?.[0]?.Entities.filter(entity => entity.Type === type).map((entity, idx) => (
													<TableRow key={idx}>
														<TableCell sx={{ fontSize: '0.875rem' }}>{type}</TableCell>
														<TableCell sx={{ fontSize: '0.875rem' }}>{entity.Text}</TableCell>
													</TableRow>
												))}
											</React.Fragment>
										))}
									</TableBody>
								</Table>
							</TableContainer>
						</Box>
						{/*<Typography variant="body1" gutterBottom>*/}
						{/*	<Box sx={{ marginTop: 1 }}>*/}
						{/*		<strong>Key Phrases: </strong>*/}
						{/*		{analysisResult.keyPhrases?.ResultList?.[0]?.KeyPhrases?.map((phrase, index) => (*/}
						{/*			<span key={index} style={{ marginRight: 4 }}>{phrase.Text}, </span>*/}
						{/*		))}*/}
						{/*	</Box>*/}
						{/*</Typography>*/}
					</Box>
				)}
				{summarizedText && (
					<Box sx={{ marginTop: 2 }}>
						<Typography variant="body1" gutterBottom>
							<strong>Summary:</strong> <span>{summarizedText}</span>
						</Typography>
					</Box>
				)}
				{error && (
					<Typography variant="body2" color="error" sx={{ marginTop: 2 }}>
						{error}
					</Typography>
				)}
			</Paper>
		</Box>
	);
}

const getColorBySentiment = (sentiment) => {
	switch (sentiment) {
		case 'POSITIVE':
			return '#4caf50'; // Green
		case 'NEGATIVE':
			return '#f44336'; // Red
		case 'MIXED':
			return '#2196f3'; // Blue
		case 'NEUTRAL':
			return '#9e9e9e'; // Grey
		default:
			return '#000'; // Black
	}
};

export default AnalyzeComplaint;
