import React, { useContext, useState } from 'react'

const CustomSwitch = ({currOption,setOption,options=[]}) => {
    return (
        <div className='rounded-lg shadow-xl bg-black flex items-center justify-center w-fit'>
            {options.map(option=>(
                <div
                    key={option}
                    className={`${currOption===option ? "bg-[#007cc4] text-white" : "bg-zinc-900"}
                    px-10 h-8 w-10 text-sm rounded-lg flex items-center justify-center cursor-pointer`} 
                    onClick={()=>setOption(option)}
                >
                    {option}
                </div>
            ))}
        </div>
    )
}

export default CustomSwitch