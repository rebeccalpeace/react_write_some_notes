import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { useEffect } from 'react';

export default function Register({flashMessage, login, verifyUser, loggedIn, username, setUsername}) {

    const [shouldLogin, setShouldLogin] = useState(false);

    const [password, setPassword] = useState(null);

    let navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();
        console.log(e.target.username.value)

        let password = e.target.password.value;
        let confirmPassword = e.target.confirmPassword.value;
        if (password !== confirmPassword){
            navigate('/register')
            flashMessage('Passwords do not match', 'danger')
            console.log('passwords do not match')
        } else {
            console.log('Passwords match!')
        

            let myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');

            let formData = JSON.stringify({
                first_name: e.target.first_name.value,
                last_name: e.target.last_name.value,
                email: e.target.email.value,
                username: e.target.username.value,
                password: e.target.password.value
            })

            await fetch("http://localhost:5000/api/users", {
                method: 'POST',
                headers: myHeaders,
                body: formData
            })
                .then(res => res.json())
                .then(data => {
                    if (data.error){
                        console.log(data.error)
                        navigate('/register')
                        flashMessage('This username and/or email already exists', 'warning')
                    } else {
                        flashMessage('You have successfully signed up!', 'primary')
                        setUsername(e.target.username.value)
                        setPassword(e.target.password.value)
                        setShouldLogin(true)

                    }
                })
            }
        e.target.first_name.value = '';
        e.target.last_name.value = '';
        e.target.email.value = '';
        e.target.username.value = '';
        e.target.password.value = '';
        e.target.confirmPassword.value = '';
    }

    useEffect(() => {
        
        if (shouldLogin){
            const fetchToken = async () => {
                console.log(username)
                console.log(password, "test password")
                
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
                localStorage.setItem('username', username)

                login();

                flashMessage('You are now loggedin ', 'primary')
                navigate('/profile')
                console.log('logged in')
                console.log(data.token)
                } else {
                    flashMessage('Your username and/or password are incorrect', 'warning')
                }
                verifyUser(username)
                }
                setShouldLogin(false)

            fetchToken();

            }
    }, [shouldLogin])


    return (
        <>
            <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-6">
                    <label htmlFor="first_name" className="form-label">first name</label>
                    <input type="text" className="form-control" id="first_name" placeholder="enter first name" name="first_name" required/>
                </div>
                <div className="col-md-6">
                    <label htmlFor="last_name" className="form-label">last name</label>
                    <input type="text" className="form-control" id="last_name" placeholder='enter last name' name="last_name" required/>
                </div>
                <div className="col-12">
                    <label htmlFor="email" className="form-label">email</label>
                    <input type="text" className="form-control" id="email" placeholder="enter email" name="email" required/>
                </div>
                <div className="col-md-12">
                    <label htmlFor="username" className="form-label">username</label>
                    <input type="text" className="form-control" id="username" placeholder='enter username' name="username" required/>
                </div>
                <div className="col-md-6">
                    <label htmlFor="password" className="form-label">password</label>
                    <input type="password" className="form-control" id="password" placeholder='enter password' name="password" required/>
                </div>
                <div className="col-md-6">
                    <label htmlFor="confirmPassword" className="form-label">confirm password</label>
                    <input type="password" className="form-control" id="confirmPassword" placeholder='confirm password' name="confirmPass" required/>
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">sign up</button>
                </div>
            </form>
        </>
    )
}
