//dashboard header.  
import { Inter } from "next/font/google"
import "../globals.css"
type userInfo = { name: string }


const inter = Inter({
    subsets: ["latin"]
})

export default function Header(info: userInfo) {
    return (
        <h1 className={"text-5xl font-bold max-sm:text-3xl text-slate-900 dark:text-white " + inter.className}> Wellcome {info.name}</h1>
    )
}