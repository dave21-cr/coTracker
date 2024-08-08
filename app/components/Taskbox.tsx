"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { tableSchema } from '../actions/schemas'
import Tablebox from './Tablebox'
import { Button } from "@/components/ui/button"
import React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
const TaskBox: React.FC<{ activetask: tableSchema[], alltask: tableSchema[] }> = ({ activetask, alltask }) => {
    const [active, setActive] = useState<tableSchema[]>(activetask)
    const [all, setAll] = useState<tableSchema[]>(alltask)
    const router = useRouter()
    //active deleted
    const tablemodified = (itemId: number, from: string) => {
        if (from == "all") {
            setActive((prev) => {
                return prev.filter((val, _) => val.id != itemId)
            })
        } else {
            setAll((prev) => {
                return prev.filter((val, _) => val.id != itemId)
            })
        }
    }

    //activechanged 
    const statusChanged = (itemId: number, from: string) => {
        if (from == "all") {
            setActive((prev) => {
                return prev.filter((value) => value.id != itemId 
                )
            })
        } else {
            setAll((prev) => {
                return prev.map((value) => {
                    return value.id == itemId ? { ...value, status: "completed" } :
                        value
                })
            })
        }
    }

    //handle new
    const HandleNew = () => {
        router.push("/task/new")
    }
    return (
        <div className="dark:bg-slate-600">
            <div className="flex flex-row justify-start">
                <Button variant={"outline"} className="text-white font-bold hover:bg-green-500 bg-green-800" onClick={HandleNew}>New</Button>
            </div>
            <Tabs defaultValue='active'>
                <TabsList className='grid w-full grid-cols-2'>
                    <TabsTrigger value='active'>Active Tasks</TabsTrigger>
                    <TabsTrigger value="all">All Tasks</TabsTrigger>
                </TabsList>
                <TabsContent value="all">
                    <Tablebox tabled={all} setTable={setAll} tableType="all" updatecallback={tablemodified} statusCallback={statusChanged} />
                </TabsContent>
                <TabsContent value="active">
                    <Tablebox tabled={active} setTable={setActive} tableType="active" updatecallback={tablemodified} statusCallback={statusChanged} />
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default TaskBox;
