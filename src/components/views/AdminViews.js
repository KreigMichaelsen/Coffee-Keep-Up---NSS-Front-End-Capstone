import { Outlet, Route, Routes } from "react-router-dom"
import { TicketList } from "../coffeeShops/CoffeeShopList"
import { CoffeeShopForm } from "../coffeeShops/CoffeeShopForm"
import { TicketSearch } from "../coffeeShops/CoffeeShopSearch"
import { CoffeeShopContainer } from "../coffeeShops/CoffeeShopContainer"
import { EmployeeList } from "../employees/EmployeeList"
import { EmployeeDetails } from "../employees/EmployeeDetails"
import { UserList } from "../users/UserList"
import { UserDetails } from "../users/UserDetails"
import { Profile } from "../profile/Profile"
import { CoffeeShopEdit } from "../coffeeShops/CoffeeShopEdit"

export const AdminViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Coffee Keep Up!</h1>
                    <div>Track your brew</div>

                    <Outlet />
                </>
            }>

                <Route path="profile" element={ <Profile />  } />
                <Route path="coffeeShops" element={ <CoffeeShopContainer /> } />
                <Route path="coffeeShops/create" element={ <CoffeeShopForm /> } /> 
                <Route path="coffeeShops/:coffeeShopId/edit" element={ <CoffeeShopEdit/> } /> 
                <Route path="employees" element={ <EmployeeList /> } />
                <Route path="users" element={ <UserList /> } />
                <Route path="users/:userId" element={ <UserDetails /> } />
                <Route path="employees/:employeeId" element={ <EmployeeDetails /> } />
            </Route>
        </Routes>
    )
}
 