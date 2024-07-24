import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
	return (
		<div className="sidebar">
			<nav>
				<ul>
					<li>
						<Link to="/">Analyze Complaint</Link>
					</li>
					<li>
						<Link to="/translate">Translate Complaint</Link>
					</li>
					<li>
						<Link to="/analyze-response">Analyze Response</Link>
					</li>
					<li>
						<Link to="/faqs">FAQs Chatbot</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
}

export default Sidebar;
