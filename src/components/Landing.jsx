import React from 'react'
import './Landing.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Landing({loggedIn, flashMessage}) {
    let navigate = useNavigate();

    if (loggedIn === false){
        flashMessage('You need to be logged in to play!', 'warning')
        navigate('/')
    }

    const [dailyCard, setDailyCard] = useState(true)

    return (
        <>
            <div className='d-flex justify-content-around text-center'>
                <div className='special' type='button' onClick={() => (navigate('/playDaily', { state: { dailyCard: dailyCard }}))}>
                    <h3 className='mt-5'>daily</h3>
                    <h3>prompt</h3>
                </div>
                <div className='special' type="button" onClick={() => (navigate('/playDaily', { state: { dailyCard: setDailyCard(false)}}))}>
                    <h3 className='mt-5'>random</h3>
                    <h3>prompt</h3>
                </div>

            </div>
        </>
    )
}
