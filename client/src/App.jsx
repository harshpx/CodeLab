import React, {useContext, useEffect} from 'react'
import LanguageSelector from './components/LanguageSelector'
import AppContext from './context/AppContext'
import Header from './components/Header'
import CodeEditor from './pages/CodeEditor'

const App = () => {

    return (
        <>
        <div className='min-w-full min-h-screen bg-black'>
            <Header/>
            <div className='min-w-full overflow-scroll px-2 py-2 md:px-3 md:py-4'>
                <CodeEditor/>
            </div>
        </div>
        </>
    )
}

export default App