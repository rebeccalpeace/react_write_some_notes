import React from 'react'
import DailyPromptCard from './DailyPromptCard'
import './PlayDaily.css'
import { useState } from 'react'
import { useEffect } from 'react'
import './WordsForm.css'


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

    console.log(words, "after useEffect")

    const onDragOver = (e) => {
        e.preventDefault();
    }

    const onDrop = (e, cat) => {
        let played_word = e.dataTransfer.getData("word");

        let allWords = words.filter((word) => {
            if (word.word == played_word){
                word.category = cat;
            }
            return word;
        });
        setWords(allWords)
}


    const onDragStart = (e, word) => {
        console.log('dragstart:', word);
        e.dataTransfer.setData("word", word);
    }

    let tasks = {
        toPlay: [],
        played: []
    }

    words.forEach ((w) => {
        tasks[w.category].push(
            <div key={w.word} onDragStart = {(e) => onDragStart(e, w.word)} className="play-word" draggable>
                {w.word}
            </div>
        );
    });


    return (
        <>
            <div className="daily-container">
                <div className="DailyCard">
                    <DailyPromptCard />
                </div>
                <div className="WordsForm">
                    <h5 className='text-center'>place words here</h5>
                    <div className="words-form text-center" onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e, "played")}>
                        {tasks.played}
                    </div>
                </div>
                <div className="Words" onDragOver={(e) => onDragOver(e)} onDrop={(e)=>{onDrop(e, "toPlay")}}>
                    {tasks.toPlay}
                </div>
            </div>
        </>
        
    )
}
