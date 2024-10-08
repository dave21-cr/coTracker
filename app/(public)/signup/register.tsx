"use client"
//register form 

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Registerschema } from "@/app/actions/schemas";
import { registerUser } from "../../actions/userAction"
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
export default function RegisterForm() {
    //react-hook-form
    const form = useForm<z.infer<typeof Registerschema>>({
        resolver: zodResolver(Registerschema),
        defaultValues:
        {
            email: "",
            name: ""
        }
    })

    const search = useSearchParams()
    const router = useRouter()
    const errorMessage = search.get("error")

    //onsubmit callbac
    async function onsubmit(values: z.infer<typeof Registerschema>) {
        const r = await registerUser("PASS", values)
        if (r)
            router.push("/login?success=s")
        else
            router.push("/signup?error=e")
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onsubmit)}
                className="flex flex-col max-md:w-full w-1/2 p-5">
                {errorMessage &&
                    <div className="flex items-center justify-center bg-red-900 text-gray-200 font-light
                text-4xl">{"Failed to register"}</div>
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
                    name="name"
                    render={({ field }) =>
                    (
                        <FormItem>
                            <FormLabel>name</FormLabel>
                            <FormDescription>
                                input your name
                            </FormDescription>
                            <FormControl>
                                <Input placeholder="john" {...field} />
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
                <FormField
                    control={form.control}
                    name="confirmpass"
                    render={({ field }) =>
                    (
                        <FormItem>
                            <FormLabel>confirm password</FormLabel>
                            <FormDescription>
                                password confirmation
                            </FormDescription>
                            <FormControl>
                                <Input placeholder="***" type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )
                    } />
                <Button variant={"outline"} type="submit" className="my-2">Register</Button>
            </form>
        </Form>
    )

}