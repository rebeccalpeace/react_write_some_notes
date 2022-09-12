import React from 'react'
import './DailyCard.css'
import { useState, useEffect } from 'react';

export default function RandomPromptCard() {

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
                setPrompt(randomPrompt)
            })
        console.log(prompt)
    }, [])   

    console.log(prompt)
    
    return (
        <>
            <div className='daily text-center'>
                <h6 className="mt-5">{prompt}</h6>
            </div>
        </>
    )
}
