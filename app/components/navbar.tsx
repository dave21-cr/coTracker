'use client'
import React, { useEffect } from "react"
import { useState } from "react"
import "next/image";
import image from "../images/logo.jpg";
import Image from "next/image";
import { MdMenu } from "react-icons/md";
import Link from "next/link";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

interface navbarprop {
  type?: string
}

//init them
function initTheme() {
  let theme = localStorage.getItem("theme")
  if (theme == null) {
    theme = "day"
    localStorage.setItem("theme", theme)
  }
  return theme
}

//nav bar component
const Navbar: React.FC<navbarprop> = ({ type }) => {
  //stat
  let theme = initTheme()
  const [th, setTheme] = useState<string>(theme);

  useEffect(() => {
    if (theme == "night") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  })
  return (
    <div className="navbar">
      <div className="header-left">
        <Image src={image}
          alt="logo"
          height={35}
          width={35}
        ></Image>
        <Link className="header-link" href={"/"}>CO TRACKER</Link>
      </div>

      {
        type == "internal" &&
        <div className="drawer">
          <Sheet>
            <SheetTrigger asChild>
              <MdMenu />
            </SheetTrigger>
            <SheetContent side={"left"} className="bg-gradient-to-r from-slate-500 to-slate-950;">
              <SheetHeader>
                <SheetTitle>
                  <div className="flex flex-row justify-start">
                    <Image src={image}
                      alt="logo"
                      height={35}
                      width={35}
                    ></Image>
                    <Link className="header-link" href={"/"}>CO TRACKER</Link>
                  </div>
                </SheetTitle>
                <SheetDescription>Your Next Task Friend</SheetDescription>
              </SheetHeader>
              <div className="flex flex-col justify-center items-center gap-5">
              <Link href={"/task"} className="header-link">Tasks</Link>
          <button className="header-link" onClick={() => {
            //switch theme
            let newtheme = th == "night" ? "day" : "night"
            localStorage.setItem("theme", newtheme)
            setTheme(newtheme)
            if (newtheme == "night") {
              document.documentElement.classList.add("dark")
            } else {
              document.documentElement.classList.remove("dark")
            }
          }}>
            {th == "night" ? (
              <label>&#x2600; light</label>
            ) : (
              <label>&#x263D; night</label>
            )}
          </button>
          <Link href={"/api/auth/signout"} className="header-link">&#x21bb;Logout</Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>


      }

      {type == "internal" &&
        <div className="header-right">
          <Link href={"/task"} className="header-link">Tasks</Link>
          <button className="header-link" onClick={() => {
            //switch theme
            let newtheme = th == "night" ? "day" : "night"
            localStorage.setItem("theme", newtheme)
            setTheme(newtheme)
            if (newtheme == "night") {
              document.documentElement.classList.add("dark")
            } else {
              document.documentElement.classList.remove("dark")
            }
          }}>
            {th == "night" ? (
              <label>&#x2600; light</label>
            ) : (
              <label>&#x263D; night</label>
            )}
          </button>
          <Link href={"/api/auth/signout"} className="header-link">&#x21bb;Logout</Link>
        </div>
      }


    </div>
  )
}

export default Navbar;