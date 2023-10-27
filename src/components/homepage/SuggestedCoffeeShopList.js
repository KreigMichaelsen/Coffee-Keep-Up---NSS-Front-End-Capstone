import { useEffect, useState } from "react"
import "./HomePage.css"
import { Link, useNavigate } from "react-router-dom"
import { SuggestedCoffeeShop } from "./SuggestedCoffeeShop"
import { HomePageUserCoffeeShop } from "../homepage/HomePageUserCoffeeShop"

export const SuggestedCoffeeShopList = () => {
    const [coffeeShops, setCoffeeShops] = useState([])
    const [randomCoffeeShops, setRandomCoffeeShops] = useState([])
    const [random, setRandom] = useState(false)
    const [filteredUserCoffeeShops, setFilteredUserCoffeeShops] = useState([])
    const [hasVisited, setHasVisited] = useState([])


    const localCoffeeUser = localStorage.getItem("coffee_user")
    const coffeeUserObject = JSON.parse(localCoffeeUser)




    useEffect(
        () => {
            getAllCoffeeShops()
            
        },
        []
    )

    useEffect(
        () => {
            if(random){
                getRandomCoffeeShops()
            }
        },
        [random, filteredUserCoffeeShops]
    )


    // place to store four numbers (array)
    // loop that runs while that array length is less than 4
    // extract random number
    // determine if number is in array already 
    // if not push into array 
    // return array to wherever its being called
    // loop through ids, and make four fetch calls
    // then set to randomCoffeeshops state 

    // const testRandom = (element, id) => {
    //     console.log("test id ", element.id, "random id ", id)
    //     console.log(element.id === id)
    //     return element.id === id
    // }


    const getRandomCoffeeShops = async () => {
        let randomNumberArray = []

        while (randomNumberArray.length < 3) {

            const randomNumber = Math.floor(Math.random() * coffeeShops.length)
            
          
            if (randomNumberArray.length > 0) {
            const test = randomNumberArray.some((element) => element.id === coffeeShops[randomNumber].id)
            console.log(test)
                if (!test){
                    console.log("setting new coffee shop ", coffeeShops[randomNumber].id)
                    randomNumberArray.push(coffeeShops[randomNumber])
                } console.log(randomNumberArray)
            } else {
                randomNumberArray.push(coffeeShops[randomNumber])
            }  console.log(randomNumberArray)

            
        }
        
       
        setRandomCoffeeShops(randomNumberArray)
    }

useEffect(
    () => {
        fetch(`http://localhost:8088/userCoffeeShops?_expand=coffeeShop&userId=${coffeeUserObject.id}`)
            .then(response => response.json())
            .then((filteredUserCoffeeShopArray) => {
                setFilteredUserCoffeeShops(filteredUserCoffeeShopArray)
            })
    },
    []
)

useEffect(
    () => {
        if (hasVisited) {
            const visitedCoffeeShops = filteredUserCoffeeShops.filter(filteredUserCoffeeShop => filteredUserCoffeeShop.hasVisited === true)
            setFilteredUserCoffeeShops(visitedCoffeeShops)
        }
        else {
            getAllFilteredUserCoffeeShops()
        }
    },
    [hasVisited]
)



const getAllCoffeeShops =  () => {
    fetch(`http://localhost:8088/coffeeShops?_embed=userCoffeeShops`)
        .then(respone => respone.json())
        .then((coffeeShopArray) => {

            setCoffeeShops(coffeeShopArray)
        })
        .then(() => {
            setRandom(true)
        })
}



const getAllFilteredUserCoffeeShops = () => {
    fetch(`http://localhost:8088/userCoffeeShops?_expand=coffeeShop&userId=${coffeeUserObject.id}`)
        .then(respone => respone.json())
        .then((filteredUserCoffeeShopArray) => {
            setFilteredUserCoffeeShops(filteredUserCoffeeShopArray)
        })
}



return <>
    <div className="myListHeaderAndButtons">
    <h2>My List</h2>



    <button onClick={() => { setHasVisited(true) }} >Visited</button>
    {/* <button onClick={ () => { setHasVisited(false) } } >Haven't Visited</button> */}
    <button onClick={() => { setHasVisited(false) }} >Show All</button>
    </div>

    <article className="homePageUserCoffeeShops">
        {
            filteredUserCoffeeShops.map(userCoffeeShop => <HomePageUserCoffeeShop key={`userCoffeeShop--${userCoffeeShop.id}`}
                id={userCoffeeShop.id}
                name={userCoffeeShop.coffeeShop.name}
                address={userCoffeeShop.coffeeShop.address}
                phoneNumber={userCoffeeShop.coffeeShop.phoneNumber}
                picture={userCoffeeShop.coffeeShop.picture}
                hasVisited={userCoffeeShop.hasVisited}
                rating={userCoffeeShop.rating}
                getAllFilteredUserCoffeeShops={getAllFilteredUserCoffeeShops}
                getAllCoffeeShops={getAllCoffeeShops}
                getRandomCoffeeShops={getRandomCoffeeShops}
                userCoffeeShop={userCoffeeShop}
                currentUser={coffeeUserObject}
                setRandom={setRandom}

            />)
        }

    </article>

    <h2 className="suggestedCoffeeShopsHeader">Suggested Coffee Shops</h2>
        { randomCoffeeShops
        ?
    <article className="suggestedCoffeeShops" >
        {
            randomCoffeeShops.map(
                (randomCoffeeShop) => <SuggestedCoffeeShop key={`coffeeShop--${randomCoffeeShop.id}`}
                    getAllCoffeeShops={getAllCoffeeShops}
                    currentUser={coffeeUserObject}
                    coffeeShopObject={randomCoffeeShop}
                    getAllFilteredUserCoffeeShops={getAllFilteredUserCoffeeShops}
                    getRandomCoffeeShops={getRandomCoffeeShops}

                />

            )
        }

    </article>
    : ""
    }
</>
}
