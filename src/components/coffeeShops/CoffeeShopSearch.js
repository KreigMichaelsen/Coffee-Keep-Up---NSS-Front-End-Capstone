export const CoffeeShopSearch = ({setterFunction, searchTermState}) => {
    return (
        <div>
            <input className="coffeeShopsSearchBar"
            onChange={
                (event) => {
                    setterFunction(event.target.value)
                }
            }
             type="text" placeholder="Search Coffee Shops..." />
        </div>
    )
}