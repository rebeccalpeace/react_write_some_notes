import './App.css';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Rules from './components/Rules';
import AlertMessage from './components/AlertMessage';
import Landing from './components/Landing';
import Profile from './components/Profile';
import DailyPromptCard from './components/DailyPromptCard';
import RandomPromptCard from './components/RandomPromptCard';
import PlayRandom from './components/PlayRandom';
import PlayDaily from './components/PlayDaily';
import WordsForm from './components/WordsForm';
import CreateWord from './components/CreateWord';

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
		console.log('logging out')
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
					<Route path="/landing" element={<Landing />} />
					<Route path="/profile" element={<Profile />} />
					<Route path='/daily' element={<DailyPromptCard />} />
					<Route path='/random' element={<RandomPromptCard />} />
					<Route path='/playDaily' element={<PlayDaily />} />
					<Route path='/playRandom' element={<PlayRandom />} />
					<Route path='/wordsForm' element={<WordsForm />} />
					<Route path='/createWord' element={<CreateWord />} />
				</Routes>
			</div>

		</>
	);
}

export default App;
