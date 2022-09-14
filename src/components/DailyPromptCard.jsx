import React from 'react'
import './DailyCard.css'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DailyPromptCard(props) {

    let navigate = useNavigate();

    const [prompt, setPrompt] = useState(null);

    useEffect(() => {

        let token = localStorage.getItem('token')

        let myHeaders = new Headers();
        myHeaders.append('Authorization', "Bearer " + token);
        myHeaders.append('Content-Type', 'application/json');

         fetch('http://localhost:5000/api/daily', {
            method: 'GET',
            headers: myHeaders
        })
            .then(res => res.json())
            .then(data => {
                let dailyPrompt = data.prompt
                props.setDailyId(data.id)
                setPrompt(dailyPrompt)
            })
            
    }, [])   

    return (
        <>
            <div className='daily text-center d-flex flex-column justify-content-center'>
                <h6>{prompt}</h6>
            </div>
        </>
    )
}
