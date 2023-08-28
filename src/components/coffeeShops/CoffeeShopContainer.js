import { useState, useEffect } from "react"
import { CoffeeShopSearch } from "./CoffeeShopSearch"
import { CoffeeShopList } from "./CoffeeShopList"

export const CoffeeShopContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }, []);

    return <>
    <div className="container">
      {loading ? (
        <div className="loader-container">
        </div>
      ) : (
        <div className="coffeeShopContainer">
        <img className="coffeeShopsPage-image" src="/Images/Coffee Shops Page.png" alt="coffeeShopsLogo"></img>
         <h1 className="coffeeShopsHeader">Coffee Shops</h1>
         <CoffeeShopSearch  setterFunction={setSearchTerms}/>
         <CoffeeShopList searchTermState={searchTerms} /> 
         <footer className="coffeeShopsFooter"></footer>
         </div>
         )}
    </div>
    </> 

}