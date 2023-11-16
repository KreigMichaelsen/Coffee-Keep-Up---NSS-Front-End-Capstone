import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"


export const UserEdit = () => {
    const [loading, setLoading] = useState(false);
    
    const [user, assignUser] = useState({
        fullName: "",
        email: "",
        isAdmin: false,
    })

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }, []);
   
    const { userId } = useParams()
    const navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/users/${userId}`)
            .then(response => response.json())
            .then((data) => {
                assignUser(data)
            })
        },
        [userId] 
    ) 

    

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        return fetch(`http://localhost:8088/users/${user.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/users")
              
            })
    }


    return <div className="container">
    {loading ? (
      <div className="loader-container">
      </div>
    ) : (
      <div className="userEditFormContainer">
    <form className="userEditForm">
        <h1 className="userEditForm__title">Edit User</h1>
        <fieldset>
            <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                    required autoFocus
                    type="text"
                    className="form-control"
                    value={user.fullName}
                    onChange={
                        (event) => {
                            const copy = { ...user }
                            copy.fullName = event.target.value
                            assignUser(copy)
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
                    value={user.email}
                    onChange={
                        (event) => {
                            const copy = { ...user }
                            copy.email = event.target.value
                            assignUser(copy)
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
                    checked={user.isAdmin}
                    onChange={
                        (event) => {
                            const copy = { ...user }
                            copy.isAdmin = event.target.checked
                            assignUser(copy)
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
    </div>
          )}
    </div>
}