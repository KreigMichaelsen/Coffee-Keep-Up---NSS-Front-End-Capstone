import { useEffect, useState } from "react"
import "./UserCoffeeShop.css"
import { UserCoffeeShop } from "./UserCoffeeShop"
import { useNavigate } from "react-router-dom"

export const UserCoffeeShops = () => {
   
    const [userCoffeeShops, setUserCoffeeShops] = useState([])
    const [filteredUserCoffeeShops, setFilteredUserCoffeeShops] = useState([])
    const [hasVisited, setHasVisited] = useState([])
    
    const navigate = useNavigate()



    const localCoffeeUser = localStorage.getItem("coffee_user")
    const coffeeUserObject = JSON.parse(localCoffeeUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/userCoffeeShops?_expand=coffeeShop&userId=${coffeeUserObject.id}`)
            .then(response => response.json())
            .then((UserCoffeeShopArray) => {
                setUserCoffeeShops(UserCoffeeShopArray)
                setFilteredUserCoffeeShops(UserCoffeeShopArray)
               
            })
           
        },
        []
    )

    useEffect(
        () => {
            if (hasVisited) {
                const visitedCoffeeShops = userCoffeeShops.filter(userCoffeeShop => userCoffeeShop.hasVisited === true)
                setFilteredUserCoffeeShops(visitedCoffeeShops)
            }
            else {
                const visitedCoffeeShops = userCoffeeShops.filter(userCoffeeShop => userCoffeeShop.hasVisited === false)
                setFilteredUserCoffeeShops(visitedCoffeeShops)
                
            }
        },
        [hasVisited]
    )

   

    const getAllFilteredUserCoffeeShops = () => {
        fetch(`http://localhost:8088/userCoffeeShops?_expand=coffeeShop&userId=${coffeeUserObject.id}`)
        .then(respone => respone.json())
        .then((filteredUserCoffeeShopArray) => {
            setFilteredUserCoffeeShops(filteredUserCoffeeShopArray)
        })
    }

    return <>
    <div className="userCoffeeShopsHeaderAndButtonsContainer">
    <h1>My List</h1>      
    <button onClick={ () => { setHasVisited(true) } } >Visited</button>
    <button onClick={ () => { setHasVisited(false) } } >Haven't Visited</button>
    <button onClick={ () => { getAllFilteredUserCoffeeShops() } } >Show All</button> 
    </div>
    
    <article className="userCoffeeShops">
        {
            filteredUserCoffeeShops.map(userCoffeeShop => <UserCoffeeShop key={`userCoffeeShop--${userCoffeeShop.id}`} 
            id={userCoffeeShop.id} 
            name={userCoffeeShop.coffeeShop.name}
            address={userCoffeeShop.coffeeShop.address}
            phoneNumber={userCoffeeShop.coffeeShop.phoneNumber}
            picture={userCoffeeShop.coffeeShop.picture}
            hasVisited={userCoffeeShop.hasVisited}
            rating={userCoffeeShop.rating}
            getAllFilteredUserCoffeeShops={getAllFilteredUserCoffeeShops}
            userCoffeeShop={userCoffeeShop} 
            currentUser={coffeeUserObject}
        
             />)
        }
    
    </article>
    </>
}