import {useContext, useEffect, useRef, useState} from 'react';
import { Modal, ConfigProvider } from 'antd';
import { FcGoogle } from "react-icons/fc";
import AppContext from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import logo from '/icon.png'
import DevIcon from '../assets/dev.png'
import { FaCode, FaLinkedinIn, FaGithub, FaInstagram } from "react-icons/fa6";
import useWindowWidth from '../hooks/useWindowWidth';
import DefaultDP from '../assets/dev.png';

const Header = () => {

    const {user,setUser,setCodes,setCurrCode} = useContext(AppContext);
    const [dp,setDp] = useState(user?.dp);
    const [modalOpen, setModalOpen] = useState(false);
    const [infoModalOpen, setInfoModalOpen] = useState(false);
    const {isMobile} = useWindowWidth();
    const navigate = useNavigate();

    const loginRedirect = () => {
        window.location.href = 'https://codelab-server-harshpx.vercel.app/api/auth/google';
    }
    const logoutHandler = () => {
        localStorage.removeItem('currUser');
        setUser(null);
        setCodes([]);
        setCurrCode(null);
        setModalOpen(false);
        navigate('/')
    }
    const myCodesHandler = () => {
        navigate('/dashboard');
        setModalOpen(false);
    }

    const linkRedirect = (link)=>{
        window.open(link, '_blank');
    }

    const handleImgError = () => {
        setDp(DefaultDP);
    }

    useEffect(()=>{
        if(user?.dp) setDp(user.dp);
    },[user]);



    return (
        <div className='w-full flex items-center justify-between h-[45px] bg-[#007cc4] text-white'>
            <div className='h-full px-4 py-0.5 flex items-center gap-1 cursor-pointer bg-white/20 hover:bg-white/40' onClick={()=>setInfoModalOpen(true)}>
                <img src={logo} alt="" className='size-8'/>
                <span className='text-lg'>CodeLab</span>
            </div>
            {!user?.token ? <div className='flex items-center gap-2 text-sm h-full'>
                <button 
                    onClick={()=>setModalOpen(true)} 
                    className='px-4 text-white h-full hover:bg-white/40 sm:bg-white/20'
                >
                    Login to save codes
                </button>
            </div>:
            <div className='flex items-center gap-2 h-full'>
                <button
                    onClick={()=>setModalOpen(true)}
                    className='flex items-center gap-2 hover:bg-white/30 px-4 h-full'
                >
                    <div className='rounded-full size-8 overflow-hidden'>
                        <img src={dp} alt="user dp" onError={handleImgError} className='w-full h-full object-cover'/>
                    </div>
                    <span className='text-[14px]'>Hi {user.name.split(' ')[0]}!</span>
                </button>
                <button
                    onClick={myCodesHandler}
                    className='flex items-center gap-2 hover:bg-white/30 px-4 h-full'
                >
                    <FaCode size={20}/>
                    {!isMobile ? <span className='text-[14px]'>My Codes</span> : null}
                </button>
            </div>}
            <ConfigProvider
                theme={{
                    token:{colorBgMask: 'rgba(10,10,10,0.5)'}
                }}
            >
                <Modal
                    centered
                    open={modalOpen}
                    onClose={()=>setModalOpen(false)}
                    onOk={()=>setModalOpen(false)}
                    onCancel={()=>setModalOpen(false)}
                    title={false}
                    footer={false}
                    width= {!user?.token ? 450 : "fit-content"}
                    styles={{
                        content: {
                            color:'white', 
                            backgroundColor:'black', 
                            border:'1px solid #363636', 
                            display:'flex', 
                            justifyContent:'center', 
                            alignItems:'center',
                        }
                    }}
                >
                    {!user?.token ? 
                    <div className='flex flex-col items-center gap-5'>
                        <h1 className='text-2xl text-center flex items-center gap-4'>
                            <span className='text-right text-xl w-1/2'>Login/Register with</span>
                            <div className='flex items-center gap-1 w-1/2'>
                                <img src={logo} alt="" className='size-8'/> <span>CodeLab</span>
                            </div>
                        </h1>
                        <button
                        className='rounded-md bg-neutral-500/40 hover:bg-neutral-500 px-4 py-1 flex items-center gap-2 text-[15px]'
                        onClick={loginRedirect}
                        >
                            Sign in with <FcGoogle size={24}/>
                        </button>
                    </div> : 
                    <div className='flex flex-col items-center justify-center gap-4 px-2'>
                        <div 
                            className="size-40 rounded-full" 
                            style={{
                                backgroundImage: `url(${dp})`, 
                                backgroundSize:'cover', 
                                backgroundPosition:'center'
                            }}
                        />
                        <div className='flex flex-col items-start justify-center gap-3'>
                            <div className='flex flex-col items-center justify-center'>
                                <span className='text-[40px]'>{user.name}</span>
                                <span className='text-[15px] text-neutral-400'>{user.email}</span>
                            </div>
                            <div className='w-full flex justify-center items-center gap-2 mt-3'>
                                <button 
                                className='px-2 py-1 rounded-md bg-neutral-500/40 hover:bg-[#007cc4]'
                                onClick={myCodesHandler}
                                >
                                    My Codes
                                </button>
                                <button 
                                className='px-2 py-1 rounded-md bg-neutral-500/40 hover:bg-neutral-500'
                                onClick={logoutHandler}
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>}
                </Modal>

                <Modal
                    centered
                    open={infoModalOpen}
                    onClose={()=>setInfoModalOpen(false)}
                    onOk={()=>setInfoModalOpen(false)}
                    onCancel={()=>setInfoModalOpen(false)}
                    title={false}
                    footer={false}
                    width= 'fit-content'
                    styles={{
                        content: {
                            color:'white', 
                            backgroundColor:'black', 
                            border:'1px solid #363636', 
                            display:'flex',
                            justifyContent:'center', 
                            alignItems:'center',
                        }
                    }}
                >
                    <div className='h-full w-full flex flex-col items-center justify-center gap-6'>
                        <img src={DevIcon} alt="" className='size-32'/>
                        <div className='text-center text-xl flex flex-col items-center justify-center gap-1'>
                            <span className=''>This project is developed and maintained by</span>
                            <span className='font-bold text-2xl'>Harsh Priye</span>
                        </div>
                        <div className='w-full flex items-center justify-center gap-3 flex-wrap'>
                            <div
                                className='transition-all duration-200 flex items-center justify-center text-center gap-2 rounded-full p-1 bg-white text-black border-2 border-white cursor-pointer hover:bg-black hover:text-white hover:scale-125'
                                onClick={()=>linkRedirect('https://www.harshpriye.in')}
                            >
                                <FaCode size={20}/>
                                <div>Portfolio</div>
                            </div>
                            <div
                                className='transition-all duration-200 flex items-center justify-center text-center gap-2 rounded-full p-1 bg-white text-black border-2 border-white cursor-pointer hover:bg-black hover:text-white hover:scale-125'
                                onClick={()=>linkRedirect('https://www.linkedin.com/in/harshpx/')}
                            >
                                <FaLinkedinIn size={20}/>
                                <div>Linkedin</div>
                            </div>
                            <div 
                                className='transition-all duration-200 flex items-center justify-center text-center gap-2 rounded-full p-1 bg-white text-black border-2 border-white cursor-pointer hover:bg-black hover:text-white hover:scale-125'
                                onClick={()=>linkRedirect('https://github.com/harshpx')}
                            >
                                <FaGithub size={20}/>
                                <div>GitHub</div>
                            </div>
                            <div
                                className='transition-all duration-200 flex items-center justify-center text-center gap-2 rounded-full p-1 bg-white text-black border-2 border-white cursor-pointer hover:bg-black hover:text-white hover:scale-125'
                                onClick={()=>linkRedirect('https://www.instagram.com/harshhh.hhhh/')}
                            >
                                <FaInstagram size={20}/>
                                <div>Instagram</div>
                            </div>
                        </div>
                        <div className='text-center text-[15px]'>
                            This project is built using React.js, Tailwind CSS and Ant Design,<br/>alongwith Node+Express.js and MongoDB.<br/>
                            And is powered by JDoodle.
                        </div>
                        <div className='flex items-center justify-center gap-2 flex-wrap'>
                            <FaCode size={19}/> 
                            <span className='text-[16px]'>Source Code:</span>
                            <a 
                                href="https://github.com/harshpx/CodeLab" 
                                target="_blank" 
                                className='transition-all duration-200 text-[16px] text-[#5fc4ff] hover:underline'
                            >
                                github.com/harshpx/CodeLab
                            </a>
                        </div>
                    </div>
                </Modal>
            </ConfigProvider>
        </div>
    )
}

export default Header;