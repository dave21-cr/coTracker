"use client"
import React, { useState } from 'react'
import { GrTask, GrInProgress } from "react-icons/gr"
import { GiDuration } from "react-icons/gi"
import { MdDelete } from "react-icons/md"
import { RiFolderWarningFill } from "react-icons/ri"
import { TbTimeDuration30, TbUserSquareRounded } from "react-icons/tb"
import { TbInputCheck } from "react-icons/tb"
import { Table, TableHead, TableRow, TableCell, TableHeader, TableBody } from '@/components/ui/table'
import { tableSchema } from '../actions/schemas'
import Countdown from './count'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation';
import { finish, remove } from '../actions/taskActions'
import { useToast } from '@/components/ui/use-toast'
import { Toaster } from '@/components/ui/toaster'

const Tablebox: React.FC<{
    tableType: string, tabled: tableSchema[],
    setTable: React.Dispatch<React.SetStateAction<tableSchema[]>>,
    updatecallback?: (itemid: number,from:string) => void,
    statusCallback?: (itemid: number,from:string) => void
}> = ({ tableType, tabled, setTable, updatecallback, statusCallback }) => {
    const router = useRouter()
    const { toast } = useToast()
    //handlede
    const Handledelete = async (index: number) => {
        //call some server actiom by identifying index id
        const task = tabled[index]
        const deleted = await remove(task.id ?? -1)
        if (deleted) {
            setTable((prev) => {
                return tabled.filter((_, i) => i != index)
            })
            if (updatecallback != undefined && task.id != undefined) {
                updatecallback(task.id,tableType)
            }
            toast({
                title: "success",
                description: "successfully deleted the task",
            })
        } else {
            toast({
                title: "Error",
                description: "can't delete the task please try again!",
                variant: "destructive"
            })
        }
    }
    //handlefi
    const handlefinish = async (index: number, type: string) => {
        //updateSt
        setTable(tabled.map((item, i) => {
            return (i == index) ?
                { ...item, id: item.id, start: item.start, end: item.end, name: item.name, status: type } :
                item
        }));
        //update t
        const task = tabled[index]
        if (task.id != undefined) {
            if (await finish(task.id, type)) {
                toast({
                    title: "success",
                    description: "Status changed to complete!",
                })
            }
        }
        //r from ac
        if(tableType=="active")
        {
            setTable((prev) => {
                return tabled.filter((_, i) => i != index)
            })
        }
        if (statusCallback!=undefined &&task.id != undefined)
            statusCallback(task.id,tableType)
    }

    //timeouit
    const handleCounter = (index: number) => {
        const task = tabled[index]
        if (task.status == "pending") {
            handlefinish(index, "failed")
        }
    }

    return (
        <Table>
            <TableHeader>
                <TableRow className=''>
                    <TableHead className=' text-blue-800 font-bolder'> <div className='flex flex-row gap-1'><GrTask /> Task Name</div></TableHead>
                    <TableHead className=' text-blue-800 font-bolder'><div className='flex flex-row gap-1'><GiDuration /> Start Date</div></TableHead>
                    <TableHead className=' text-blue-800 font-bolder'><div className='flex flex-row gap-1'><TbTimeDuration30 /> TimeLeft</div></TableHead>
                    <TableHead className=' text-blue-800 font-bolder'><div className='flex flex-row gap-1'><GrInProgress /> Status</div></TableHead>
                    <TableHead className=' text-blue-800 font-bolder'><div className='flex flex-row gap-1'><RiFolderWarningFill /> Action</div></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <Toaster />
                {tabled != null && tabled.map((data: tableSchema, index: number) => {
                    let cname = "bg-blue-800"
                    if (data.status == "completed")
                        cname = "bg-green-800"
                    else if (data.status == "failed")
                        cname = "bg-red-800"
                    return (
                        <TableRow key={data.name}>
                            <TableCell>{data.name}</TableCell>
                            <TableCell>{data.start.toUTCString()}</TableCell>
                            <TableCell>{<Countdown index={index} handleChange={handleCounter} startDate={data.start} endDate={data.end} />}</TableCell>
                            <TableCell className={"text-white " + cname}>{data.status}</TableCell>
                            <TableCell>
                                <div className='flex flex-row gap1 justify-start'>
                                    {data.status == "pending" &&
                                        <Button className="bg-green-950 text-white" variant={'outline'} onClick={() => { handlefinish(index, "completed") }}><TbInputCheck />finish</Button>
                                    }
                                    <Button className="bg-red-950 text-white" variant={'outline'} onClick={() => { Handledelete(index) }}><MdDelete />Delete</Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    )
                })}

            </TableBody>
        </Table>
    )
}
export default Tablebox