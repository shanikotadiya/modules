'use client'
import { useContext } from "react"
import AuthContext from "./Context/_AuthContext"
export default function ContextModule(){
    const {token} = useContext(AuthContext)
    console.log(token);
    
    return(
        <>
        <h1>Message From AuthContext : {token}</h1>
        </>
    )
}