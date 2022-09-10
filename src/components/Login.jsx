import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login(props) {

    let navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        console.log(props)
        console.log(e);

        let username = e.target.username.value;
        let password = e.target.password.value;

        console.log(username)
        
        let myHeaders = new Headers();
        myHeaders.append('Authorization', "Basic " + btoa(`${username}:${password}`))

        let response = await fetch("http://localhost:5000/api/token", {
            method: 'GET',
            headers: myHeaders
        });

        if (response.ok){
            console.log('ok!')
            let data = await response.json();
        console.log(data)

        localStorage.setItem('token', data.token);
        localStorage.setItem('expiration', data.token_expiration);

        props.login();

        props.flashMessage('You are now loggedin ', 'primary')
        navigate('/')
        console.log('logged in')
        } else {
            props.flashMessage('Your username and/or password are incorrect', 'warning')
        }
        props.verifyUser(username)
    }


    return (
        <>
            <form className="" onSubmit={handleSubmit}>
                <input className="" type="text" placeholder="username" name="username"/>
                <input className="" type="password" placeholder="password" name="password"/>
                <button className="btn btn-outline-success" type="submit">sign in</button>
            </form>
        </>
    )
}
