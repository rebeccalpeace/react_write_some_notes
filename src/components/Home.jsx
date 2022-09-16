import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

export default function Home() {

    return (
        <>
            <div className='home-background'>
                <div className="container home-height">
                    <div className='d-flex justify-content-center'>
                        <h2 className='text-center title-words'>write</h2>
                        <h2 className='text-center title-words'>some</h2>
                        <h2 className='text-center title-words'>notes</h2>
                    </div>
                </div>
            </div>
        </>
    )
}
