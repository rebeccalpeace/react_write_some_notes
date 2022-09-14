import React from 'react'
import { useState, useEffect } from 'react'
import SingleAnswer from './SingleAnswer'
import { useNavigate } from 'react-router-dom'

export default function Profile(props) {

    let navigate = useNavigate();

    if (props.loggedIn === false){
        props.flashMessage('You need to be logged in to see your profile!', 'warning')
        navigate('/')
    }

	const [myPosts, setMyPosts] = useState([])
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
                })
            }
        fetchAnswers()
    }, [])   
    console.log(myPosts[0].user_id, "test whyyy")


    useEffect(() => {
        
        if (myPosts){
        let token = localStorage.getItem('token')

        let myHeaders = new Headers();
        myHeaders.append('Authorization', "Bearer " + token);
        myHeaders.append('Content-Type', 'application/json');

         fetch(`http://localhost:5000/api/users/${myPosts[0].user_id}`, {
            method: 'GET',
            headers: myHeaders
        })
            .then(res => res.json())
            .then(data => {
                setUserData(data)
            })
        }
    }, [])


    return (
		<>
            <div className='d-flex justify-content-between'>
                <div className='w-25'>
                    <h3>{props.username}</h3>
                </div>
			    {myPosts.map((post, i) => <SingleAnswer key={i} post={post} setMyPosts={setMyPosts} />)}
            </div>
		</>
    )
}
