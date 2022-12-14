import React from 'react'
import './DailyCard.css'
import { useState, useEffect } from 'react';

export default function RandomPromptCard(props) {

    const [prompt, setPrompt] = useState(null);

    useEffect(() => {

        let token = localStorage.getItem('token')

        let myHeaders = new Headers();
        myHeaders.append('Authorization', "Bearer " + token);
        myHeaders.append('Content-Type', 'application/json');

         fetch('http://localhost:5000/api/prompt', {
            method: 'GET',
            headers: myHeaders
        })
            .then(res => res.json())
            .then(data => {
                let randomPrompt = data.prompt
                props.setRandomId(data.id)
                setPrompt(randomPrompt)
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
