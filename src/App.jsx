import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { CssBaseline, Box, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText } from '@mui/material';
import AnalyzeComplaint from './components/AnalyzeComplaint';
import TranslateComplaint from './components/TranslateComplaint';
import AnalyzeResponse from './components/AnalyzeResponse';
import ChatBot from "./components/Chatbot";

const drawerWidth = 240;

function App() {
    return (
        <Router>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    sx={{
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                        backgroundColor: 'gray',
                    }}
                >
                    <Toolbar>
                        <Typography variant="h6"  noWrap>
                            Tawasul Demo
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                    }}
                >
                    <Toolbar />
                    <Box sx={{ overflow: 'auto' }}>
                        <List>
                            <ListItem button component={Link} to="/">
                                <ListItemText primary="Analyze Complaint" />
                            </ListItem>
                            <ListItem button component={Link} to="/translate">
                                <ListItemText primary="Translate Complaint" />
                            </ListItem>
                            <ListItem button component={Link} to="/analyze-response">
                                <ListItemText primary="Analyze Response" />
                            </ListItem>
                            <ListItem button component={Link} to="/faqs">
                                <ListItemText primary="FAQs Chatbot" />
                            </ListItem>
                        </List>
                    </Box>
                </Drawer>
                <Box
                    component="main"
                    sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3}}
                >
                    <Toolbar />
                    <Routes>
                        <Route path="/" element={<AnalyzeComplaint />} />
                        <Route path="/translate" element={<TranslateComplaint />} />
                        <Route path="/analyze-response" element={<AnalyzeResponse />} />
                        <Route path="/faqs" element={<ChatBot />} />
                    </Routes>
                </Box>
            </Box>
        </Router>
    );
}

export default App;
