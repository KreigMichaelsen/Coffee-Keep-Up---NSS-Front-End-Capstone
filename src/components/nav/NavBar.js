import "./NavBar.css"
import { AdminNav } from "./AdminNav"
import { UserNav } from "./UserNav"

export const NavBar = () => {
    const localCoffeeUser = localStorage.getItem("coffee_user")
    const coffeeUserObject = JSON.parse(localCoffeeUser)

    if(coffeeUserObject.admin) {
        // Return employee views
        return <AdminNav />
    }
    else {
        // Return customer views
        return <UserNav />
    }
}

