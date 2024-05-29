import React, {useContext, useEffect} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header'
import CodeEditor from './pages/CodeEditor'
import AuthRedirect from './components/AuthRedirect'
import Dashboard from './pages/Dashboard'

const App = () => {

    return (
        <>
            <div className='min-w-full min-h-screen bg-black'>
                <BrowserRouter>
                    <Header/>
                    <div className='min-w-full h-[calc(100vh-45px)] overflow-scroll p-2'>
                        <Routes>
                            <Route path='/' element={<CodeEditor/>}/>
                            <Route path='/auth' element={<AuthRedirect/>}/>
                            <Route path='/dashboard' element={<Dashboard/>}/>
                        </Routes>
                        
                    </div>
                </BrowserRouter>
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                theme="dark"
            />
        </>
    )
}

export default App