import { Outlet, Route, Routes } from "react-router-dom"
import { CoffeeShopList } from "../coffeeShops/CoffeeShopList"
import { CoffeeShopForm } from "../coffeeShops/CoffeeShopForm"
import { TicketSearch } from "../coffeeShops/CoffeeShopSearch"
import { Profile } from "../profile/Profile"
import { CoffeeShopEdit } from "../coffeeShops/CoffeeShopEdit"
import { UserCoffeeShopContainer } from "../userCoffeeShops/UserCoffeeShopContainer"

import { HomePage } from "../homepage/HomePage"
import { CoffeeShopDetails } from "../coffeeShops/CoffeeShopDetails"
import { CoffeeShopReviewCreation } from "../coffeeShops/CoffeeShopReviewCreation"
import { UserCoffeeShopEdit } from "../userCoffeeShops/UserCoffeeShopEdit"
import { CoffeeShopContainer } from "../coffeeShops/CoffeeShopContainer"


export const UserViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    
                    <Outlet />
                </>
            }>
                <Route path="home" element={ <HomePage /> } />
                <Route path="coffeeShops" element={ <CoffeeShopContainer /> } />
                <Route path="coffeeShops/:coffeeShopId" element={ <CoffeeShopDetails/> } />
                <Route path="coffeeShops/:coffeeShopId/review" element={ <CoffeeShopReviewCreation/> } />
                <Route path="profile" element={ <Profile />  } />
                <Route path="coffeeShops/:coffeeShopId/edit" element={ <CoffeeShopEdit/> } /> 
                <Route path="coffeeShops/create" element={ <CoffeeShopForm /> } /> 
                <Route path="userCoffeeShops" element={ <UserCoffeeShopContainer /> } />
                <Route path="userCoffeeShops/:userCoffeeShopId/edit" element={ <UserCoffeeShopEdit /> } />

            </Route>
        </Routes>
    )
}
