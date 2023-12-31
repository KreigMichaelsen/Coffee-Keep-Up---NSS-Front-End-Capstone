import { Link, useNavigate } from "react-router-dom"
import "./CoffeeShops.css"

export const CoffeeShop = ({coffeeShopObject, currentUser, getAllCoffeeShops,  }) => {

    const navigate = useNavigate()


    const deleteButton = () => {
        if (currentUser.admin) {
            return <button onClick={() => {
                fetch(`http://localhost:8088/coffeeShops/${coffeeShopObject.id}`, {
                    method: "DELETE"
                })
                .then(() => {
                        getAllCoffeeShops()
                })
            }} className="ticket_delete">Delete</button>
        }
        else {
            return ""
        }
    }

    const AddButton = () => {
        
            return <button
            onClick={() => {
                fetch(`http://localhost:8088/userCoffeeShops?_expand=coffeeShop&userId=${currentUser.id}`, {
                    method:"POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        userId: currentUser.id,
                        coffeeShopId:coffeeShopObject.id,
                        hasVisited: false,
                        rating: 0
                    })
                })
                    .then(response => response.json())
                    .then(() => {
                            getAllCoffeeShops()})
                            
                    }
            }
            ><i className="fa-solid fa-plus "></i></button>
        
        }
    

    return <section className="coffeeShop">
    <h3>{coffeeShopObject.name}</h3>
     <img className="coffeeShopImage" onClick={() => navigate(`/coffeeShops/${coffeeShopObject.id}`)} style={{ width: 400, height: 225 }} src={coffeeShopObject.picture}>
     </img>
     <footer>
        {
            coffeeShopObject.userCoffeeShops.find(shop => shop.userId === currentUser.id )
            ? <><i className="fa-solid fa-check"></i> Added To List! </>
            :  AddButton()
        }
        {
            deleteButton()
        }

        {
            <button onClick={() => navigate(`/coffeeShops/${coffeeShopObject.id}/edit`)}>Edit Coffee Shop</button>
        }
        {/* {
            <button onClick={() => navigate(`/coffeeShops/${coffeeShopObject.id}/review`)}>Leave a Review!</button>
        } */}
     </footer>
 </section>
}