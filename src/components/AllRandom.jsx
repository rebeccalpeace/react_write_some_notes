import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import BuildSingle from './BuildSingle';

export default function AllRandom() {
	const [allAnswers, setAllAnswers] = useState([])
    const { state } = useLocation();
    console.log(state.id, state.prompt)


	useEffect(() => {
        let token = localStorage.getItem('token')

        let myHeaders = new Headers();
        myHeaders.append('Authorization', "Bearer " + token);
        myHeaders.append('Content-Type', 'application/json');

        fetch(`http://localhost:5000/api/answers_by_prompt/${state.id}`, {
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
            <div className="container">
                <div className='d-flex justify-content-center my-4'>
                    <Link to="/profile" className='btn btn-warning mx-4'>my games</Link>
                    {/* <Link to="/landing" className='btn btn-warning mx-4'>play</Link> */}
                </div>
                <div className='text-center my-3 fs-4 fw-bold'>{state.prompt}</div>
                {allAnswers.map((answer, i) => <BuildSingle key={i} answer={answer} />)}
            </div>
		</>
    )
}
