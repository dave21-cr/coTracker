//login form 
"use client"

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { useForm } from "react-hook-form"
import * as z from "zod"
import {login} from "../../actions/userAction"

//schema 
export const schema = z.object(
    {
        email: z.string().email(),
        password: z.string().max(100, { message: "password can't be more than 100 characters" })
    }
);

export default function LoginForm() {

    //react-hook-form
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues:
        {
            email: ""
        }
    })

    //onsubmit callbac
    function onsubmit(values: z.infer<typeof schema>) {
       login(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onsubmit)}
                className="flex flex-col max-md:w-full w-1/2 p-5">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) =>
                    (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormDescription>
                                input valid email address
                            </FormDescription>
                            <FormControl>
                                <Input placeholder="john@gmail.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )
                    } />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) =>
                    (
                        <FormItem>
                            <FormLabel>password</FormLabel>
                            <FormDescription>
                                input your password
                            </FormDescription>
                            <FormControl>
                                <Input placeholder="***" type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )
                    } />
                <Button variant={"outline"} type="submit" className="my-2">Login</Button>
            </form>
        </Form>
    )

}