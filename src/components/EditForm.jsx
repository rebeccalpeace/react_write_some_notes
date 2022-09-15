import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'


export default function EditForm(props) {

    let navigate = useNavigate();
    const { state } = useLocation();
    console.log(state.id)

    const handleUpdate = async (e) => {
        e.preventDefault();

        let password = e.target.password.value;
        let confirmPassword = e.target.confirmPassword.value;
        if (password !== confirmPassword){
            props.flashMessage('Passwords do not match', 'danger')
            console.log('passwords do not match')
        } else {
            console.log('Passwords match!')

            let token = localStorage.getItem('token')

            let myHeaders = new Headers();
            myHeaders.append('Authorization', "Bearer " + token);
            myHeaders.append('Content-Type', 'application/json');

            let formData = JSON.stringify({
                first_name: e.target.first_name.value,
                last_name: e.target.last_name.value,
                email: e.target.email.value,
                username: e.target.username.value,
                password: e.target.password.value
            })

            await fetch(`http://localhost:5000/api/update/${state.id}`, {
                method: "PUT",
                headers: myHeaders,
                body: formData
            })
                .then(res => res.json())
                .then(data => {
                    if (data.error){
                        console.error(data.error)
                        props.flashMessage('This username and/or email already exists', 'warning')
                    } else {
                        console.log(data, "data from edit form")
                        props.flashMessage('You have successfully edited your profile!', 'primary')
                        props.setUsername(data.username)
                        navigate('/profile')
                    }
                })
        }

        
    }   

    return (
        <>  
            <div className="container">
                <form className="row g-3" onSubmit={handleUpdate}>
                    <div className="col-6">
                        <label htmlFor="first_name" className="form-label">first name</label>
                        <input type="text" className="form-control" id="first_name" name="first_name" defaultValue={state.first_name} required/>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="last_name" className="form-label">last name</label>
                        <input type="text" className="form-control" id="last_name" name="last_name" defaultValue={state.last_name} required/>
                    </div>
                    <div className="col-12">
                        <label htmlFor="email" className="form-label">email</label>
                        <input type="text" className="form-control" id="email" name="email" defaultValue={state.email} required/>
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="username" className="form-label">username</label>
                        <input type="text" className="form-control" id="username" name="username" defaultValue={state.username} required/>
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
                        <button type="submit" className="btn btn-primary">update</button>
                    </div>
                </form>
            </div>
        </>
    )
}
