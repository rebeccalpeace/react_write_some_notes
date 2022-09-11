import React from 'react'
import './Landing.css';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
    let navigate = useNavigate();

    return (
        <>
            <div className='d-flex justify-content-around text-center'>
                <div className='special' onClick={() => (navigate('/playDaily'))}>
                    <h3 className='mt-5'>daily</h3>
                    <h3>prompt</h3>
                </div>
                <div className='special' onClick={() => (navigate('/playRandom'))}>
                    <h3 className='mt-5'>random</h3>
                    <h3>prompt</h3>
                </div>

            </div>
        </>
    )
}
