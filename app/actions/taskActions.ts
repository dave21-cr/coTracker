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
    const t: tableSchema[] = tasks?.map((value) => {
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
    const t: tableSchema[] = tasks?.map((value) => {
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
        const result = await client.task.update({
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
            startdate: task.start + ":00Z",
            enddate: task.end + ":00Z",
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

//get next task 
export async function getNext() {
    //
    const id = await getUserId()
    if (id == null || id == undefined)
        return null
    //
    const tasks = await getType("pending")
    const next = tasks?.reduce((accumulator, current) => {
        return accumulator.end.getTime() - (Date.now()) > current.end.getTime() - (Date.now()) ?
            current : accumulator
    }, tasks[0])
    return next
}


//get today and three day t
export async function getOntime() {
    //
    const id = await getUserId()
    if (id == null || id == undefined)
        return null
    //
    const client = new PrismaClient()
    //date vars
    const now = new Date(Date.now())
    const lastday = new Date(now.setDate(now.getDate() - 1))
    const After3day = new Date(now.setDate(now.getDate() + 1))

    //today count 
    const todayc = await client.task.count({
        where: {
            startdate: {
                gte: lastday
            },
            status: "pending"
        }
    })
    //three
    const threeday = await client.task.count({
        where: {
            startdate: {
                lte: After3day,
                gte: lastday
            },
            status: "pending"
        }
    })

    client.$disconnect
    return {
        todaycount: todayc,
        threecount: threeday
    }
}


//get performa
export async function getPerforma(type: string) {
    //
    const id = await getUserId()
    if (id == null || id == undefined)
        return null
    //
    const client = new PrismaClient()
    //date vars
    const now = new Date(Date.now())
    const lastmonth = new Date(now.setDate(now.getDate() - 30))
    const monthcount = await client.task.count({
        where: {
            startdate: {
                gte: lastmonth
            },
            status: type
        }
    })
    client.$disconnect
    return monthcount
}

//getcount  
export async function taskCount() {
    //
    const id = await getUserId()
    if (id == null || id == undefined)
        return null
    //
    const client = new PrismaClient()
    const failed = await client.task.count({
        where: {
            status: "failed"
        }
    })

    //completed
    const completed = await client.task.count({
        where: {
            status: "completed"
        }
    })
    //pending
    const pending = await client.task.count({
        where: {
            status: "pending"
        }
    })
    client.$disconnect
    return {
        completed: completed,
        failed: failed,
        penidng: pending
    }

}


