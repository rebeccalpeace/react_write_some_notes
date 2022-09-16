import React from 'react'
import { useState, useEffect } from 'react';
import './All.css'

export default function GetUsername(user_id) {

    const [user, setUser] = useState([]);

    useEffect(() => {
        let token = localStorage.getItem('token')

        let myHeaders = new Headers();
        myHeaders.append('Authorization', "Bearer " + token);
        myHeaders.append('Content-Type', 'application/json');

        fetch(`http://localhost:5000/api/users/${user_id.user_id}`, {
            method: 'GET',
            headers: myHeaders
        })
            .then(res => res.json())
            .then(data => {
                setUser(data)
            })

    }, [])


  return (
    <div className='text-center prompt-title fw-bold'>{user.username}</div>
  )
}
