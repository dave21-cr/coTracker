//root layout 

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
    title: "Co - Tracker Dashboard",
    description: " track your plans with co tracker easily",
    viewport: "width=device-width, initial-scale=1.0",
}



export default function RootLayout({ children, }: { children: React.ReactNode }) {
    return (
        <html>
            <body className={inter.className}>
                <nav className="w-full sticky top-0" >
                    <Navbar type="internal" />
                </nav>
                {children}
            </body>
        </html>
    )
}