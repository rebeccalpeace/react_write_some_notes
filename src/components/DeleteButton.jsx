import React from 'react'
import { useState, useEffect } from 'react';
import './PlayDaily.css'

export default function DeleteButton(id, setMyPosts) {
    // console.log(setMyPosts, "delete button")

    function useDeleteAnswer() {
        const [shouldRefetchAnswers, setShouldRefetchAnswers] = useState(false)
        const [deleteError, setDeleteError] = useState(false)
        const [newAnswers, setNewAnswers] = useState([])

        const handleDeleteClick = (id) => {
            console.log(id)

            let token = localStorage.getItem('token')
            console.log(token)

            let myHeaders = new Headers();
            myHeaders.append('Authorization', 'Bearer ' + token)
            myHeaders.append('Content-Type', 'application/json');

            let raw = '';

            fetch(`http://localhost:5000/api/delete_answer/${id}`, {
                method: 'DELETE',
                headers: myHeaders,
                body: raw
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
                fetch('http://localhost:5000/api/answers_by_user')
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
                    <li><a className="dropdown-item">Are you sure?</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" onClick={() => handleDeleteClick(id)}>Delete</a></li>
                </ul>
            </div>
        </>
    )
}
