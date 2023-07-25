import { useEffect, useState } from "react"
import "./CoffeeShops.css"
import { Link, useNavigate } from "react-router-dom"
import { CoffeeShop } from "./CoffeeShop"

export const CoffeeShopList = ({ searchTermState }) => {
    const [coffeeShops, setCoffeeShops] = useState([])
    const [emergency, setEmergency] = useState(false)
    const [openOnly, updateOpenOnly] = useState(false)
    const navigate = useNavigate()


    const localCoffeeUser = localStorage.getItem("coffee_user")
    const coffeeUserObject = JSON.parse(localCoffeeUser)


    useEffect(
        () => {
            // getAllTickets()
            
            fetch(`http://localhost:8088/coffeeShops`)
            .then(respone => respone.json())
            .then((coffeeShopArray) => {
                setCoffeeShops(coffeeShopArray)
            })
        },
        [] // When this array is empty, you are observing initial component state
    ) 



    useEffect(
        ()=> {
            const searchedShops = coffeeShops.filter(coffeeShop => {
                return coffeeShop.name.toLowerCase().startsWith(searchTermState.toLowerCase())
            })
            setCoffeeShops(searchedShops)
        },
        [ searchTermState]
    )

    // useEffect(
    //     () => {
    //         if (emergency) {
    //             const emergencyTickets = tickets.filter(ticket => ticket.emergency === true)
    //             setFiltered(emergencyTickets)
    //         }
    //         else {
    //             setFiltered(tickets)
    //         }
    //     },
    //     [emergency]
    // )

    const getAllTickets = () => {
        fetch(`http://localhost:8088/coffeeShops`)
        .then(respone => respone.json())
        .then((coffeeShopArray) => {
            setCoffeeShops(coffeeShopArray)
        })
    }

    

    // useEffect(
    //     () => {
    //         if (coffeeUserObject.admin) {
    //             // for employees
    //             setFiltered(coffeeShops)
    //         }
    //         else {
    //             // for customers
    //             const myCoffeeShops = coffeeShops.filter(coffeeShop => coffeeShops.userId === coffeeUserObject.id)
    //             setFiltered(myCoffeeShops)
    //         }
    //     },
    //     [coffeeShops]
    // )

    // useEffect(
    //     () => {
    //         if(openOnly) {
    //             const openTicketArray = tickets.filter(ticket => {
    //                 return ticket.userId === coffeeUserObject.id && ticket.dateCompleted === ""
    //             })
    //             setFiltered(openTicketArray)
    //         }
    //         else {
    //             const myTickets = tickets.filter(ticket => ticket.userId === coffeeUserObject.id)
    //             setFiltered(myTickets)
    //         }
    //     },
    //     [openOnly]
    // )

    return <>
        {
            <>
            <button onClick={ () => { setEmergency(true) } } >Visited</button>
            <button onClick={ () => { setEmergency(false) } } >Show All</button>
            <button onClick={() => navigate("/coffeeShops/create")}>Create Coffee Shop</button>
            <button onClick={() => updateOpenOnly(true)}>Open Ticket</button>
            <button onClick={() => updateOpenOnly(false)}>All My Tickets</button>
            </>
        }
        
        <h2>Coffee Shops</h2>

        <article className="coffeeShops" >
            {
                coffeeShops.map(
                    (coffeeShop) => <CoffeeShop key={`coffeeShop--${coffeeShop.id}`} 
                    getAllTickets={getAllTickets}
                     currentUser={coffeeUserObject}
                      coffeeShopObject={coffeeShop} 
                      />
                    
                )
            }

        </article>
    </>
}
