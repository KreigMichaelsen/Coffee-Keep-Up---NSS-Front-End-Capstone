import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { CoffeeShopReviews } from "./CoffeeShopReviews"


export const CoffeeShopDetails = () => {
    const {coffeeShopId} = useParams()
    const [coffeeShop, updateCoffeeShop] = useState({})
    const [isReviewed, updateReviewed] = useState({})
    

    const navigate = useNavigate()

    const localCoffeeUser = localStorage.getItem("coffee_user")
    const coffeeUserObject = JSON.parse(localCoffeeUser)

    useEffect(
        () => {
            getCoffeeShop()
        
        },
        []
    )

    useEffect(
        () => {
            getCoffeeShop()
        
        },
        [isReviewed]
    )
   


    const getCoffeeShop = () => {
        fetch(`http://localhost:8088/coffeeShops/${coffeeShopId}?_embed=userCoffeeShops&_embed=reviews`)
        .then(respone => respone.json())
        .then((data) => {
            const singleCoffeeShop = data
            updateCoffeeShop(singleCoffeeShop)

            const reviewed = singleCoffeeShop.reviews.find(review => review.userId === coffeeUserObject.id)
           reviewed? updateReviewed(true): updateReviewed(false)
           
            
            // console.log(singleCoffeeShop?.reviews)
            
           
            
        })
        .then(() => {
            // console.log(singleCoffeeShop)
            
            // updateCoffeeShop(singleCoffeeShop)
        })
    }



    const AddButton = () => {
        
        return <button
        onClick={() => {
            fetch(`http://localhost:8088/userCoffeeShops?_expand=coffeeShop&userId=${coffeeUserObject.id}`, {
                method:"POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: coffeeUserObject.id,
                    coffeeShopId:coffeeShop.id,
                    hasVisited: false,
                    rating: 0
                })
            })
            .then(response => response.json())
            .then(() => {
                getCoffeeShop()
                        
            })
        }}
        ><i className="fa-solid fa-plus "></i></button>
    
    }

    return <section className="coffeeShopDetailsContainer">
    
    <h1 className="coffeeShopDetailsHeader">{coffeeShop?.name}</h1>
    <div className="coffeeShopDetailsImageContainer">
    <div className="coffeeShopDetailsImageAndButtonsContainer">
        <img className="coffeeShopDetailsImage" src={coffeeShop.picture}></img>
        <div className="coffeeShopDetailsButtons">
        {
            coffeeShop?.userCoffeeShops?.find(shop => shop.userId === coffeeUserObject.id )
            ? <><i className="fa-solid fa-check"></i> Added To List! </>
            :  AddButton()
        }
        { isReviewed
            ? <><i className="fa-solid fa-check"></i> Reviewed! </>
             :
            <button onClick={() => navigate(`/coffeeShops/${coffeeShop.id}/review`)}>Leave a Review!</button>
        }
        {<button onClick={() => navigate(`/coffeeShops/${coffeeShop.id}/edit`)}>Edit Coffee Shop</button>}
        </div>
    </div>
        <div className="coffeeShopInfoContainer">
            <div className="coffeeShopInfo">
                <h1>Details</h1>
                <div className="coffeeShopInfoText">
                <div><i class="fa-solid fa-phone"></i> {coffeeShop?.phoneNumber}</div>
                <div><i class="fa-solid fa-map"></i> {coffeeShop?.address}</div>
                <div><i class="fa-solid fa-circle-info"></i> {coffeeShop?.description}</div>
                </div>
             </div>
        </div>
    </div>
    
   
    <div>
        <h2 className="coffeeShopReviewsHeader">Reviews</h2>
        <CoffeeShopReviews getCoffeeShop={getCoffeeShop}/>
    </div>
    <footer className="coffeeShopDetailsFooter"></footer>
  

  

    
    </section>
}