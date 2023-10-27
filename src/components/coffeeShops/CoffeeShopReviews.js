import { useEffect, useState } from "react"
import "./CoffeeShops.css"
import { Link, useNavigate, useParams } from "react-router-dom"
import { CoffeeShopReview } from "./CoffeeShopReview"

export const CoffeeShopReviews = ({getCoffeeShop }) => {
    const [reviews, setReviews] = useState([])
    const [filteredReviews, setFilteredReviews] = useState([])
   
   

    const navigate = useNavigate()
    const { coffeeShopId } = useParams()



    const localCoffeeUser = localStorage.getItem("coffee_user")
    const coffeeUserObject = JSON.parse(localCoffeeUser)

    


    useEffect(
        () => {
            getAllReviews()
           
        },
        [] 
    ) 

    useEffect(
        () => {
            setFilteredReviews(reviews)
        },
        [reviews] 
    ) 


 


    const getAllReviews = () => {
        fetch(`http://localhost:8088/reviews?_expand=user&_expand=coffeeShop&coffeeShopId=${coffeeShopId}`)
        .then(respone => respone.json())
        .then((reviewArray) => {
            setFilteredReviews(reviewArray)
        })
    }

    


    return <>
        {
            // <>
            // <button onClick={() => navigate("/coffeeShops/create")}>Create Coffee Shop</button>
            // </>
        }
        
   

        <article className="reviews" >
            {
                filteredReviews.map(
                    (filteredReview) => <CoffeeShopReview key={`review--${filteredReview.id}`} 
                    getAllReviews={getAllReviews}
                     currentUser={coffeeUserObject}
                      reviewObject={filteredReview} 
                      getCoffeeShop={getCoffeeShop}
                    
                     
              
                      />
                    
                )
            }

        </article>
    </>
}