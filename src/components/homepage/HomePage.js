import { useEffect, useState } from "react";
import { CoffeeShopList } from "../coffeeShops/CoffeeShopList"
import { UserCoffeeShops } from "../userCoffeeShops/UserCoffeeShops"
import { SuggestedCoffeeShopList } from "./SuggestedCoffeeShopList"
import "./HomePage.css"

export const HomePage = () => {

    const [loading, setLoading] = useState(false);

    const localCoffeeUser = localStorage.getItem("coffee_user")
    const coffeeUserObject = JSON.parse(localCoffeeUser)

    useEffect(() => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }, []);

   
        return <>
    <div>
      {loading ? (
      <div className="loader-container">
      </div>
      ) : (
          <div className="homePageContainer">
            <header className="homePageHeader">
            <img className="homePage-image" src="/Images/Website Background.png" alt="coffeeLogo"></img>
            <h1 className="homePageWelcome">Welcome to Coffee Keep Up, {coffeeUserObject.fullName}!</h1>
            </header>
            <SuggestedCoffeeShopList  /> 
            <footer className="homePageFooter"></footer>
          </div>
        )}
    </div>
        </>
    
}
