import React from 'react'
import { useState, useEffect } from 'react'
import SingleAnswer from './SingleAnswer'

export default function Profile(props) {
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
