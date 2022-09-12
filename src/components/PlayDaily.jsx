import React from 'react'
import DailyPromptCard from './DailyPromptCard'
import './PlayDaily.css'
import { useState } from 'react'
import { useEffect } from 'react'



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
        played_a: [],
        played_b: [],
        played_c: [],
        played_d: [],
        played_e: [],
        played_g: [],
        played_h: [],
        played_i: [],
        played_j: [],
        played_k: [],
        played_m: [],
        played_n: [],
        played_o: [],
        played_p: [],
        played_q: [],
        played_s: [],
        played_t: [],
        played_u: [],
        played_v: [],
        played_w: [],
        played_y: [],
        played_z: [],
        played_aa: [],
        played_bb: [],
        played_cc: [],
    }

    let letters = ['a', 'b', 'c', 'd', 'e', 'g', 'h', 'i', 'j', 'k', 'm', 'n', 'o', 'p', 'q', 's', 't', 'u', 'v', 'w', 'y', 'z', 'aa', 'bb', 'cc']

    words.forEach ((w, i) => {
        tasks[w.category].push(
            <div key={i} onDragStart = {(e) => onDragStart(e, w.word)} className="play-word" draggable>
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
                    <div className="word-container words-form">
                        {/* {letters.map((letter, i) => <div className={letter} onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e, `played_${letter}`)}>{tasks.played_`${letter}`}</div>)} */}
                        <div className="a" onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e, "played_a")}>{tasks.played_a}</div>
                        <div className="b" onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e, "played_b")}>{tasks.played_b}</div>
                        <div className="c" onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e, "played_c")}>{tasks.played_c}</div>
                        <div className="d" onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e, "played_d")}>{tasks.played_d}</div>
                        <div className="e" onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e, "played_e")}>{tasks.played_e}</div>
                        <div className="g" onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e, "played_g")}>{tasks.played_g}</div>
                        <div className="h" onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e, "played_h")}>{tasks.played_h}</div>
                        <div className="i" onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e, "played_i")}>{tasks.played_i}</div>
                        <div className="j" onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e, "played_j")}>{tasks.played_j}</div>
                        <div className="k" onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e, "played_k")}>{tasks.played_k}</div>
                        <div className="m" onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e, "played_m")}>{tasks.played_m}</div>
                        <div className="n" onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e, "played_n")}>{tasks.played_n}</div>
                        <div className="o" onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e, "played_o")}>{tasks.played_o}</div>
                        <div className="p" onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e, "played_p")}>{tasks.played_p}</div>
                        <div className="q" onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e, "played_q")}>{tasks.played_q}</div>
                        <div className="s" onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e, "played_s")}>{tasks.played_s}</div>
                        <div className="t" onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e, "played_t")}>{tasks.played_t}</div>
                        <div className="u" onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e, "played_u")}>{tasks.played_u}</div>
                        <div className="v" onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e, "played_v")}>{tasks.played_v}</div>
                        <div className="w" onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e, "played_w")}>{tasks.played_w}</div>
                        <div className="y" onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e, "played_y")}>{tasks.played_y}</div>
                        <div className="z" onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e, "played_z")}>{tasks.played_z}</div>
                        <div className="aa" onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e, "played_aa")}>{tasks.played_aa}</div>
                        <div className="bb" onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e, "played_bb")}>{tasks.played_bb}</div>
                        <div className="cc" onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e, "played_cc")}>{tasks.played_cc}</div>
                    </div>
                </div>
                <div className="Words" onDragOver={(e) => onDragOver(e)} onDrop={(e)=>{onDrop(e, "toPlay")}}>
                    {tasks.toPlay}
                </div>
            </div>
        </>
        
    )
}
