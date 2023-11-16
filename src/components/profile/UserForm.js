import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"


export const UserForm = () => {


    const localCoffeeUser = localStorage.getItem("coffee_user")
    const coffeeUserObject = JSON.parse(localCoffeeUser)


    const [profile, updateProfile] = useState({
        fullName: "",
        email: "",
    })

    const navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/users?id=${coffeeUserObject.id}`)
            .then(response => response.json())
            .then((data) => {
                const userObject = data[0]
                updateProfile(userObject)
            })
        },
        [] 
    ) 


    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        return fetch(`http://localhost:8088/users/${profile.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(profile)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/")
            })
    }


    return <form className="userEditForm">
        <h2 className="userEditForm__title">Edit User</h2> 
        <fieldset>
            <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                    required autoFocus
                    type="text"
                    className="form-control"
                    value={profile.fullName}
                    onChange={
                        (event) => {
                            const copy = { ...profile }
                            copy.fullName = event.target.value
                            updateProfile(copy)
                        }
                    }></input>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                    required autoFocus
                    type="text"
                    className="form-control"
                    value={profile.email}
                    onChange={
                        (event) => {
                            const copy = { ...profile }
                            copy.email = event.target.value
                            updateProfile(copy)
                        }
                    }></input>
            </div>
        </fieldset>
       
        
        <button
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
            className="btn btn-primary">
            Save Edits
        </button>
    </form>
}