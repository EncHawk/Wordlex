import React from "react";

export const Wgrid= ({length}:any)=>{
    function returnGrid(){
        while(length--){
            return(
                <div className="bg-blue-400 w-40 h-40 py-2 px-px border-neutral-300">
                </div>
            )
        }
    }
    return(
        <div className="flex justify-content items-center w-full">
            <div className={`grid grid-cols${length}`}>
               {returnGrid()}
            </div>
        </div>
    )
}