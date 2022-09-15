import React from 'react'
import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './SavedAnswer.css'


export default function SavedAnswer() {
    const { state } = useLocation();   // state.savedWords is an array of 5 arrays (each one contains separate words from line)


    let cleanedWords = []

    for (let i in state.savedWords){
        if (state.savedWords[i].length > 0){
        cleanedWords.push(state.savedWords[i])
        }
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
            <div className='d-flex justify-content-center my-4'>
                <Link to="/profile" className='btn btn-warning mx-4'>my games</Link>
                {/* <Link to="/landing" className='btn btn-warning mx-4'>play again</Link> */}
            </div>
            <div className="container saved d-flex flex-column justify-content-around">
                {divs}
            </div>
            
        </>
    )
}
