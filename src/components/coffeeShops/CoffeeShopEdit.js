import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"


export const CoffeeShopEdit = () => {

    const [loading, setLoading] = useState(false);
    const [coffeeShop, assignCoffeeShop] = useState({
        name: "",
        address: "",
        phoneNumber: "",
        picture: ""
    })

   
    const { coffeeShopId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }, []);
   
    useEffect(
        () => {
            fetch(`http://localhost:8088/coffeeShops/${coffeeShopId}`)
            .then(respone => respone.json())
            .then((data) => {
                assignCoffeeShop(data)
            })
        },
        [coffeeShopId] 
    ) 

    // useEffect(() => {
    //     if (feedback !== "") {
    //         // Clear feedback to make entire element disappear after 3 seconds
    //         setTimeout(() => setFeedback(""), 3000);
    //     }
    // }, [feedback])
    

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
                // setFeedback("Coffee Shop Updated Successfully!")
            })
        
    }


    return <div className="container">
    {loading ? (
      <div className="loader-container">
      </div>
    ) : (
      <div className="coffeeShopEditContainer">
    <form className="ticketForm">
        <h1 className="ticketForm__title">Edit Coffee Shop</h1>
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
    </div>
         )}
    </div>
}