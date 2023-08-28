import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const CoffeeShopReviewCreation = () => {
    const [loading, setLoading] = useState(false);
    const [coffeeShop, addCoffeeShopReviewProperties] = useState({
        hasVisited: false,
        userId: 0,
        coffeeShopId: 0,
        rating: 0,
        comment: "",
        timeStamp: 0

    })

   
    const { coffeeShopId } = useParams()
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
            fetch(`http://localhost:8088/coffeeShops/${coffeeShopId}`)
            .then(respone => respone.json())
            .then((data) => { 
                addCoffeeShopReviewProperties(data)
            })
        },
        [coffeeShopId] 
    ) 

    

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        

      
        const reviewToSendToAPI = {

            userId: coffeeUserObject.id,
            coffeeShopId: coffeeShop.id,
            rating: coffeeShop.rating,
            comment: coffeeShop.comment,
            timeStamp: Date.now()
            
        }

        return fetch(`http://localhost:8088/reviews`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reviewToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                navigate(`/coffeeShops/${coffeeShopId}`)
                
            })
        
    }


    return  <div className="review-container">
    {loading ? (
      <div className="loader-container">
      </div>
    ) : (
      <div className="coffeeShopReviewCreationContainer">
    <form className="ticketForm">
        <h2 className="ticketForm__title">Review {coffeeShop.name}</h2>
        <fieldset>
            <div>
            <label htmlFor="Rating">Rating:</label>
            </div>
            <div onChange={
                        (event) => {
                            const copy = { ...coffeeShop }
                            copy.rating = parseInt(event.target.value)
                            addCoffeeShopReviewProperties(copy)
                        }
                    } className="rate">
                 <input type="radio" id="star5" name="rate" value="5" />
                 <label for="star5" title="text">5 stars</label>
                 <input type="radio" id="star4" name="rate" value="4" />
                 <label for="star4" title="text">4 stars</label>
                 <input type="radio" id="star3" name="rate" value="3" />
                 <label for="star3" title="text">3 stars</label>
                 <input type="radio" id="star2" name="rate" value="2" />
                 <label for="star2" title="text">2 stars</label>
                 <input type="radio" id="star1" name="rate" value="1" />
                 <label for="star1" title="text">1 star</label>
            </div>
            
        </fieldset>
        <fieldset>
            <div className="form-group">
                <div>
                <label htmlFor="comment">Comment:</label>
                </div>
                <textarea
                    required autoFocus
                    type="textarea"
                    className="form-control"
                    value={coffeeShop.comment}
                    onChange={
                        (event) => {
                            const copy = { ...coffeeShop }
                            copy.comment = event.target.value
                            addCoffeeShopReviewProperties(copy)
                        }
                    }></textarea>
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