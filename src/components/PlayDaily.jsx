import React from 'react'
import DailyPromptCard from './DailyPromptCard'
import RandomPromptCard from './RandomPromptCard'
import './PlayDaily.css'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'



export default function PlayDaily(props) {
    let navigate = useNavigate();
    const { state } = useLocation();
	// call for words and send to component or whatever the plan is

    const [words, setWords] = useState([])
    const [dailyId, setDailyId] = useState(null)
    const [randomId, setRandomId] = useState(null)

    useEffect(() => {

        let token = localStorage.getItem('token')

        let myHeaders = new Headers();
        myHeaders.append('Authorization', "Bearer " + token);
        myHeaders.append('Content-Type', 'application/json');

        fetch('http://localhost:5000/api/words', {
            method: 'GET',
            headers: myHeaders
        })
            .then(res => res.json())
            .then(data => {
                setWords(data)
            })
        
    }, [])


    const onDragOver = (e) => {
        e.preventDefault();
    }

    const onDrop = (e, cat) => {
        let played_word = e.dataTransfer.getData("id");

        let allWords = words.filter((word) => {
            if (word.id == played_word){
                word.category = cat;
            }
            return word;
        });
        setWords(allWords)
}

    const handleClear = (e) => {
        let allWords = words.filter((word) => {
            if (word.category !== "toPlay"){
                word.category = "toPlay"
            }
            return word;
        })
        setWords(allWords)
    }

    const handleSave = (e) => {
        e.preventDefault();
        let savedWords = [];
        let line1 = [];
        let line2 = [];
        let line3 = [];
        let line4 = [];
        let line5 = [];
        // join words for each line and append to savedWords
        for (let i in options){
            if (['played_a', 'played_b', 'played_c', 'played_d', 'played_e'].includes(i) && options[i][0] !== undefined){
                line1.push(options[i][0].props.children)
            } else if (['played_g', 'played_h', 'played_i', 'played_j', 'played_k'].includes(i) && options[i][0] !== undefined){
                line2.push(options[i][0].props.children)
            } else if (['played_m', 'played_n', 'played_o', 'played_p', 'played_q'].includes(i) && options[i][0] !== undefined){
                line3.push(options[i][0].props.children)
            } else if (['played_s', 'played_t', 'played_u', 'played_v', 'played_w'].includes(i) && options[i][0] !== undefined){
                line4.push(options[i][0].props.children)
            } else if (['played_y', 'played_z', 'played_aa', 'played_bb', 'played_cc'].includes(i) && options[i][0] !== undefined){
                line5.push(options[i][0].props.children)
            }
        }
        console.log(line1.join(" "), dailyId, randomId, "before fetch line1")

        let token = localStorage.getItem('token')

        let myHeaders = new Headers();
        myHeaders.append('Authorization', "Bearer " + token);
        myHeaders.append('Content-Type', 'application/json');

        let formData = JSON.stringify({
            url: null,
            line1: line1.join(" "),
            line2: line2.join(" "),
            line3: line3.join(" "),
            line4: line4.join(" "),
            line5: line5.join(" "),
            daily_id: dailyId,
            prompt_id: randomId
        })

        fetch("http://localhost:5000/api/create_answer", {
            method: 'POST',
            headers: myHeaders,
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                if (data.error){
                    console.error(data.error)
                } else {
                    props.flashMessage('You have submitted your answer successfully!', 'primary')
                }
            })

        savedWords.push(line1, line2, line3, line4, line5)

        navigate('/savedAnswer', { state: { savedWords: savedWords, dailyId: dailyId, randomId: randomId }})
    }


    const onDragStart = (e, id, word) => {
        e.dataTransfer.setData("id", id);
        e.dataTransfer.setData("word", word)
    }

    let options = {
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

    // let letters = ['a', 'b', 'c', 'd', 'e', 'g', 'h', 'i', 'j', 'k', 'm', 'n', 'o', 'p', 'q', 's', 't', 'u', 'v', 'w', 'y', 'z', 'aa', 'bb', 'cc']

    words.forEach ((w, i) => {
        options[w.category].push(
            <div key={i} onDragStart = {(e) => onDragStart(e, w.id, w.word)} className="play-word" draggable>
                {w.word}
            </div>
        );
    });


    return (
        <>
            <div className="daily-container">
                <div className="DailyCard">
                    {state.dailyCard && <DailyPromptCard setDailyId={setDailyId}/>}
                    {!state.dailyCard && <RandomPromptCard setRandomId={setRandomId}/>}
                </div>
                <div className="WordsForm">
                    <h5 className='text-center'>place words here</h5>
                    <div className="word-container words-form">
                        {/* {letters.map((letter, i) => <div className={letter} onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e, `played_${letter}`)}>{tasks.played_`${letter}`}</div>)} */}
                        <div className="a" onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e, "played_a")}>{options.played_a}</div>
                        <div className="b" onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e, "played_b")}>{options.played_b}</div>
                        <div className="c" onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e, "played_c")}>{options.played_c}</div>
                        <div className="d" onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e, "played_d")}>{options.played_d}</div>
                        <div className="e" onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e, "played_e")}>{options.played_e}</div>
                        <div className="g" onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e, "played_g")}>{options.played_g}</div>
                        <div className="h" onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e, "played_h")}>{options.played_h}</div>
                        <div className="i" onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e, "played_i")}>{options.played_i}</div>
                        <div className="j" onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e, "played_j")}>{options.played_j}</div>
                        <div className="k" onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e, "played_k")}>{options.played_k}</div>
                        <div className="m" onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e, "played_m")}>{options.played_m}</div>
                        <div className="n" onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e, "played_n")}>{options.played_n}</div>
                        <div className="o" onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e, "played_o")}>{options.played_o}</div>
                        <div className="p" onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e, "played_p")}>{options.played_p}</div>
                        <div className="q" onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e, "played_q")}>{options.played_q}</div>
                        <div className="s" onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e, "played_s")}>{options.played_s}</div>
                        <div className="t" onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e, "played_t")}>{options.played_t}</div>
                        <div className="u" onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e, "played_u")}>{options.played_u}</div>
                        <div className="v" onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e, "played_v")}>{options.played_v}</div>
                        <div className="w" onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e, "played_w")}>{options.played_w}</div>
                        <div className="y" onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e, "played_y")}>{options.played_y}</div>
                        <div className="z" onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e, "played_z")}>{options.played_z}</div>
                        <div className="aa" onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e, "played_aa")}>{options.played_aa}</div>
                        <div className="bb" onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e, "played_bb")}>{options.played_bb}</div>
                        <div className="cc" onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e, "played_cc")}>{options.played_cc}</div>
                    </div>
                    <div className='d-flex justify-content-around'>
                        <button className='btn btn-sm btn-warning mb-2' onClick={(e) => handleClear(e)}>clear board</button>
                        <button className="btn btn-sm btn-primary mb-2 save-button" onClick={(e) => handleSave(e)}>save answer</button>
                    </div>
                </div>
                <div className="Words" onDragOver={(e) => onDragOver(e)} onDrop={(e)=>{onDrop(e, "toPlay")}}>
                    {options.toPlay}
                </div>
            </div>
        </>
        
    )
}
