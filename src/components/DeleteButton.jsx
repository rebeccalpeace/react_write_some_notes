import React from 'react'
import { useState, useEffect } from 'react';
import './PlayDaily.css'

export default function DeleteButton({id, setMyPosts}) {

    function useDeleteAnswer() {
        const [shouldRefetchAnswers, setShouldRefetchAnswers] = useState(false)
        const [deleteError, setDeleteError] = useState(false)
        const [newAnswers, setNewAnswers] = useState(null)

        const handleDeleteClick = (id) => {
            console.log(id)

            let token = localStorage.getItem('token')
            console.log(token)

            let myHeaders = new Headers();
            myHeaders.append('Authorization', 'Bearer ' + token)
            myHeaders.append('Content-Type', 'application/json');


            fetch(`http://localhost:5000/api/delete_answer/${id}`, {
                method: 'DELETE',
                headers: myHeaders
            })
                .then(res => res.json())
                .then(data => {
                    if (data.error){
                        console.error(data.error)
                        setDeleteError(true)
                    } else {
                        console.log(data)
                        setShouldRefetchAnswers(true)
                    }
                })
        }

        useEffect(() => {
            if (shouldRefetchAnswers){

                let token = localStorage.getItem('token')

                let myHeaders = new Headers();
                myHeaders.append('Authorization', "Bearer " + token);
                myHeaders.append('Content-Type', 'application/json');

                fetch('http://localhost:5000/api/answers_by_user', {
                    method: 'GET',
                    headers: myHeaders
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.error){
                            console.error(data.error)
                        } else {
                            setNewAnswers(data)
                            
                        }
                    })
                    console.log(newAnswers, "test on delete page")
            }
            setShouldRefetchAnswers(false)
        }, [shouldRefetchAnswers]);

        return {
            handleDeleteClick,
            error: deleteError,
            newAnswers
        }
    };

    const {handleDeleteClick, error, newAnswers} = useDeleteAnswer();

    useEffect(() => {
        if (newAnswers){
            setMyPosts(newAnswers)
        }
    }, [newAnswers])


    return (
        <>
            <div className="btn-group delete-button">
                <button className="btn btn-sm btn-danger dropdown-toggle text-center my-auto" data-bs-toggle="dropdown" aria-expanded="false">delete</button>
                <ul className="dropdown-menu">
                    <li className='text-center'>Are you sure?</li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" onClick={() => handleDeleteClick(id)}>Delete</a></li>
                </ul>
            </div>
        </>
    )
}
