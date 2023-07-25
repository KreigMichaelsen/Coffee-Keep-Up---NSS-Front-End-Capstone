import { useEffect, useState } from "react"

export const UserForm = () => {
    // TODO: Provide initial state for profile
    
    const [profile, updateProfile] = useState({
        address: "",
        phoneNumber: "",
        userId: 0
    })
    const [feedback, setFeedback] = useState("")

    const localCoffeeUser = localStorage.getItem("coffee_user")
    const coffeeUserObject = JSON.parse(localCoffeeUser)

    // TODO: Get employee profile info from API and update state

    useEffect(() => {
        fetch(``)
        .then(respone => respone.json())
        .then((data) => {
                const customerObject = data[0]
                updateProfile(customerObject)
        })
    }, [])


useEffect(() => {
    if (feedback !== "") {
        // Clear feedback to make entire element disappear after 3 seconds
        setTimeout(() => setFeedback(""), 3000);
    }
}, [feedback])



    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        /*
            TODO: Perform the PUT fetch() call here to update the profile.
            Navigate user to home page when done.
        */
       return fetch(`http://localhost:8088/customers/${profile.id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(profile)
       })
            .then(respone => respone.json())
            .then(() => {
                setFeedback("Customer profile successfully saved")
            })
    }

    return (
        
        <form className="profile">
            <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
                {feedback}
            </div>
            <h2 className="profile__title">Edit User</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="specialty">Address:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={profile.address}
                        onChange={
                            (event) => {
                                // TODO: Update specialty property
                                const copy = {...profile}
                                copy.address = event.target.value
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Phone Number:</label>
                    <input type="text"
                        className="form-control"
                        value={profile.phoneNumber}
                        onChange={
                            (event) => {
                                // TODO: Update specialty property
                                const copy = {...profile}
                                copy.phoneNumber = (event.target.value, 2)
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save Profile
            </button>
        </form>
    )
}