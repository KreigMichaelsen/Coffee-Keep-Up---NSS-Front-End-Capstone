import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

import { useState, useEffect } from "react";


export const AdminNav = () => {
   
    const navigate = useNavigate()

    const localCoffeeUser = localStorage.getItem("coffee_user")
    const coffeeUserObject = JSON.parse(localCoffeeUser)

   

    return (
       
        <ul className="navbar">
            <li className="navbar__item">
                <Link className="navbar__link" to="/home">
                <img src="/Images/coffeeshop (1).png" alt="coffeeLogo" style={{ width: 125, height: 125}}></img></Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/coffeeShops">Coffee Shops</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/userCoffeeShops">My List</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/users">Users</Link>
            </li>
            <li className="navbar__item ">
                <Link className="navbar__link" to="profile" >Profile</Link>
            </li>

            {
                localStorage.getItem("coffee_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("coffee_user")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
        
    )
}