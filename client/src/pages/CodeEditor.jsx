import React, { useContext, useEffect, useState } from 'react'
import Editor from '@monaco-editor/react'
import LanguageSelector from '../components/LanguageSelector'
import { FaCode, FaPlus, FaMinus } from "react-icons/fa6";
import { RiInputCursorMove } from "react-icons/ri";
import { LuFileOutput } from "react-icons/lu";
import useWindowWidth from '../hooks/useWindowWidth'
import AppContext from '../context/AppContext';
import codeCompile from '../api/codeCompile';
import { RotatingSquare } from 'react-loader-spinner';


const CodeEditor = () => {

    const {isMobile} = useWindowWidth()
    const {language,setLanguage} = useContext(AppContext);

    const [code,setCode] = useState('');
    const [input,setInput] = useState('');
    const [output,setOutput] = useState(null);
    const [fontSize,setFontSize] = useState(15);

    const [loading,setLoading] = useState(false);

    // useEffect(() => {
    //     setCode('')
    //     setInput('')
    //     setOutput(null)
    // },[language,setLanguage])

    useEffect(()=>{
        console.log(fontSize);
    },[fontSize])

    const runCode = async (language,code,input) => {
        if(!code || !language) return;
        try {
            setLoading(true);
            const result = await codeCompile(language,code,input);
            setOutput(result);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='w-full h-full flex flex-col md:flex-row items-start gap-4'>

            {loading && 
            <div className='z-10 min-h-screen min-w-full absolute top-0 flex items-center justify-center bg-opacity-50 bg-black'>
                <RotatingSquare 
                    visible={true}
                    height="100"
                    width="100"
                    color="#109cee"
                    ariaLabel="rotating-square-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            </div>}

            <div className='w-full md:w-2/3 h-[65vh] md:h-[90vh] bg-[#1e1e1e] p-3 flex flex-col gap-3 overflow-hidden'>
                <div className='flex items-center justify-between h-[30px]'>
                    <div className='text-white flex items-center gap-2'>
                        <FaCode className='text-2xl pb-1'/> 
                        <span className=''>Code Area</span>
                    </div>
                    <div className='flex items-center justify-between md:justify-normal gap-4'>
                        <button
                            className='rounded-[5px] px-3 py-1 flex items-center text-white text-[13px] bg-neutral-500/40 hover:bg-[#007cc4]'
                            onClick={() => runCode(language,code,input)}
                        >
                            Run Code
                        </button>
                    </div>
                </div>
                <Editor
                    defaultLanguage="cpp"
                    language={language}
                    height="100%"
                    theme="vs-dark"
                    defaultValue=""
                    onChange={(value) => setCode(value)}
                    value={code}
                    options={{fontSize:fontSize}}
                />
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                        <span className='text-white text-[13px]'>Language:</span>
                        <LanguageSelector/>
                    </div>
                    <div className='flex items-center justify-center gap-1'>
                        <button 
                            className='text-white p-1.5 rounded-[5px] bg-neutral-500/40 hover:bg-neutral-500' 
                            onClick={() => setFontSize(prev=>prev+1)}
                            disabled={fontSize > 24}
                        >
                            <FaPlus/>
                        </button>
                        <button 
                            className='text-white p-1.5 rounded-[5px] bg-neutral-500/40 hover:bg-neutral-500' 
                            onClick={() => setFontSize(prev=>prev-1)}
                            disabled={fontSize < 14}
                        >
                            <FaMinus/>
                        </button>
                    </div>
                </div>
            </div>
            <div className='w-full md:w-1/3 h-[90vh] flex md:flex-col justify-end gap-4'>
                <div className='w-full p-3 h-[25vh] md:h-[45vh] bg-[#1e1e1e]'>
                    <div className='text-white h-[30px] flex ite//enter your code here
#include<iostream>
using namespace std;

int main(){
    cout<<"Hello world!";
    return 0;
}ms-center gap-2'>
                        <RiInputCursorMove className='text-2xl'/>
                        <span className='pt-1'>Input</span>
                    </div>
                    <textarea 
                        className='w-full outline-none bg-[#1e1e1e] text-white p-2 placeholder:italic' 
                        placeholder='Enter Input Here'
                        rows={isMobile ? 5 : 10}
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                    />
                </div>
                <div className='w-full p-3 h-[25vh] md:h-[44vh] bg-[#1e1e1e] flex flex-col gap-2'>
                    <div className='flex items-center justify-between h-[30px]'>
                        <div className='text-white flex items-center gap-2'>
                            <LuFileOutput className='text-2xl'/>
                            <span className='pt-1'>Output</span>
                        </div>
                        <button
                            className='mt-1 rounded-[5px] px-3 py-1 flex items-center text-white text-[12px] bg-neutral-500/40 hover:bg-neutral-500/90'
                            onClick={() => setOutput(null)}
                        >
                            {isMobile ? 'Clear' : 'Clear Output'}  
                        </button>
                    </div>
                    <div className='text-neutral-400 overflow-scroll h-[24vh] md:h-[43vh]'>
                        {output ? 
                        (output.output) : 
                        <span className='text-neutral-500 italic'>Nothing to show</span>}
                    </div>
                    {output && <div className='text-neutral-500 text-sm italic flex items-center justify-between px-1'>
                        <span>CPU Time: {output.cpuTime}</span>
                        <span>Memory: {output.memory}</span>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default CodeEditor