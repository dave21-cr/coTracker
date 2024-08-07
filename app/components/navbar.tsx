'use client'
import React from "react"
import { useState } from "react"
import "next/image";
import image from "../images/logo.jpg";
import Image from "next/image";
import Link from "next/link";
import { GiNextButton } from "react-icons/gi";

interface navbarprop {
  theme: string,
  type?: string
}

//nav bar component
const Navbar: React.FC<navbarprop> = ({ theme, type }) => {
  //
  const [th, setTheme] = useState<string>(theme);
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

      {type == "internal" &&
        <div className="header-right">
          <Link href={"/task"} className="header-link">Tasks</Link>
          <button className="header-link" onClick={() => {
            //switch theme
            setTheme(th == "night" ? "day" : "night")

            if (th == "night") {
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