//login and signup layout
import React from "react";
import next, { Metadata } from "next";
import "../globals.css";
import { Inter } from "next/font/google";
import Navbar from "../components/navbar";


//type of child
type layoutProps = {
    child: React.ReactNode
}

//font 
const inter = Inter({
    subsets: ["latin"]
})

//meta da
export const metadata: Metadata = {
    // 
    title: "Co -tracker ",
    description: " track your plans with co tracker easily"
}



export default function Layout({ children, }: { children: React.ReactNode }) {
    return (
        <html>
            <body className={inter.className}>
                <nav className="w-full sticky top-0" >
                    <Navbar theme="day"/>
                </nav>
                {children}
            </body>
        </html>
    )
}