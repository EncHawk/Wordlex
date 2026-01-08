// import React from "react";
import { Link } from "react-router-dom";

export const ErrorPage=()=>{
    return(
        <div className="flex items-center h-screen w-full justify-center w-full">
            <h1 className="text-2xl font-bold text-indigo-500">
                Ah damn! You're Lost, Go back this way :
            </h1>
            <Link to="/home" className="text-3xl font-bold text-green-600 italic">WAY</Link>
        </div>
    )
}