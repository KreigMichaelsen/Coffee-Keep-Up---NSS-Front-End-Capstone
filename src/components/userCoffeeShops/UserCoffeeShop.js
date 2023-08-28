import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

export const UserCoffeeShop = ({id, fullName, email, getAllFilteredUserCoffeeShops, 
    userCoffeeShop, currentUser, name, address, phoneNumber, picture, hasVisited, rating }) => {

    const [reviews, setReview] = useState([])


    const navigate = useNavigate()

    const removeButton = () => {
       
            return <button onClick={() => {
                fetch(`http://localhost:8088/userCoffeeShops/${userCoffeeShop.id}`, {
                    method: "DELETE"
                })
                .then(() => {
                    getAllFilteredUserCoffeeShops()
                })
            }} className="userCoffeeShop_delete">
                <i className="fa-solid fa-minus"></i> 
            </button>
        
    }

    // const getUserCoffeeShopReviews = () => {
    //     fetch(`http://localhost:8088/reviews?_expand=user&_expand=coffeeShop`)
    //     .then(respone => respone.json())
    //     .then((reviewArray) => {
    //         setReview(reviewArray)
    //     })
    // }

    // useEffect(
    //     () => {
    //         getUserCoffeeShopReviews()
           
    //     },
    //     [] 
    // ) 

    // const findMatchingReview = () => {
    //     let matchingReviewArray = []
    //     for ( const review of reviews) {
    //         if (review.userId === currentUser.id && review.coffeeShopId === userCoffeeShop.coffeeShopId) {
    //             matchingReviewArray.push(review)
    //             console.log(matchingReviewArray)
    //         }
    //         else {
    //             return ""
    //         }
                
    //     }
    // }



    
   


    return <section className="user-coffee-shop">
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
        {
            <button onClick={() => navigate(`/userCoffeeShops/${userCoffeeShop.id}/edit`)}>
            Update Status
        </button>
        }
    </footer>
</section>
}