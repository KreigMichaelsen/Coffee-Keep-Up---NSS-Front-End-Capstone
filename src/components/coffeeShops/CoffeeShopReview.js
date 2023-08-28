import { Link, useNavigate } from "react-router-dom"
import "./CoffeeShops.css"

export const CoffeeShopReview = ({reviewObject, currentUser, getAllReviews, getCoffeeShop}) => {

   

    const navigate = useNavigate()


    const deleteButton = () => {
        if (currentUser.id === reviewObject.userId) {
            return <button onClick={() => {
                fetch(`http://localhost:8088/reviews/${reviewObject.id}?`, {
                    method: "DELETE"
                })
                .then(() => {
                    getAllReviews()
                   
                        
                })
                .then(() => {
                    getCoffeeShop()
                    
                })
            }} className="ticket_delete">Delete</button>
        }
        else {
            return ""
        }
    }


    return <section className="review">
    <h3>{reviewObject?.user?.fullName}</h3>
    <div className="rating"><i className="fa-solid fa-mug-hot"></i>{reviewObject?.rating}</div>
    <div className="reviewComment">{reviewObject?.comment}</div>
     <footer>
        {
          
        }
        {
            deleteButton()
        }

        {
            // <button onClick={() => navigate(`/coffeeShops/${coffeeShopObject.id}/edit`)}>Edit Coffee Shop</button>
        }
        {
            // <button onClick={() => navigate(`/coffeeShops/${coffeeShopObject.id}/review`)}>Leave a Review!</button>
        }
     </footer>
 </section>
}