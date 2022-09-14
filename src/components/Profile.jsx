import React from 'react'
import { useState, useEffect } from 'react'
import SingleAnswer from './SingleAnswer'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './Profile.css'



export default function Profile(props) {

    let navigate = useNavigate();

    if (props.loggedIn === false){
        props.flashMessage('You need to be logged in to see your profile!', 'warning')
        navigate('/')
    }

	const [myPosts, setMyPosts] = useState([])
    const [shouldFetchUser, setShouldFetchUser] = useState(false)
    const [userData, setUserData] = useState([])
    

	useEffect(() => {

        const fetchAnswers = async () => {
            let token = localStorage.getItem('token')

            let myHeaders = new Headers();
            myHeaders.append('Authorization', "Bearer " + token);
            myHeaders.append('Content-Type', 'application/json');

            await fetch('http://localhost:5000/api/answers_by_user', {
                method: 'GET',
                headers: myHeaders
            })
                .then(res => res.json())
                .then(data => {
                    setMyPosts(data)
                    setShouldFetchUser(true)
                })
            }
        fetchAnswers()
    }, [])   

    useEffect(() => {
        if (shouldFetchUser){
        
        const fetchUser = async () => {
            let token = localStorage.getItem('token')

            let myHeaders = new Headers();
            myHeaders.append('Authorization', "Bearer " + token);
            myHeaders.append('Content-Type', 'application/json');

            await fetch(`http://localhost:5000/api/users/${myPosts[0]["user_id"]}`, {
                method: 'GET',
                headers: myHeaders
            })
                .then(res => res.json())
                .then(data => {
                    localStorage.setItem('username', data.username)
                    setUserData(data)
                })
        }
        fetchUser();
        }
        setShouldFetchUser(false)
    }, [shouldFetchUser])

    console.log(userData, "userdata")




    return (
		<>
            <div className='pt-3 d-flex justify-content-center'>
                {/* <button className='btn btn-warning me-4'><Link to="/profile">my games</Link></button> */}
                <button className='btn btn-warning'><Link to="/landing">play</Link></button>
            </div>
            <hr />
            
            <div className='d-flex justify-content-between'>
                <div className='w-25 me-5'>
                    <h3>{userData.username}</h3>
                    <h5>{userData.email}</h5>
                    <button className='btn btn-warning btn-sm mt-2' onClick={() => (navigate('/editForm', { state: {id: userData.id, email: userData.email, username: userData.username, first_name: userData.first_name, last_name: userData.last_name}}))}>edit profile</button>
                    <div className='games mt-2'>my games - {userData.answers?.length}</div>
                    <hr />
                </div>
                <div className='w-75'>
                <div className='text-center games-title'>my games</div>
                <hr />
			    {myPosts.map((post, i) => <SingleAnswer key={i} post={post} setMyPosts={setMyPosts} />)}
                </div>
            </div>
		</>
    )
}
