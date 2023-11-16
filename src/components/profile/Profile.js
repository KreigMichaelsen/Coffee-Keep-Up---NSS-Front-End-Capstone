import { UserForm } from "./UserForm"
import { AdminForm } from "./AdminForm"


export const Profile = () => {
    const localCoffeeUser = localStorage.getItem("coffee_user")
    const coffeeUserObject = JSON.parse(localCoffeeUser)

    if(coffeeUserObject.admin) {
        return <AdminForm />
    }
    else {
        return <UserForm />
    }
}

 