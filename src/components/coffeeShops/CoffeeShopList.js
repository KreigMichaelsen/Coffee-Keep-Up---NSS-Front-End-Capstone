import { useEffect, useState } from "react"
import "./CoffeeShops.css"
import { Link, useNavigate } from "react-router-dom"
import { CoffeeShop } from "./CoffeeShop"

export const CoffeeShopList = ({ searchTermState }) => {
    const [coffeeShops, setCoffeeShops] = useState([])
    const [filteredCoffeeShops, setFilteredCoffeeShops] = useState([])

    const navigate = useNavigate()


    const localCoffeeUser = localStorage.getItem("coffee_user")
    const coffeeUserObject = JSON.parse(localCoffeeUser)

    


    useEffect(
        () => {
            getAllCoffeeShops()
           
        },
        [] 
    ) 

    useEffect(
        () => {
            setFilteredCoffeeShops(coffeeShops)
        },
        [coffeeShops] 
    ) 


    useEffect(
        ()=> {
            const searchedShops = coffeeShops.filter(coffeeShop => {
                return coffeeShop.name.toLowerCase().startsWith(searchTermState.toLowerCase())
            })
            setFilteredCoffeeShops(searchedShops)
        },
        [searchTermState]
    )


    const getAllCoffeeShops = () => {
        fetch(`http://localhost:8088/coffeeShops?_embed=userCoffeeShops`)
        .then(respone => respone.json())
        .then((coffeeShopArray) => {
            setCoffeeShops(coffeeShopArray)
        })
    }



    return <>
        {
            <>
            <button className="createCoffeeShopButton" onClick={() => navigate("/coffeeShops/create")}>Create Coffee Shop</button>
            </>
        }
        
   

        <article className="coffeeShops" >
            {
                filteredCoffeeShops.map(
                    (filteredCoffeeShop) => <CoffeeShop key={`coffeeShop--${filteredCoffeeShop.id}`} 
                    getAllCoffeeShops={getAllCoffeeShops}
                     currentUser={coffeeUserObject}
                      coffeeShopObject={filteredCoffeeShop} 
                     
              
                      />
                    
                )
            }

        </article>
    </>
}
