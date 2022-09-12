import React from 'react'
import './Landing.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Landing() {
    let navigate = useNavigate();

    const [dailyCard, setDailyCard] = useState(true)

    return (
        <>
            <div className='d-flex justify-content-around text-center'>
                <div className='special' onClick={() => (navigate('/playDaily', { state: { dailyCard: dailyCard }}))}>
                    <h3 className='mt-5'>daily</h3>
                    <h3>prompt</h3>
                </div>
                <div className='special' onClick={() => (navigate('/playDaily', { state: { dailyCard: setDailyCard(false)}}))}>
                    <h3 className='mt-5'>random</h3>
                    <h3>prompt</h3>
                </div>

            </div>
        </>
    )
}
