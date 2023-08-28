import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const UserCoffeeShopEdit = () => {
    const [loading, setLoading] = useState(false);
    const [userCoffeeShop, assignUserCoffeeShop] = useState({
        hasVisited: false,
        userId: 0,
        coffeeShopId: 0,
        timeStamp: 0

    })

   
    const { userCoffeeShopId } = useParams()
    const navigate = useNavigate()

    const localCoffeeUser = localStorage.getItem("coffee_user")
    const coffeeUserObject = JSON.parse(localCoffeeUser)

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }, []);

   
    useEffect(
        () => {
            fetch(`http://localhost:8088/userCoffeeShops/${userCoffeeShopId}`)
            .then(respone => respone.json())
            .then((data) => { 
                assignUserCoffeeShop(data)
            })
        },
        [userCoffeeShopId] 
    ) 

    

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        return fetch(`http://localhost:8088/userCoffeeShops/${userCoffeeShop.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userCoffeeShop)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/userCoffeeShops")
              
                // setFeedback("Coffee Shop Updated Successfully!")
            })
        // TODO: Write the fetch for the PUT request to replace the object being edited
    }


    return  <div className="review-container">
    {loading ? (
      <div className="loader-container">
      </div>
    ) : (
      <div className="userCoffeeShopEditContainer">
    <form className="ticketForm">
        <h2 className="ticketForm__title">Update Status</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="hasVisited">Have You Been To This Shop?:</label>
                <div>
                <input
                    required autoFocus
                    type="checkbox"
                    className="visited-checkbox"
                    checked={userCoffeeShop.hasVisited}
                    onChange={
                        (event) => {
                            const copy = { ...userCoffeeShop }
                            copy.hasVisited = event.target.checked
                            assignUserCoffeeShop(copy)
                        }
                    }></input>
                    </div>
            </div>
        </fieldset>
        <button
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
            className="btn btn-primary">
            Save 
        </button>
    </form>
    </div>
         )}
    </div>
}