import React from "react";
import { MdMenu, MdClose, MdHome, MdRoute, MdForum, MdBook} from "react-icons/md";

export default function BottomNavigationBar() {
    <div className="fix left-0 bottom-0 w-full bg-white shadow-md py-4 flexed items-center md:hidden">
      <ul className="space-y-4 text-lg flex justify-evenly w-full">
        <li className="hover:text-gray-600 cursor-pointer"><MdHome/></li>
        <li className="hover:text-gray-600 cursor-pointer"><MdRoute/></li>
        <li className="hover:text-gray-600 cursor-pointer"><MdForum/></li>
        <li className="hover:text-gray-600 cursor-pointer"><MdBook/></li>
      </ul>
      
    </div>
}