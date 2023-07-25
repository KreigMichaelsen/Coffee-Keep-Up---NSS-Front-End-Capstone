import { Outlet, Route, Routes } from "react-router-dom"
import { AdminViews } from "./AdminViews"
import { UserViews } from "./UserViews"

export const ApplicationViews = () => {

    const localCoffeeUser = localStorage.getItem("coffee_user")
    const coffeeUserObject = JSON.parse(localCoffeeUser)

    if(coffeeUserObject.admin) {
        // Return employee views
        return <AdminViews />
    }
    else {
        // Return customer views
        return <UserViews />
    }

}
