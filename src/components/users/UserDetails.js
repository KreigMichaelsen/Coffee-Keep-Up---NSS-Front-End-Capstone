import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

export const UserDetails = () => {
    const {userId} = useParams()
    const [user, updateUser] = useState({})

    useEffect(
        () => {
            fetch(`http://localhost:8088/users`)
            .then(response => response.json())
            .then((data) => {
                const clickedUser = data[userId-1]
                updateUser(clickedUser)
        
            })
        },
        [userId]
    )

    return <section className="user">
    <header>Name: {user?.fullName}</header>
    <div>Email: {user?.email}</div>
    <div>Admin?: {user?.isAdmin ? "Yes" : "No"}</div>
</section>
} 