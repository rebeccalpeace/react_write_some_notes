import React from 'react'
import './SavedAnswer.css'
import './SingleAnswer.css'
import { useEffect, useState } from 'react'

export default function SingleAnswer(props) {
    const [dailyId, setDailyId] = useState([]);
    const [randomId, setRandomId] = useState([]);

    useEffect(() => {

        let token = localStorage.getItem('token')

        let myHeaders = new Headers();
        myHeaders.append('Authorization', "Bearer " + token);
        myHeaders.append('Content-Type', 'application/json');

        if (props.post.daily_id !== null){
            fetch(`http://localhost:5000/api/daily_by_id/${props.post.daily_id}`, {
            method: 'GET',
            headers: myHeaders
        })
            .then(res => res.json())
            .then(data => {
                setDailyId(data)
            })
        } else if (props.post.prompt_id !== null){
            fetch(`http://localhost:5000/api/random_by_id/${props.post.prompt_id}`, {
            method: 'GET',
            headers: myHeaders
        })
            .then(res => res.json())
            .then(data => {
                setRandomId(data)
            })
        }
    }, []) 
    

    let cleanedWords = []

    if (props.post.line1 !== ''){
        cleanedWords.push(props.post.line1.split(" "))
    }
    if (props.post.line2 !== ''){
        cleanedWords.push(props.post.line2.split(" "))
    }
    if (props.post.line3 !== ''){
        cleanedWords.push(props.post.line3.split(" "))
    }
    if (props.post.line4 !== ''){
        cleanedWords.push(props.post.line4.split(" "))
    }
    if (props.post.line5 !== ''){
        cleanedWords.push(props.post.line5.split(" "))
    }

    let divs;
    
    if (cleanedWords.length === 1){
        divs = <div className='py-3 mx-4 d-flex justify-content-center'>{cleanedWords[0].map((w, i) => <div key={i} className="format-word">{w}</div>)}</div>
    } else if (cleanedWords.length === 2){
        divs = <><div className='py-3 mx-4 d-flex justify-content-center'>{cleanedWords[0].map((w, i) => <div key={i} className="format-word">{w}</div>)}</div>
                <div className='py-3 mx-4 d-flex justify-content-center'>{cleanedWords[1].map((w, i) => <div key={i} className="format-word">{w}</div>)}</div>
                </>
    } else if (cleanedWords.length === 3){
        divs = <><div className='py-3 mx-4 d-flex justify-content-center'>{cleanedWords[0].map((w, i) => <div key={i} className="format-word">{w}</div>)}</div>
                <div className='py-3 mx-4 d-flex justify-content-center'>{cleanedWords[1].map((w, i) => <div key={i} className="format-word">{w}</div>)}</div>
                <div className='py-3 mx-4 d-flex justify-content-center'>{cleanedWords[2].map((w, i) => <div key={i} className="format-word">{w}</div>)}</div>
                </>
    } else if (cleanedWords.length === 4){
        divs = <><div className='py-3 mx-4 d-flex justify-content-center'>{cleanedWords[0].map((w, i) => <div key={i} className="format-word">{w}</div>)}</div>
                <div className='py-3 mx-4 d-flex justify-content-center'>{cleanedWords[1].map((w, i) => <div key={i} className="format-word">{w}</div>)}</div>
                <div className='py-3 mx-4 d-flex justify-content-center'>{cleanedWords[2].map((w, i) => <div key={i} className="format-word">{w}</div>)}</div>
                <div className='py-3 mx-4 d-flex justify-content-center'>{cleanedWords[3].map((w, i) => <div key={i} className="format-word">{w}</div>)}</div> 
                </>
    } else if (cleanedWords.length === 5){
        divs = <><div className='py-3 mx-4 d-flex justify-content-center'>{cleanedWords[0].map((w, i) => <div key={i} className="format-word">{w}</div>)}</div>
                <div className='py-3 mx-4 d-flex justify-content-center'>{cleanedWords[1].map((w, i) => <div key={i} className="format-word">{w}</div>)}</div>
                <div className='py-3 mx-4 d-flex justify-content-center'>{cleanedWords[2].map((w, i) => <div key={i} className="format-word">{w}</div>)}</div>
                <div className='py-3 mx-4 d-flex justify-content-center'>{cleanedWords[3].map((w, i) => <div key={i} className="format-word">{w}</div>)}</div> 
                <div className='py-3 mx-4 d-flex justify-content-center'>{cleanedWords[4].map((w, i) => <div key={i} className="format-word">{w}</div>)}</div>
                </>
    }


    return (
        <>
            <div className='row d-flex justify-content-around'>
                {!props.post.prompt_id && <div className='my-auto col-4 text-center px-4'>{dailyId.prompt}</div>}
                {!props.post.daily_id && <div className='my-auto col-4 text-center px-4'>{randomId.prompt}</div>}
                <div className=" col-8 container single d-flex flex-column justify-content-around">
                    {divs}
                </div>
            </div>
        </>
    )
}
