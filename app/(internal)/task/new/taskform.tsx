"use client"
//task form
import React from 'react'
import { useForm } from "react-hook-form"
import { TaskSchema } from '@/app/actions/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { create } from '../../../actions/taskActions'
import { useRouter, useSearchParams } from 'next/navigation'
export default function Taskform() {


    const router = useRouter()
    const params = useSearchParams()
    const error = params.get("error")
    //def f
    const form = useForm<z.infer<typeof TaskSchema>>({
        resolver: zodResolver(TaskSchema),
    })

    //handle sub
    async function onsubmit(values: z.infer<typeof TaskSchema>) {
        //call ser
        const r = await create(values)
        if (r == null)
            router.push("?error=e")
        else
            router.push("/task")
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onsubmit)} className='p-3 flex flex-col w-full gap-2 dark:bg-slate-900'>
                {error && <div className="flex items-center justify-center bg-red-900 text-gray-200 font-light
                text-4xl">{"can't create the task"}</div>
                }
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder='name' type='text' {...field}></Input>
                                </FormControl>
                                <FormMessage />
                                <FormDescription>
                                    Name of The Task
                                </FormDescription>
                            </FormItem>
                        )
                    }} />

                <div className='gap-10 flex justify-start max-sm:flex-col max-sm:gap-1'>
                    <FormField
                        control={form.control}
                        name="start"
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormControl>
                                        <Input type='datetime-local' {...field} className="dark:text-white dark:bg-slate-800"></Input>
                                    </FormControl>
                                    <FormMessage />
                                    <FormDescription>
                                        Task Start Date
                                    </FormDescription>
                                </FormItem>
                            )
                        }} />

                    <FormField
                        control={form.control}
                        name="end"
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormControl>
                                        <Input type='datetime-local' {...field} className="dark:text-white dark:bg-slate-800"></Input>
                                    </FormControl>
                                    <FormMessage />
                                    <FormDescription>
                                        Task End Date
                                    </FormDescription>
                                </FormItem>
                            )
                        }} />
                </div>
                <Button type='submit' variant={'outline'} className='flex justify-center font-bold text-2xl bg-blue-700 text-white' >CREATE</Button>
            </form>
        </Form>
    )
}
