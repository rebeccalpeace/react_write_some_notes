import React from 'react'
import GetUsername from './GetUsername'
import './SavedAnswer.css'
import './SingleAnswer.css'
import Like from './Like'
import LikeCount from './LikeCount'

export default function BuildSingle(answer, prompt) {

    console.log(answer)
    let cleanedWords = []

    if (answer.answer.line1 !== ''){
        cleanedWords.push(answer.answer.line1.split(" "))
    }
    if (answer.answer.line2 !== ''){
        cleanedWords.push(answer.answer.line2.split(" "))
    }
    if (answer.answer.line3 !== ''){
        cleanedWords.push(answer.answer.line3.split(" "))
    }
    if (answer.answer.line4 !== ''){
        cleanedWords.push(answer.answer.line4.split(" "))
    }
    if (answer.answer.line5 !== ''){
        cleanedWords.push(answer.answer.line5.split(" "))
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
                <div className="col-8 mx-auto container single d-flex flex-column justify-content-around">
                    {divs}
                </div>
            </div>
            <div className='row'>
                <div className='col-8 mx-auto container d-flex likes-padding justify-content-between'>
                    <div className='d-flex'>
                        <Like answer={answer}/>
                        <LikeCount />
                    </div>
                    <GetUsername user_id={answer.answer.user_id}/>
                </div>
            </div>
        </>

    )
}
