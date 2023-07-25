import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const CoffeeShopForm = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
    const [coffeeShop, update] = useState({
        name: "",
        address: "",
        phoneNumber: "",
        picture: ""

    })
    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the ticket list
    */
   const navigate = useNavigate()

   const localCoffeeUser = localStorage.getItem("coffee_user")
    const coffeeUserObject = JSON.parse(localCoffeeUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        // TODO: Create the object to be saved to the API
        const shopToSendToAPI = {

            name: coffeeShop.name,
            address: coffeeShop.address,
            phoneNumber: coffeeShop.phoneNumber,
            picture: coffeeShop.picture
        }

        // TODO: Perform the fetch() to POST the object to the API

        return fetch(`http://localhost:8088/coffeeShops`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(shopToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/coffeeShops")
            })
    }

    return (
        <form className="ticketForm">
            <h2 className="ticketForm__title">New Coffee Shop</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Name..."
                        value={coffeeShop.name}
                        onChange={
                            (event) => {
                                const copy = {...coffeeShop}
                                copy.name = event.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset> 
            <fieldset>
                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Address..."
                        value={coffeeShop.address}
                        onChange={
                            (event) => {
                                const copy = {...coffeeShop}
                                copy.address = event.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset> 
            <fieldset>
                <div className="form-group">
                    <label htmlFor="Phone Number">Phone Number:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Phone Number..."
                        value={coffeeShop.phoneNumber}
                        onChange={
                            (event) => {
                                const copy = {...coffeeShop}
                                copy.phoneNumber = event.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset> 
            <fieldset>
                <div className="form-group">
                    <label htmlFor="Picture">Picture:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Enter Image URL Here..."
                        value={coffeeShop.picture}
                        onChange={
                            (event) => {
                                const copy = {...coffeeShop}
                                copy.picture = event.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset> 
            <button 
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Submit Coffee Shop
            </button>
        </form>
    )
}