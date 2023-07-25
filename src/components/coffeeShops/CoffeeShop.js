import { Link, useNavigate } from "react-router-dom"

export const CoffeeShop = ({coffeeShopObject, currentUser, getAllTickets }) => {

    const navigate = useNavigate()


    // let assignedEmployee = null

    // if(ticketObject.employeeTickets.length > 0) {
    //     const ticketEmployeeRelationship = ticketObject.employeeTickets[0]
    //     assignedEmployee = employees.find(employee => employee.id === ticketEmployeeRelationship.employeeId)
    // }

    // const canClose = () => {
    //     if (userEmployee?.id === assignedEmployee?.id && ticketObject.dateCompleted === "") {
    //         return <button onClick={closeTicket} className="ticket_finish">Finish</button>
    //     }
    //     else {
    //         return ""
    //     }
    // }

    const deleteButton = () => {
        if (currentUser.admin) {
            return <button onClick={() => {
                fetch(`http://localhost:8088/coffeeShops/${coffeeShopObject.id}`, {
                    method: "DELETE"
                })
                .then(() => {
                        getAllTickets()
                })
            }} className="ticket_delete">Delete</button>
        }
        else {
            return ""
        }
    }


    // const closeTicket = () => {
    //     const copy = {
    //         userId: ticketObject.userId,
    //         description: ticketObject.description,
    //         emergency: ticketObject.emergency,
    //         dateCompleted: new Date()
    //     }

    //     return fetch(`http://localhost:8088/serviceTickets/${ticketObject.id}`, {
    //         method: "PUT",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(copy)
    //     })
    //         .then(respone => respone.json())
    //         .then(getAllTickets())
    // }
 
    // const userEmployee = employees.find(employee => employee.userId === currentUser.id)

    // const buttonOrNoButton = () => {
    //     if(currentUser.staff) {
    //         return <button
    //         onClick={() => {
    //             fetch(`http://localhost:8088/employeeTickets`, {
    //                 method:"POST",
    //                 headers: {
    //                     "Content-Type": "application/json"
    //                 },
    //                 body: JSON.stringify({
    //                     employeeId: userEmployee.id,
    //                     serviceTicketId:ticketObject.id
    //                 })
    //             })
    //                 .then(response => response.json())
    //                 .then(() => {
    //                         //  GET the state from the API again
    //                         getAllTickets()
    //                     })
    //                 }
    //         }
    //         >Claim</button>
    //     }
    //     else {
    //         return ""
    //     }
    // }

    return <section className="coffeeShop">
    <header>{coffeeShopObject.name}</header>
     <div>{coffeeShopObject.picture}</div>
     <div>Address: {coffeeShopObject.address}</div>
     <div>Phone Number: {coffeeShopObject.phoneNumber}</div>
     <footer>
        {/* {
            coffeeShopObject.employeeTickets.length
            ? `Currently being worked on ${assignedEmployee !== null ? assignedEmployee?.user?.fullName : ""}`
            : buttonOrNoButton()
        }
        {
            canClose()
        } */}
        {
            deleteButton()
        }

        {
            <button onClick={() => navigate(`/coffeeShops/${coffeeShopObject.id}/edit`)}>Edit Coffee Shop</button>
        }
     </footer>
 </section>
}