import React from 'react'
import { useEffect, useState } from 'react'

export default function LikeCount({answer, isLiked, setIsLiked}) {

	const [likes, setLikes] = useState(0)
	let answer_id = answer["answer"]["id"]

	// call for how many likes this answer has
	useEffect(() => {
        let token = localStorage.getItem('token')

        let myHeaders = new Headers();
        myHeaders.append('Authorization', "Bearer " + token);
        myHeaders.append('Content-Type', 'application/json');

        fetch(`http://localhost:5000/api/likes/${answer_id}`, {
            method: 'GET',
            headers: myHeaders
        })
            .then(res => res.json())
            .then(data => {
                if (data.error){
                    console.error(data.error)
                } else {
                    setLikes(data)
					console.log(likes)
                }
            })
    }, [isLiked])


	return (
		<div>{likes} {`${likes == 1 ? "like" : "likes"}`}</div>
	)
}
