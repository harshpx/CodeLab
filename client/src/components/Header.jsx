import React from 'react'
import { FiCodesandbox } from "react-icons/fi";



const Header = () => {
    return (
        <div className='w-full flex items-center justify-between px-5 h-[45px] bg-[#007cc4] text-white'>
            <div className='flex items-center gap-1'>
                <FiCodesandbox className='text-3xl'/>
                <span className='text-lg'>CodeLab</span>
            </div>
            <div className='flex items-center gap-2 text-sm h-full'>
                <button className='px-3 py-1 bg-[#007cc4] text-white h-full hover:bg-white/30'>Login/Register</button>
            </div>
        </div>
    )
}

export default Header