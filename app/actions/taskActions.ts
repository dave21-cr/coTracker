"use server"
//task actions 
import { PrismaClient } from "@prisma/client";
import { TaskSchema } from "./schemas";
import { z } from "zod"
import { getUser_, currentuser, getUserId } from "./userAction";
import { tableSchema } from "./schemas";
//get
export async function getTasks() {
    //
    const id = await getUserId()
    if (id == null || id == undefined)
        return null
    //
    const client = new PrismaClient()
    const tasks = await client.task.findMany(
        {
            where: {
                userid: id
            }
        })
    client.$disconnect
    const t:tableSchema[]= tasks?.map((value) => {
        return {
            name: value.name,
            id: value.id,
            status: value.status,
            end: value.enddate,
            start: value.startdate
        } satisfies tableSchema
    })
    return t
}


export async function getTask(id: number) {
    //
    const uid = await getUserId()
    if (uid == null || uid == undefined)
        return null
    //
    const client = new PrismaClient()
    const task = await client.task.findFirst(
        {
            where: {
                userid: uid,
                id: id
            }
        })
    client.$disconnect
    return task
}

export async function getType(type: string) {
    //
    const id = await getUserId()
    if (id == null || id == undefined)
        return null
    //
    const client = new PrismaClient()
    const tasks = await client.task.findMany(
        {
            where: {
                userid: id,
                status: type
            }
        })
    client.$disconnect
    const t:tableSchema[]= tasks?.map((value) => {
        return {
            name: value.name,
            id: value.id,
            status: value.status,
            end: value.enddate,
            start: value.startdate
        } satisfies tableSchema
    })
    return t
}

//se
export async function finish(id: number, status: string) {
    //
    const uid = await getUserId()
    if (uid == null || uid == undefined)
        return null
    //
    const client = new PrismaClient()
    const task = await client.task.findFirst(
        {
            where: {
                id: id,
                userid: uid
            }
        })
    if (task == null || task == undefined) {
        client.$disconnect
        return null
    } else {
        const result= await client.task.update({
            where: {
                id: id
            },
            data: {
                ...task, status: status
            }
        })
        client.$disconnect
        return result
    }
}

//new 
export async function create(task: z.infer<typeof TaskSchema>) {
    //
    const id = await getUserId()
    if (id == null || id == undefined)
        return null
    //
    //
    const client = new PrismaClient()
    const result = await client.task.create({
        data: {
            name: task.name,
            startdate: task.start+":00Z",
            enddate: task.end+":00Z",
            status: "pending",
            userid: id
        }
    })
    client.$disconnect
    return result
}

//remove 
export async function remove(tid: number) {
    //
    const id = await getUserId()
    if (id == null || id == undefined)
        return null
    //
    const client = new PrismaClient()
    const deleted = await client.task.delete({
        where: {
            id: tid,
            userid: id
        }
    })
    client.$disconnect
    return deleted
}