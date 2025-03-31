import React from "react";
import { NavLink } from "react-router";

export default function NavigationBarItem(
    {
        SelectedIcon,
        UnselectedIcon, 
        link,
        labelText = ""
    }
) {
    return (
        <NavLink to={link} >
            {({isActive}) => (
                <div className="h-full flex flex-col items-center justify-center">
                    <div className={`w-16 h-8 rounded-2xl flex justify-center items-center ${isActive? "bg-green-200" : "bg-white"}`}>
                        {isActive?<SelectedIcon className="size-6"/>:<UnselectedIcon className="size-6"/>}
                    </div>
                    <p className={`text-sm ${isActive ? "font-bold" : ""}`}>{labelText}</p>
                </div>
                )
            }
        </NavLink>
    )
}