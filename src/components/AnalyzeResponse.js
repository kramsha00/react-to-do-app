import React, { useState } from 'react';
import { TextField, Paper, Typography, Box } from '@mui/material';

function AnalyzeResponse() {
	const [responseText, setResponseText] = useState('');
	const [responseError, setResponseError] = useState('');

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
		<Box sx={{ display: 'flex', flexDirection: 'column', padding: 2 }}>
			<Paper sx={{ padding: 2, width: '100%', maxWidth: 600 }}>
				<Typography variant="h5" gutterBottom>
					Analyze Response
				</Typography>
				<TextField
					label="Response Text"
					multiline
					rows={4}
					variant="outlined"
					fullWidth
					value={responseText}
					onChange={handleResponseChange}
					error={Boolean(responseError)}
					helperText={responseError}
					sx={{ marginBottom: 2 }}
				/>
			</Paper>
		</Box>
	);
}

export default AnalyzeResponse;
