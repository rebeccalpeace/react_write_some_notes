import React from 'react'
import { useState, useEffect } from 'react'
import SingleAnswer from './SingleAnswer'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './Profile.css'



export default function Profile(props) {

    let navigate = useNavigate();
    const [dailyCard, setDailyCard] = useState(true)
    const [dailyAlreadyDone, setDailyAlreadyDone] = useState(false)
    

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


    // let dailyDone = localStorage.getItem('daily')

    // for (let i in myPosts){
    //     if (myPosts[i]['daily_id'] == dailyDone){
    //         setDailyAlreadyDone(true)
    //         break
    //     }
    //     console.log(dailyAlreadyDone)
    // }

    // let playButtons;

    // if (dailyAlreadyDone){
    //     playButtons = <button className='btn btn-warning mx-4' onClick={() => (navigate('/playDaily', { state: { dailyCard: setDailyCard(false)}}))}>play random</button>
    // } else {
    //     playButtons = <>
        
    //     </>
    // }



    return (
		<>
            <div className='profile-background'>
                <div className="container profile-height">
                    <div className='pt-3 d-flex justify-content-center'>
                        <button className='mx-4 play-buttons fw-bold' onClick={() => (navigate('/playDaily', { state: { dailyCard: dailyCard }}))}>play daily</button>
                        <button className='mx-4 play-buttons fw-bold' onClick={() => (navigate('/playDaily', { state: { dailyCard: setDailyCard(false)}}))}>play random</button>
                    </div>
                    <hr />
                    
                    <div className='d-flex justify-content-between'>
                        <div className='w-25 me-5'>
                            <h3 className='fw-bold username'>{userData.username}</h3>
                            <h5 className='fw-bold username'>{userData.email}</h5>
                            <button className='play-buttons fw-bold btn-sm mt-2' onClick={() => (navigate('/editForm', { state: {id: userData.id, email: userData.email, username: userData.username, first_name: userData.first_name, last_name: userData.last_name}}))}>edit profile</button>
                            <div className='fw-bold games mt-2'>my games - {userData.answers?.length}</div>
                            <hr />
                        </div>
                        <div className='w-75'>
                        <div className='text-center games-title fw-bold'>my games</div>
                        <hr />
                        {myPosts.map((post, i) => <SingleAnswer key={i} post={post} setMyPosts={setMyPosts} />)}
                        </div>
                    </div>
                </div>
            </div>
		</>
    )
}
