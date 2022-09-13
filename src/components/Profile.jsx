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

	useEffect(() => {

        let token = localStorage.getItem('token')

        let myHeaders = new Headers();
        myHeaders.append('Authorization', "Bearer " + token);
        myHeaders.append('Content-Type', 'application/json');

         fetch('http://localhost:5000/api/answers_by_user', {
            method: 'GET',
            headers: myHeaders
        })
            .then(res => res.json())
            .then(data => {
                setMyPosts(data)
            })
    }, [myPosts])   


    return (
		<>
			{myPosts.map((post, i) => <SingleAnswer key={i} post={post} setMyPosts={setMyPosts} />)}
      		
		</>
    )
}
