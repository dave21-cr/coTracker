"use server"
//import { schema as loginschema } from "../(public)/login/login";
import {z} from "zod";
import { loginschema,Registerschema } from "./schemas";


//register user 
export async function registerUser(credentials:z.infer<typeof Registerschema>)
{
    //re validate 
    const result =Registerschema.safeParse(credentials)
    if(!result.success)
        return
    //cont
    console.log(credentials.email)
}

//login 
export async function login(credentials:z.infer<typeof loginschema>)
{
    //re validate 
    const result =loginschema.safeParse(credentials)
    if(!result.success)
        return
    //cont
    console.log(credentials.email)
}