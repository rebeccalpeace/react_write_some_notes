import './App.css';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Rules from './components/Rules';
import AlertMessage from './components/AlertMessage';

function App(props) {

	const now = new Date();
	const [username, setUsername] = useState(null);
	const [message, setMessage] = useState(null);
	const [category, setCategory] = useState(null);
	const [loggedIn, setLoggedIn] = useState((localStorage.getItem('token') && new Date(localStorage.getItem('expiration')) > now) ? true : false);

	const flashMessage = (message, category) => {
		setMessage(message);
		setCategory(category);
	}

	const verifyUser = (username) => {
		setUsername(username);
	}

	const login = () => {
		setLoggedIn(true)
	}

	const logout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('expiration');
		setLoggedIn(false)
	}


	return (
		<>
			<Navbar loggedIn={loggedIn} logout={logout} login={login} flashMessage={flashMessage} username={username} verifyUser={verifyUser}/>
			<div className="container">
				{message ? <AlertMessage message={message} category={category} flashMessage={flashMessage} /> : null}
				<Routes>
					<Route path="/" element={<Home loggedIn={loggedIn} />} />
					<Route path="/register" element={<Register flashMessage={flashMessage} />} />
					<Route path="/login" element={<Login />} />
					<Route path="/rules" element={<Rules />} />
				</Routes>
			</div>

		</>
	);
}

export default App;
