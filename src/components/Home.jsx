import React from 'react'
import { Link } from 'react-router-dom'

export default function Home(loggedIn) {

    return (
        <>
            <button className="btn btn-warning"><Link className="navbar-brand" to="/register">sign up</Link></button>
        </>
    )
}
