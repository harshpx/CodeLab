import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { GoPlusCircle } from "react-icons/go";
import CodeCard from '../components/CodeCard';
import {fetchCodes} from '../api/features';
import Loader from '../components/Loader';


const Dashboard = () => {
    const navigate = useNavigate()
    const {user,codes,setCodes,setCurrCode} = useContext(AppContext);
    const [loading,setLoading] = useState(false);

    useEffect(()=>{
        if(!user?.token) navigate('/');
        setCurrCode(null);
    },[navigate])

    useEffect(()=>{
        if(user?.token && !codes.length){
            ;(async ()=>{
                try {
                    setLoading(true);
                    const data = await fetchCodes(user);
                    setCodes(data);
                    // console.log(data);
                    setLoading(false);
                } catch (error) {
                    console.log(error);
                }
            })()
        }
    },[])

    return (
        <div className=''>
            <div className='text-white h-[90.5vh] p-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2'>
                {loading && <Loader/>}
                <div 
                    className='w-full aspect-3/4 bg-neutral-800 flex items-center justify-center cursor-pointer hover:bg-neutral-700' 
                    onClick={()=>{setCurrCode(null); navigate('/');}}
                >
                    <div className='flex flex-col items-center justify-center gap-4 hover:scale-125 duration-150 w-full h-full'>
                        <GoPlusCircle className='text-6xl'/>
                        <span>New Code</span>
                    </div>
                </div>
                {codes?.map((curr,index)=>(
                    <CodeCard key={index} curr={curr}/>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;