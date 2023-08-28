

import { useEffect, useState } from "react";
import { UserCoffeeShops } from "./UserCoffeeShops"

export const UserCoffeeShopContainer = () => {
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
        <>
        <div className="userCoffeeShopsContainer">
        <img className="userCoffeeShopsPage-image" src="/Images/My List Page.png" alt="userCoffeeShopsLogo"></img>
         <UserCoffeeShops /> 
        
         </div>
         <footer className="userCoffeeShopsFooter"></footer>
         </>
         )}
    </div>
    </> 

}