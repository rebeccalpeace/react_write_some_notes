import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Register(props) {

    let navigate = useNavigate();

    const handleSubmit = (e) => {

        e.preventDefault();
        console.log(e.target.username.value)

        let password = e.target.password.value;
        let confirmPassword = e.target.confirmPassword.value;
        if (password !== confirmPassword){
            navigate('/')
            props.flashMessage('Passwords do not match', 'danger')
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

            fetch("http://localhost:5000/api/users", {
                method: 'POST',
                headers: myHeaders,
                body: formData
            })
                .then(res => res.json())
                .then(data => {
                    if (data.error){
                        console.log(data.error)
                        navigate('/')
                        props.flashMessage('This username and/or email already exists', 'warning')
                    } else {
                        navigate('/')
                        props.flashMessage('You have successfully signed up!', 'primary')
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
