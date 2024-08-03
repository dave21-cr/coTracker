"use client"
import React from 'react'
import { GrTask, GrInProgress } from "react-icons/gr"
import { GiDuration } from "react-icons/gi"
import { RiFolderWarningFill } from "react-icons/ri"
import { TbTimeDuration30 } from "react-icons/tb"
import { Table, TableHead, TableRow, TableCell, TableHeader, TableBody } from '@/components/ui/table'
export default function Tablebox() {

    //mock data
    interface tableSchema {
        name: string,
        start: Date,
        end: Date,
        status: string
    }

    const mockdata: tableSchema[] = [
        {
            name:"pray god",
            start: new Date(Date.now()),
            end:new Date(Date.now()),
            status:"pending...."
        },
        {
            name:"pray god",
            start: new Date(Date.now()),
            end:new Date(Date.now()),
            status:"pending...."
        },
        {
            name:"pray god",
            start: new Date(Date.now()),
            end:new Date(Date.now()),
            status:"pending...."
        },
        {
            name:"pray god",
            start: new Date(Date.now()),
            end:new Date(Date.now()),
            status:"pending...."
        }
    ]
    return (
            <Table>
                <TableHeader>
                    <TableRow className=''>
                        <TableHead className=' text-blue-800 font-bolder'> <div className='flex flex-row gap-1'><GrTask /> Task Name</div></TableHead>
                        <TableHead className=' text-blue-800 font-bolder'><div className='flex flex-row gap-1'><GiDuration /> Duration</div></TableHead>
                        <TableHead className=' text-blue-800 font-bolder'><div className='flex flex-row gap-1'><TbTimeDuration30 /> TimeLeft</div></TableHead>
                        <TableHead className=' text-blue-800 font-bolder'><div className='flex flex-row gap-1'><GrInProgress /> Status</div></TableHead>
                        <TableHead className=' text-blue-800 font-bolder'><div className='flex flex-row gap-1'><RiFolderWarningFill /> Action</div></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>new askdbaskdasdas dsdbasdjasd task</TableCell>
                        <TableCell>new askdbaskdasdas dsdbasdjasd task</TableCell>
                        <TableCell>new askdbaskdasdas dsdbasdjasd task</TableCell>
                        <TableCell>new askdbaskdasdas dsdbasdjasd task</TableCell>
                        <TableCell>new askdbaskdasdas dsdbasdjasd task</TableCell>
                    </TableRow>
                </TableBody>
            </Table>

    )
}
