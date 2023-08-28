import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./HomePage.css"

export const HomePageUserCoffeeShop = ({id, fullName, email, getAllFilteredUserCoffeeShops, getAllCoffeeShops,
    userCoffeeShop, currentUser, name, address, phoneNumber, picture, hasVisited, rating, getRandomCoffeeShops, filteredState, setRandom }) => {


    const [filteredUserCoffeeShops, setFilteredUserCoffeeShops] = useState([filteredState])
    const navigate = useNavigate()

    useEffect(
        () => {

            setRandom(false)
            
        },
        [filteredUserCoffeeShops]
    )

    const removeButton = () => {
       
            return <button onClick={() => {
                fetch(`http://localhost:8088/userCoffeeShops/${userCoffeeShop.id}`, {
                    method: "DELETE"
                })
                .then(() => {
                 
                    setFilteredUserCoffeeShops(getAllFilteredUserCoffeeShops())
                    getAllCoffeeShops()
                    
                })
                
            }} className="userCoffeeShop_delete">
                <i class="fa-solid fa-minus"></i> 
            </button>
        
    }


    return <section className="homePageUserCoffeeShop">
    <h3>{name}</h3>
    <div>
    <img className="userCoffeeShopImage" onClick={() => navigate(`/coffeeShops/${userCoffeeShop.coffeeShopId}`)} style={{ width: 400, height: 225 }} src={picture}></img>
    </div>
    <div>
        Visited?: {userCoffeeShop.hasVisited ? "Yes" : "No"} 
                  
    </div>
    <footer>
        {
            removeButton()
        }
        <button onClick={() => navigate(`/userCoffeeShops/${userCoffeeShop.id}/edit`)}>
            Update Status
        </button>

    </footer>
</section>
}