//login form 
"use client"

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useSearchParams } from "next/navigation"
import { loginschema } from "@/app/actions/schemas";
import { signIn } from "next-auth/react"
import Link from "next/link";

export default function LoginForm() {
    //react-hook-form
    const form = useForm<z.infer<typeof loginschema>>({
        resolver: zodResolver(loginschema),
        defaultValues:
        {
            email: ""
        }
    })

    //onsubmit callbac
    async function onsubmit(values: z.infer<typeof loginschema>) {
        signIn("credentials", { password: values.password, email: values.email, callbackUrl: "/", })
    }

    //get params
    const searchparams = useSearchParams()
    const errorMessage = searchparams.get("error")
    const sMessage = searchparams.get("success")

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onsubmit)}
                className="flex flex-col max-md:w-full w-1/2 p-5">
                {errorMessage &&
                    <div className="flex items-center justify-center bg-red-900 text-gray-200 font-light
                text-4xl">{"please check you detail"}</div>
                }
                {sMessage &&
                    <div className="flex items-center justify-center bg-green-900 text-gray-200 font-light
                text-4xl">{"Account successfully created"}</div>
                }
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
                <Button className="flex flex-col items-center justify-center bg-slate-900 text-white font-3xl"
                    onClick={() => {
                        signIn('github',{callbackUrl:"/"})
                    }}>
                    Login With Github
                </Button>
                <div className="flex flex-row justify-center items-center px-8 my-3 gap-4">
                    <label>You dont have an account ? </label>
                    <Link href={"/signup"}>Register</Link>
                </div>
            </form>
        </Form>
    )

}