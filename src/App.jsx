import './App.css';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Rules from './components/Rules';
import AlertMessage from './components/AlertMessage';
import Profile from './components/Profile';
import DailyPromptCard from './components/DailyPromptCard';
import RandomPromptCard from './components/RandomPromptCard';
import PlayDaily from './components/PlayDaily';
import SavedAnswer from './components/SavedAnswer';
import SingleAnswer from './components/SingleAnswer';
import DeleteButton from './components/DeleteButton';
import AllDaily from './components/AllDaily';
import AllRandom from './components/AllRandom';
import GetUsername from './components/GetUsername';
import EditForm from './components/EditForm';



function App(props) {

	const now = new Date();
	const [username, setUsername] = useState(localStorage.getItem('username'));
	const [message, setMessage] = useState(null);
	const [category, setCategory] = useState(null);
	const [loggedIn, setLoggedIn] = useState((localStorage.getItem('token') && new Date(localStorage.getItem('expiration')) > now) ? true : false);
	const [myPosts, setMyPosts] = useState([])
	const [alertVisible, setAlertVisible] = useState(false)
	const [dailyId, setDailyId] = useState(localStorage.getItem('daily'));

	const flashMessage = (message, category) => {
		setMessage(message);
		setCategory(category);
		setAlertVisible(true);

		setTimeout(() => {
			setAlertVisible(false);
		}, 2000);
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
		localStorage.removeItem('username')
		localStorage.removeItem('daily')
		setLoggedIn(false)
		console.log('logging out')
	}


	return (
		<>
			<Navbar loggedIn={loggedIn} logout={logout} login={login} flashMessage={flashMessage} username={username} verifyUser={verifyUser}/>
			<div className="container">
				{message ? <AlertMessage message={message} category={category} alertVisible={alertVisible} setAlertVisible={setAlertVisible} flashMessage={flashMessage} /> : null}
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/register" element={<Register flashMessage={flashMessage} login={login} verifyUser={verifyUser} loggedIn={loggedIn} username={username} setUsername={setUsername} />} />
					<Route path="/login" element={<Login />} />
					<Route path="/rules" element={<Rules />} />
					<Route path="/profile" element={<Profile myPosts={myPosts} setMyPosts={setMyPosts} loggedIn={loggedIn} flashMessage={flashMessage} username={username} dailyId={dailyId} setDailyId={setDailyId} />} />
					<Route path='/daily' element={<DailyPromptCard loggedIn={loggedIn} dailyId={dailyId} setDailyId={setDailyId} />} />
					<Route path='/random' element={<RandomPromptCard />} />
					<Route path='/playDaily' element={<PlayDaily flashMessage={flashMessage} dailyId={dailyId} setDailyId={setDailyId}/>} />
					<Route path='/savedAnswer' element={<SavedAnswer />} />
					<Route path='/singleAnswer' element={<SingleAnswer />} />
					<Route path='/deleteButton' element={<DeleteButton />} />
					<Route path='/allDaily' element={<AllDaily />} />
					<Route path='/allRandom' element={<AllRandom />} />
					<Route path='/getUsername' element={<GetUsername />} />
					<Route path='/editForm' element={<EditForm flashMessage={flashMessage} setUsername={setUsername} />} />

				</Routes>
			</div>

		</>
	);
}

export default App;
