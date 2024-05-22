import React, { useContext, useEffect, useState } from 'react'
import Editor from '@monaco-editor/react'
import LanguageSelector from '../components/LanguageSelector'
import { FaCode, FaPlus, FaMinus } from "react-icons/fa6";
import { RiInputCursorMove } from "react-icons/ri";
import { LuFileOutput } from "react-icons/lu";
import useWindowWidth from '../hooks/useWindowWidth'
import AppContext from '../context/AppContext';
import {codeCompile,createCode, updateCode, deleteCode, fetchCodes} from '../api/features';
import Loader from '../components/Loader';
import {useNavigate} from 'react-router-dom';

const monacoLanguages = new Map([
    ['cpp17','cpp'],
    ['java','java'],
    ['python3','python'],
    ['c','c'],
    ['csharp','csharp'],
    ['nodejs','javascript'],
    ['dart','dart'],
    ['kotlin','kotlin'],
    ['swift','swift'],
    ['golang','go'],
    ['scala','scala'],
    ['r','r'],
    ['bash','shell'],
    ['rust','rust'],
    ['ruby','ruby'],
])


const CodeEditor = () => {

    const {isMobile} = useWindowWidth()
    const {user,language,setLanguage,setCodes,currCode,setCurrCode} = useContext(AppContext);
    const navigate = useNavigate();

    const [code,setCode] = useState('');
    const [input,setInput] = useState('');
    const [title,setTitle] = useState('');
    const [output,setOutput] = useState(null);
    const [fontSize,setFontSize] = useState(15);

    useEffect(()=>{
        if(currCode){
            setTitle(currCode.title);
            setCode(currCode.code);
            setInput(currCode.input);
            setLanguage(currCode.language);
        }
    },[])

    const [loading,setLoading] = useState(false);

    const runCode = async (language,code,input) => {
        if(!code || !language) return;
        try {
            setLoading(true);
            const result = await codeCompile(language,code,input);
            setOutput(result);
            setLoading(false);
            // console.log(result);
        } catch (error) {
            console.log(error);
        }
    }

    const save = async () => {
        if(!title || !code || !language || !user?.token) return;
        try{
            setLoading(true);
            const response = await createCode(user,title,code,language,input);
            console.log('code saved',response);
            const codesRefresh = await fetchCodes(user);
            setCodes(codesRefresh.reverse());
            setLoading(false);
            navigate('/dashboard');
        }catch(error){
            console.log(error);
        }
    }

    const update = async () => {
        if(!title || !code || !language || !user?.token || !currCode) return;
        try{
            setLoading(true);
            const id = currCode._id;
            const response = await updateCode(user,id,title,code,language,input);
            const codesRefresh = await fetchCodes(user);
            setCodes(codesRefresh.reverse());
            setLoading(false);
            navigate('/dashboard');
        }catch(error){
            console.log(error);
        }
    }

    const del = async () => {
        if(!user?.token || !currCode) return;
        try{
            setLoading(true);
            const id = currCode._id;
            const response = await deleteCode(user,id);
            const codesRefresh = await fetchCodes(user);
            setCodes(codesRefresh.reverse());
            setLoading(false);
            navigate('/dashboard');
        }catch(error){
            console.log(error);
        }
    }

    return (
        <div className='w-full h-full flex flex-col md:flex-row items-start gap-4'>

            {loading && <Loader/>}

            <div className='w-full md:w-2/3 h-[65vh] md:h-[90vh] bg-[#1e1e1e] p-3 flex flex-col gap-3 overflow-hidden'>
                <div className='flex items-center justify-between h-[30px]'>
                    <div className='text-white flex items-center gap-2'>
                        <FaCode className='text-2xl pb-1'/> 
                        <span className=''>Code Area</span>
                    </div>
                    {!isMobile && 
                    <input
                        type='text'
                        className='md: w-1/5 lg:w-1/3 outline-none bg-[#1e1e1e] text-white placeholder:italic border rounded-md py-0.5 px-2'
                        placeholder='Enter Title Here'
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />}
                    <div className='flex items-center gap-2'>
                        {user?.token && <button
                            className='rounded-[5px] px-3 py-1 flex items-center text-white text-[13px] bg-neutral-500/40 hover:bg-[#007cc4]'
                            onClick={currCode ? update : save}
                        >
                            {isMobile ? "Save" : "Save Code"}
                        </button>}
                        {user?.token && currCode && <button
                            className='rounded-[5px] px-3 py-1 flex items-center text-white text-[13px] bg-neutral-500/40 hover:bg-[#007cc4]'
                            onClick={del}
                        >
                            {isMobile ? "Delete" : "Delete Code"}
                        </button>}
                        <button
                            className='rounded-[5px] px-3 py-1 flex items-center text-white text-[13px] bg-neutral-500/40 hover:bg-[#007cc4]'
                            onClick={()=>runCode(language,code,input)}
                        >
                            {isMobile ? "Run" : "Run Code"}
                        </button>
                    </div>
                </div>
                {isMobile && 
                <input
                    type='text'
                    className='w-full outline-none bg-[#1e1e1e] text-white placeholder:italic border rounded-md py-0.5 px-2'
                    placeholder='Enter Title Here'
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />}
                <div className='w-full h-[52vh] md:h-[80vh] overflow-hidden'>
                    <Editor
                        defaultLanguage={monacoLanguages.get(language) || 'cpp'}
                        language={monacoLanguages.get(language)}
                        height="100%"
                        theme="vs-dark"
                        defaultValue=""
                        onChange={(value) => setCode(value)}
                        value={code}
                        options={{fontSize:fontSize}}
                    />
                </div>
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
                    <div className='text-white h-[30px] flex items-center gap-2'>
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
                    <div className='text-white overflow-scroll h-[24vh] md:h-[43vh]'>
                        {output ? 
                        (output?.output?.split('\n').map((line,index)=>(
                            <div key={index}>{line}<br/></div>
                        ))) : 
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