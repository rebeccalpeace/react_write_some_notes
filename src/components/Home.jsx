import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <>
            <div>Home if logged out</div>
            <div>Home if logged in</div>
            <button className="btn btn-warning"><Link className="navbar-brand" to="/register">sign up</Link></button>
        </>
    )
}
