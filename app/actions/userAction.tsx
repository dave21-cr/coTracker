"user server"
import { schema as loginschema } from "../(public)/login/login";
import {z} from "zod";
//register user 
export function registerUser()
{
    
}

//login 
export function login(credentials:z.infer<typeof loginschema>)
{
    //re validate 
    const cred =loginschema.parse(credentials)
    console.log(credentials.email)
}