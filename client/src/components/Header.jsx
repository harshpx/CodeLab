import {useContext, useState} from 'react';
import { Modal, ConfigProvider } from 'antd';
import { FiCodesandbox } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaCode } from "react-icons/fa6";
import AppContext from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import logo from '/icon.png'


const Header = () => {

    const {user,setUser,setCodes,setCurrCode} = useContext(AppContext);
    const [modalOpen, setModalOpen] = useState(false);
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

    return (
        <div className='w-full flex items-center justify-between px-5 h-[45px] bg-[#007cc4] text-white'>
            <div className='flex items-center gap-1'>
                <img src={logo} alt="" className='size-8'/>
                <span className='text-lg'>CodeLab</span>
            </div>
            {!user?.token ? <div className='flex items-center gap-2 text-sm h-full'>
                <button 
                    onClick={()=>setModalOpen(true)} 
                    className='px-3 py-1 bg-[#007cc4] text-white h-full hover:bg-white/40 bg-white/20'
                >
                    Login to save codes
                </button>
            </div>:
            <div className='flex items-center gap-2 h-full'>
                <button
                    onClick={()=>setModalOpen(true)}
                    className='flex items-center gap-2 hover:bg-white/30 px-2 h-full'
                >
                    <div className='rounded-full size-8 overflow-hidden'>
                        <img src={user.dp} alt="user-dp" className='w-full h-full object-cover'/>
                    </div>
                    <span className='text-[14px]'>Hi {user.name.split(' ')[0]}!</span>
                </button>
                <button
                    onClick={myCodesHandler}
                    className='flex items-center gap-2 hover:bg-white/30 px-2 h-full'
                >
                    <FaCode size={20}/>
                    <span className='text-[14px]'>My Codes</span>
                </button>
            </div>}
            <ConfigProvider
                theme={{
                    token:{colorBgMask: 'rgba(10,10,10,0.5)'}
                }}
            >
                <Modal
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
                    <div className='flex items-center gap-4 px-2'>
                        <div 
                            className="size-32 rounded-full" 
                            style={{
                                backgroundImage: `url(${user.dp})`, 
                                backgroundSize:'cover', 
                                backgroundPosition:'center'
                            }}
                        />
                        <div className='flex flex-col items-start gap-3'>
                            <div className='flex flex-col items-start'>
                                <span className='text-[30px]'>{user.name}</span>
                                <span className='text-[15px] text-neutral-400'>{user.email}</span>
                            </div>
                            <div className='flex items-center gap-2'>
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
            </ConfigProvider>
        </div>
    )
}

export default Header;