import React from 'react'
import DailyPromptCard from './DailyPromptCard'
import WordsForm from './WordsForm'
import './PlayDaily.css'
import { useState } from 'react'
import { useEffect } from 'react'
import CreateWord from './CreateWord'

export default function PlayDaily() {

    // call for daily prompt and send over the data to DailyPromptCard

	// call for words and send to component or whatever the plan is
    const [words, setWords] = useState([])

    useEffect(() => {

        let token = localStorage.getItem('token')

        let myHeaders = new Headers();
        myHeaders.append('Authorization', "Bearer " + token);
        myHeaders.append('Content-type', 'application/json');

        fetch('http://localhost:5000/api/words', {
            method: 'GET',
            headers: myHeaders
        })
            .then(res => res.json())
            .then(data => {
                setWords(data)
            })
    }, [])

    console.log(words, "second?")


    
    return (
        <>
            <div className="daily-container">
                <div className="DailyCard">
                    <DailyPromptCard />
                </div>
                <div className="WordsForm">
                    <h5 className='text-center'>place words here</h5>
                    <WordsForm />
                </div>
                <div className="Words">
                    {words.map((word, i) => {return <CreateWord key={i} word={word} />})}
                    
                </div>
            </div>
        </>
        
    )
}
