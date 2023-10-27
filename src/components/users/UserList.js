import { useEffect, useState } from "react"
import "./Users.css"
import { User } from "./User"
import { useNavigate } from "react-router-dom"

export const UserList = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const localCoffeeUser = localStorage.getItem("coffee_user")
    const coffeeUserObject = JSON.parse(localCoffeeUser)

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }, []);


    useEffect(
        () => {
            fetch(`http://localhost:8088/users`)
            .then(response => response.json())
            .then((userArray) => {
                setUsers(userArray)
            })
        },
        []
    )

    const getAllUsers = () => {
        fetch(`http://localhost:8088/users`)
        .then(respone => respone.json())
        .then((userArray) => {
            setUsers(userArray)
        })
    }

    return <>
    <div className="container">
      {loading ? (
        <div className="loader-container">
        </div>
      ) : (
        <div className="userListContainer">
             <img className="userListPage-image" src="/Images/Users Page.png" alt="coffeeShopsLogo"></img>
            <div className="userListHeaderandButtons">
            <h1>Users</h1>
            <button onClick={() => navigate("/users/create")}>Create User</button>
            </div>
            <article className="users">
                {
                    users.map(user => <User key={`user--${user.id}`} 
                    userObject = {user}
                    currentUser={coffeeUserObject}
                    getAllUsers={getAllUsers} />)

                }
    
            </article>
            <footer className="usersFooter"></footer>
        </div>
        
          )}
    </div>
    </>
}