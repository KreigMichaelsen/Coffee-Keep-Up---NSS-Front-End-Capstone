import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"


export const CoffeeShopEdit = () => {
    // TODO: This state object should not be blank
    const [coffeeShop, assignCoffeeShop] = useState({
        name: "",
        address: "",
        phoneNumber: "",
        picture: ""
    })

    // TODO: What is the variable in which you stored the route parameter?
    const { coffeeShopId } = useParams()
    const navigate = useNavigate()

    // TODO: Get the ticket state from the API.
    useEffect(
        () => {
            fetch(`http://localhost:8088/coffeeShops/${coffeeShopId}`)
            .then(respone => respone.json())
            .then((data) => {
                assignCoffeeShop(data)
            })
        },
        [coffeeShopId] // When this array is empty, you are observing initial component state
    ) 

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        return fetch(`http://localhost:8088/coffeeShops/${coffeeShop.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(coffeeShop)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/coffeeShops")
            })
        // TODO: Write the fetch for the PUT request to replace the object being edited
    }


    return <form className="ticketForm">
        <h2 className="ticketForm__title">Edit Coffee Shop</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                    required autoFocus
                    type="text"
                    className="form-control"
                    value={coffeeShop.name}
                    onChange={
                        (event) => {
                            const copy = { ...coffeeShop }
                            copy.name = event.target.value
                            assignCoffeeShop(copy)
                        }
                    }></input>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="address">Address:</label>
                <input
                    required autoFocus
                    type="text"
                    className="form-control"
                    value={coffeeShop.address}
                    onChange={
                        (event) => {
                            const copy = { ...coffeeShop }
                            copy.address = event.target.value
                            assignCoffeeShop(copy)
                        }
                    }></input>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="Phone Number">Phone Number:</label>
                <input
                    required autoFocus
                    type="text"
                    className="form-control"
                    value={coffeeShop.phoneNumber}
                    onChange={
                        (event) => {
                            const copy = { ...coffeeShop }
                            copy.phoneNumber = event.target.value
                            assignCoffeeShop(copy)
                        }
                    }></input>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="description">Image URL:</label>
                <input
                    required autoFocus
                    type="text"
                    className="form-control"
                    value={coffeeShop.picture}
                    onChange={
                        (event) => {
                            const copy = { ...coffeeShop }
                            copy.picture = event.target.value
                            assignCoffeeShop(copy)
                        }
                    }></input>
            </div>
        </fieldset>
        
        <button
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
            className="btn btn-primary">
            Save Edits
        </button>
    </form>
}