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
        name: z.string().max(50).min(3),
        password: z.string()?.max(100, { message: "password can't be more than 100 characters" }),
        confirmpass: z.string().max(100, { message: "password can't be more than 100 characters" }),
    }
).refine(data => {
    return data.password == data.confirmpass
}, {
    message: "password doesn't match",
    path: ["confirmpass"]
});


//task
export const TaskSchema = z.object({
    name: z.string().max(100, { message: "please use only short memorable title" }),
    start: z.string().refine((date) => {
        const d = new Date(date)
        return d > new Date()
    }, {
        message: "start date must be greater than the current date"
    }),
    end: z.string()
}).refine((values) => {
    const start = new Date(values.start)
    const end = new Date(values.end)
    return end > start
}, {
    message: "end date must be greater than the start date",
    path: ["end"]
})

//
export interface userinfo {
    email?: string,
    name?: string
}

export interface tableSchema {
    name: string,
    start: Date,
    end: Date,
    status: string,
    id?: number
}
