import React from "react";
import { Outlet, Link } from "react-router-dom";

export default function Root (){
  return (
    <div className="flex flex-row w-full h-screen">
      <div className="flex flex-col items-center h-full	w-48 text-gray-700 bg-gray-100">
        <button className="mt-3 text-lg font-bold">
          <Link to={"/"}>Rick And Morty</Link>
        </button>
        <div className="w-full px-2">
          <div className="flex flex-col items-center w-full h-full mt-3 border-t border-gray-300">
            <button className=" mt-3 text-md font-medium">
              <Link to={"contact"}>Contact</Link>
            </button>
          </div>
        </div>
        <div id="detail"></div>
      </div>
      <div className="w-full h-full">
        <Outlet />
      </div>
    </div>
  );

}