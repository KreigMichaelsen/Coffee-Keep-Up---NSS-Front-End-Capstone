import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const UserCreationForm = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
    const [user, update] = useState({
        fullName: "",
        email: "",
        isAdmin: false

    })
    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the ticket list
    */
   const navigate = useNavigate()

   const localCoffeeUser = localStorage.getItem("coffee_user")
    const coffeeUserObject = JSON.parse(localCoffeeUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        // TODO: Create the object to be saved to the API
        const userToSendToAPI = {

            fullName: user.fullName,
            email: user.email,
            isAdmin: user.isAdmin
        }

        // TODO: Perform the fetch() to POST the object to the API

        return fetch(`http://localhost:8088/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/users")
            })
    }

    return (
        <div className="userCreationFormContainer">
        <form className="userCreationForm">
            <h1 className="ticketForm__title">New User</h1>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Name..."
                        value={user.fullName}
                        onChange={
                            (event) => {
                                const copy = {...user}
                                copy.fullName = event.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset> 
            <fieldset>
                <div className="form-group">
                    <label htmlFor="Email">Email:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Email..."
                        value={user.email}
                        onChange={
                            (event) => {
                                const copy = {...user}
                                copy.email = event.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset> 
            <fieldset>
                <div className="form-group">
                    <label htmlFor="isAdmin">Is This an Admin?:</label>
                    <div>
                    <input
                        required autoFocus
                        type="checkbox"
                        className="admin-checkbox"
                        checked={user.isAdmin}
                        onChange={
                            (event) => {
                                const copy = {...user}
                                copy.isAdmin = event.target.checked
                                update(copy)
                            }
                        } />
                        </div>
                </div>
            </fieldset> 
            <button 
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Submit User
            </button>
        </form>
        </div>
    )
}