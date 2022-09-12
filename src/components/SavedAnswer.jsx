import React from 'react'
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './SavedAnswer.css'

export default function SavedAnswer() {
    const { state } = useLocation();   // state.savedWords is an array of 5 arrays (each one contains separate words from line)
    console.log(state.savedWords, "hello from saved answer")

    let cleanedWords = []

    for (let i in state.savedWords){
        if (state.savedWords[i].length > 0){
        cleanedWords.push(state.savedWords[i])
        }
    }
    console.log(cleanedWords, "cleaned words")


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
