import React from "react";
import { MdHome, MdRoute, MdForum, MdBook, MdOutlineHome, MdOutlineRoute, MdOutlineForum, MdOutlineBook} from "react-icons/md";
import NavigationBarItem from "./navigationBarItem";


export default function BottomNavigationBar() {
  return(
    <div className="z-10 bottom-0 fixed w-full bg-white md:hidden" style={{boxShadow: "0px -1px 10px gray"}}>
      <ul className="h-20 text-xl flex justify-evenly w-full gap-2">
        <li className={"flex-1  hover:text-gray-600 cursor-pointer"}>
            <NavigationBarItem SelectedIcon={MdHome} UnselectedIcon={MdOutlineHome} link={"/"} labelText="Home"/>
        </li>
        <li className="hover:text-gray-600 cursor-pointer flex-1">
          <NavigationBarItem SelectedIcon={MdRoute} UnselectedIcon={MdOutlineRoute} link={"/roadmaps"} labelText="Roadmaps"/>
        </li>
        
        <li className="hover:text-gray-600 cursor-pointer flex-1">
          <NavigationBarItem SelectedIcon={MdForum} UnselectedIcon={MdOutlineForum} link={"/community"} labelText="Community"/>
        </li>
        
        <li className="hover:text-gray-600 cursor-pointer flex-1">
          <NavigationBarItem SelectedIcon={MdBook} UnselectedIcon={MdOutlineBook} link={"/resources"} labelText="Resources"/>
        </li>
      
      </ul>
    </div>
  )
}