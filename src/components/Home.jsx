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
                    <div className='purple'>purple</div>
                    <div className='purple-words'>purple words</div>
                    <div className='peach'>peach</div>
                    <div className='peach-words'>peach words</div>
                    <div className='orange'>orange</div>
                    <div className='orange-words'>orange-words</div>
                    <div className='green'>green</div>
                    <div className='green-words'>green-words</div>
                    <div className='pink'>pink</div>
                    <div className='pink-words'>pink-words</div>
                </div>
            </div>
        </>
    )
}
