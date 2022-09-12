import React from 'react'
import './SavedAnswer.css'

export default function SingleAnswer(props) {
    console.log(props.post, "single answer page")

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


    console.log(cleanedWords, "clean")
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
            <div className="container saved d-flex flex-column justify-content-around">
                {divs}
            </div>
        </>
    )
}
