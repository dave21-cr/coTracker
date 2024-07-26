"use client"
import React from 'react';
//react card
interface cardprop {
    header: string,
    count: number,
    type?:string
}



export default function Card(data: cardprop) {
    return (
        <div className="flex flex-col  max-sm:w-full w-1/3 items-center shadow-md shadow-red-950">
            <h1 className='text-3xl font-light p-3'>{data.header}</h1>
            <label className='text-5xl font-semibold text-slate-950'>{data.count}{data.type && "%"}</label>
        </div>
    )
}
