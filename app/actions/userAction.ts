"use server"
//import { schema as loginschema } from "../(public)/login/login";
import { z } from "zod";
import { Registerschema } from "./schemas";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth"
import { authoptions } from "../api/auth/[...nextauth]/route";
import { userinfo } from "./schemas";

type regmode = "PASS" | "A0"


//register user 
export async function registerUser(type: regmode, credentials?: z.infer<typeof Registerschema>, profile?: userinfo) {
    if (type == "PASS" && (credentials != undefined)) {
        //re validate 
        const result = Registerschema.safeParse(credentials)
        if (!result.success)
            return
        //cont
        const client = new PrismaClient()
        const user = await getUser_(credentials.email)
        if (user)
            return
        await client.user.create({
            data: {
                email: credentials.email,
                name: credentials.name,
                password: await bcrypt.hash(credentials.password, 10)
            }
        })
        client.$disconnect
    } else if (type == "A0" && profile != undefined) {
        //cont
        const client = new PrismaClient()
        const user = await getUser_(profile.email || "")
        if (user)
            return
        await client.user.create({
            data: {
                email: profile?.email || "",
                name: profile?.name || "",
            }
        })
        client.$disconnect
    }
    return true;
}

//getuser
export async function getUser(uid: number) {
    const client = new PrismaClient()
    const user = await client.user.findFirst({
        where: {
            id: uid
        }
    })

    //
    client.$disconnect
    return user
}

export async function getUser_(email: string) {
    const client = new PrismaClient()
    const user = await client.user.findFirst({
        where: {
            email: email
        }
    })
    //
    client.$disconnect
    return user
}

//
export async function getUserId() {
    const e = await getsessionE()
    if (e == undefined || e == null)
        return null
   const user= await getUser_(e)
   return user?.id
}

//all 
export async function getAll() {
    const client = new PrismaClient()
    const users = await client.user.findMany()
    //
    client.$disconnect
    return users
}

//get ses em
export async function getsessionE() {
    const session = await getServerSession(authoptions)
    return (session?.user?.email)
}


//auth 
export async function Auth() {
    const e = await getsessionE()
    if (e == undefined || e == null)
        redirect("/login")
}

//current user 
export async function currentuser() {
    const session = await getServerSession(authoptions)
    const user: userinfo = {
        email: session?.user?.email || undefined,
        name: session?.user?.name || undefined
    }
    return user
}