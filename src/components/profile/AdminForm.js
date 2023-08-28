import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./Profile.css"


export const AdminForm = () => {
    // TODO: This state object should not be blank
    const [loading, setLoading] = useState(false);
   


    const [profile, updateProfile] = useState({
        fullName: "",
        email: "",
        isAdmin: false,
    })

    const localCoffeeUser = localStorage.getItem("coffee_user")
    const coffeeUserObject = JSON.parse(localCoffeeUser)

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }, []);

    // const [feedback, setFeedback] = useState("")
    // TODO: What is the variable in which you stored the route parameter?

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
        [] // When this array is empty, you are observing initial component state
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
                // window.alert("Profile successfully saved")
                // setFeedback("Coffee Shop Updated Successfully!")
            })
        // TODO: Write the fetch for the PUT request to replace the object being edited
    }


    return <div className="container">
    {loading ? (
      <div className="loader-container">
      </div>
    ) : (
      <div className="adminEditFormContainer">
        <form className="adminEditForm">
        <h1 className="adminEditFormHeader">Edit User</h1> 
        <fieldset>
            <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                    required autoFocus
                    type="text"
                    className="form-control"
                    value={profile?.fullName}
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
                    value={profile?.email}
                    onChange={
                        (event) => {
                            const copy = { ...profile }
                            copy.email = event.target.value
                            updateProfile(copy)
                        }
                    }></input>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="isAdmin">Admin?:</label>
                <div>
                <input
                    required autoFocus
                    type="checkbox"
                    className="admin-checkbox"
                    checked={profile?.isAdmin}
                    onChange={
                        (event) => {
                            const copy = { ...profile }
                            copy.isAdmin = event.target.checked
                            updateProfile(copy)
                        }
                    }></input>
                    </div>
            </div>
        </fieldset>
        
        <button
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
            className="btn btn-primary">
            Save Edits
        </button>
    </form>
    <footer className="profileFooter"></footer>
    </div>
         )}
    </div>
}