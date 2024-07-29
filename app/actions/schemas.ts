import { z } from "zod"

//login schema  
export const loginschema = z.object(
    {
        email: z.string().email(),
        password: z.string().max(100, { message: "password can't be more than 100 characters" })
    }
);

//register schema 
export const Registerschema = z.object(
    {
        email: z.string().email(),
        username: z.string().max(50).min(3),
        password: z.string().max(100, { message: "password can't be more than 100 characters" }),
        confirmpass: z.string().max(100, { message: "password can't be more than 100 characters" }),
    }
).refine(data => {
    return data.password == data.confirmpass
}, {
    message: "password doesn't match",
    path: ["confirmpass"]
});


//last updated 24 

