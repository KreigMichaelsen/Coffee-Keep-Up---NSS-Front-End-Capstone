import { Outlet, Route, Routes } from "react-router-dom"
import { CoffeeShopList } from "../coffeeShops/CoffeeShopList"
import { CoffeeShopForm } from "../coffeeShops/CoffeeShopForm"
import { TicketSearch } from "../coffeeShops/CoffeeShopSearch"
import { Profile } from "../profile/Profile"
import { CoffeeShopEdit } from "../coffeeShops/CoffeeShopEdit"


export const UserViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Coffee Keep Up!</h1>
                    <div>Your one-stop-shop to get all your electronics fixed</div>

                    <Outlet />
                </>
            }>

                <Route path="coffeeShops" element={ <CoffeeShopList /> } />
                <Route path="profile" element={ <Profile />  } />
                <Route path="coffeeShops/:coffeeShopId/edit" element={ <CoffeeShopEdit/> } /> 
                <Route path="coffeeShops/create" element={ <CoffeeShopForm /> } /> 
            </Route>
        </Routes>
    )
}
