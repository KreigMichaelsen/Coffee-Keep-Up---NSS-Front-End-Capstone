import { useState } from "react"
import { CoffeeShopSearch } from "./CoffeeShopSearch"
import { CoffeeShopList } from "./CoffeeShopList"

export const CoffeeShopContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <>
         <CoffeeShopSearch setterFunction={setSearchTerms}/>
         <CoffeeShopList searchTermState={searchTerms} /> 
    </> 

}