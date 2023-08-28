import { Link, useNavigate } from "react-router-dom"

export const User = ({userObject, currentUser, getAllUsers}) => {
    const navigate = useNavigate()

    const deleteButton = () => {
        if (currentUser.admin) {
            return <button onClick={() => {
                fetch(`http://localhost:8088/users/${userObject.id}`, {
                    method: "DELETE"
                })
                .then(() => {
                        getAllUsers()
                })
            }} className="user_delete">Delete</button>
        }
        else {
            return ""
        }
    }


    return <section className="user">
    <div>Name: {userObject.fullName}</div>
    <div>Email: {userObject.email}</div>
    <div>Admin?: {userObject.isAdmin ? "Yes" : "No"}</div>
    <footer>
        <button onClick={() => navigate(`/users/${userObject.id}/edit`)}>
            Edit User
        </button>
        {
          deleteButton()  
        }
       
        
    </footer>
</section>
}