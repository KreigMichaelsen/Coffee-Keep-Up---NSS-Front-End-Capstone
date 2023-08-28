import { Outlet, Route, Routes } from "react-router-dom"
import { CoffeeShopForm } from "../coffeeShops/CoffeeShopForm"
import { CoffeeShopContainer } from "../coffeeShops/CoffeeShopContainer"
import { EmployeeList } from "../userCoffeeShops/UserCoffeeShops"
import { EmployeeDetails } from "../userCoffeeShops/UserCoffeeShopDetails"
import { UserList } from "../users/UserList"
import { UserEdit } from "../users/UserEdit"
import { UserDetails } from "../users/UserDetails"
import { Profile } from "../profile/Profile"
import { HomePage } from "../homepage/HomePage"
import { CoffeeShopEdit } from "../coffeeShops/CoffeeShopEdit"
import { UserCreationForm } from "../users/UserCreationForm"
import { UserCoffeeShopContainer } from "../userCoffeeShops/UserCoffeeShopContainer"

import { CoffeeShopDetails } from "../coffeeShops/CoffeeShopDetails"
import { CoffeeShopReviewCreation } from "../coffeeShops/CoffeeShopReviewCreation"
import { UserCoffeeShopEdit } from "../userCoffeeShops/UserCoffeeShopEdit"

export const AdminViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
               
                    <Outlet />
                </>
            }>
                <Route path="home" element={ <HomePage />  } />
                <Route path="profile" element={ <Profile />  } />
                <Route path="coffeeShops" element={ <CoffeeShopContainer /> } />
                <Route path="coffeeShops/create" element={ <CoffeeShopForm /> } /> 
                <Route path="coffeeShops/:coffeeShopId/edit" element={ <CoffeeShopEdit/> } /> 
                <Route path="coffeeShops/:coffeeShopId" element={ <CoffeeShopDetails/> } />
                <Route path="coffeeShops/:coffeeShopId/review" element={ <CoffeeShopReviewCreation/> } />

                <Route path="users" element={ <UserList /> } />
                <Route path="users/:userId/edit" element={ <UserEdit /> } />
                <Route path="users/create" element={ <UserCreationForm /> } />
                <Route path="userCoffeeShops" element={ <UserCoffeeShopContainer /> } />
                <Route path="userCoffeeShops/:userCoffeeShopId/edit" element={ <UserCoffeeShopEdit /> } />
                
            </Route>
        </Routes>
    )
}
 