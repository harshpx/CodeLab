import React, {useContext, useEffect} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import LanguageSelector from './components/LanguageSelector'
import AppContext from './context/AppContext'
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
                <div className='min-w-full overflow-scroll px-2 py-2 md:px-3 md:py-4'>
                    <Routes>
                        <Route path='/' element={<CodeEditor/>}/>
                        <Route path='/auth' element={<AuthRedirect/>}/>
                        <Route path='/dashboard' element={<Dashboard/>}/>
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
        </>
    )
}

export default App