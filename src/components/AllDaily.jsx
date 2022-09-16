import React from 'react'
import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom'
import BuildSingle from './BuildSingle';
import './All.css'

export default function AllDaily() {
    const [allAnswers, setAllAnswers] = useState([])
    const { state } = useLocation();
    console.log(state.id, state.prompt)

    useEffect(() => {
        let token = localStorage.getItem('token')

        let myHeaders = new Headers();
        myHeaders.append('Authorization', "Bearer " + token);
        myHeaders.append('Content-Type', 'application/json');

        fetch(`http://localhost:5000/api/answers_by_daily/${state.id}`, {
            method: 'GET',
            headers: myHeaders
        })
            .then(res => res.json())
            .then(data => {
                setAllAnswers(data)
            })

    }, [])
    console.log(allAnswers)

    




    return (
        <>
            <div className='all-background'>
                <div className="container all-height">
                    <div className='d-flex justify-content-center mb-4'>
                        <Link to="/profile" className='btn all-buttons mx-4 mt-3'>my games</Link>
                        {/* <Link to="/landing" className='btn btn-warning mx-4'>play</Link> */}
                    </div>
                    <div className='text-center my-3 fs-4 fw-bold prompt-title'>{state.prompt}</div>
                    {allAnswers.map((answer, i) => <BuildSingle key={i} answer={answer} />)}
                </div>
            </div>
        </>

    )
}
