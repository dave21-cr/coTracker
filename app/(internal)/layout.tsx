//root layout 

import React from "react";
import { Metadata } from "next";
type layoutProps= {
    child: React.ReactNode
}

//meta da
export const metadata: Metadata = {
    // 
    title: "Co - Tracker Dashboard",
    description: " track your plans with co tracker easily"
}

export default function RootLayout({ children ,}: {children:React.ReactNode}) {
    return (
        <html>
            <body>
                {children}
            </body>
        </html>
    )
}