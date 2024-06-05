import React, { useContext, useEffect, useState } from 'react'
import Editor from '@monaco-editor/react'
import LanguageSelector from '../components/LanguageSelector'
import { FaCode, FaPlus, FaMinus, FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { RiInputCursorMove } from "react-icons/ri";
import { LuFileOutput } from "react-icons/lu";
import useWindowWidth from '../hooks/useWindowWidth'
import AppContext from '../context/AppContext';
import {codeCompile,createCode, updateCode, deleteCode, fetchCodes} from '../api/features';
import Loader from '../components/Loader';
import {useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';

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

    const [expectedOutput,setExpectedOutput] = useState('');
    const [showExpectedOutput,setShowExpectedOutput] = useState(false);
    const [result,setResult] = useState('');
    const [showInputBox,setShowInputBox] = useState(true);

    useEffect(()=>{
        if(currCode){
            setTitle(currCode.title);
            setCode(currCode.code);
            setInput(currCode.input);
            setLanguage(currCode.language);
        }
    },[])

    useEffect(()=>{
        if(isMobile){
            setShowInputBox(true)
        }
    },[isMobile])

    const [loading,setLoading] = useState(false);

    const runCode = async (language,code,input) => {
        if(!code){
            toast('Enter some code first');
            return;
        }
        if(!code || !language) return;
        try {
            setLoading(true);
            const result = await codeCompile(language,code,input);
            setOutput(result);

            if(result?.output?.trim() === expectedOutput?.trim()){
                setResult('Passed');
            } else{
                setResult('Failed');
            }
            setLoading(false);
            toast.success('Code Compiled Successfully');
            
        } catch (error) {
            toast.error('Error Compiling Code');
            console.log(error);
        }
    }

    const save = async () => {
        if(!title){
            toast("Can't save code without title");
            return;
        }
        if(!code){
            toast("Can't save code without code");
            return;
        }
        if(!title || !code || !language || !user?.token) return;
        try{
            setLoading(true);
            const response = await createCode(user,title,code,language,input);
            console.log('code saved',response);
            const codesRefresh = await fetchCodes(user);
            setCodes(codesRefresh);
            setLoading(false);
            toast.success('Code Created Successfully');
            navigate('/dashboard');
        }catch(error){
            toast.error('Error Saving Code');
            console.log(error);
        }
    }

    const update = async () => {
        if(!title){
            toast("Can't save code without title");
            return;
        }
        if(!code){
            toast("Can't save code without code");
            return;
        }
        if(!title || !code || !language || !user?.token || !currCode) return;
        try{
            setLoading(true);
            const id = currCode._id;
            const response = await updateCode(user,id,title,code,language,input);
            const codesRefresh = await fetchCodes(user);
            setCodes(codesRefresh);
            setLoading(false);
            toast.success('Code Updated Successfully');
            navigate('/dashboard');
        }catch(error){
            toast.error('Error Updating Code');
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
            setCodes(codesRefresh);
            setLoading(false);
            toast.success('Code Deleted Successfully');
            navigate('/dashboard');
        }catch(error){
            toast.error('Error Deleting Code');
            console.log(error);
        }
    }

    return (
        <div className='w-full h-full flex flex-col md:flex-row items-start gap-2'>

            {loading && <Loader/>}

            {/* code editor layout */}
            <div className='h-3/4 md:h-full w-full md:w-2/3'>
                {/* code editor box */}
                <div className='h-full w-full p-2 md:p-4 gap-2 bg-[#1e1e1e] flex flex-col items-center'>
                    {/* headerbar for code area */}
                    <div className='flex items-center justify-between h-[30px] w-full'>
                        <div className='text-white flex items-center gap-2'>
                            <FaCode className='text-2xl pb-1'/> 
                            <span className=''>Code Area</span>
                        </div>
                        {!isMobile && 
                        <input
                            type='text'
                            className='md: w-1/6 lg:w-1/3 outline-none bg-[#1e1e1e] text-white placeholder:italic border rounded-md py-0.5 px-2 text-center'
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

                    {/* code editor */}
                    <div className='w-full overflow-hidden grow'>
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
                    {/* editor options */}
                    <div className='flex items-center justify-between w-full'>
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
            </div>

            {/* I/O layout */}
            <div className='flex md:flex-col items-center justify-center gap-2 h-1/4 md:h-full w-full md:w-1/3 overflow-scroll'>
                {/* input box */}
                <div className='w-full h-full md:h-fit p-2 md:p-4 gap-2 bg-[#1e1e1e] flex flex-col items-start'>
                    <div className='flex items-center justify-between h-[30px] w-full'>
                        <div className='text-white flex items-center gap-2'>
                            <LuFileOutput className='text-2xl'/>
                            <span className='pt-1'>Input</span>
                        </div>
                        {!isMobile && <button
                            className='mt-1 rounded-[5px] p-2 flex items-center text-white text-[12px] bg-neutral-500/40 hover:bg-neutral-500/90'
                            onClick={() => {setShowInputBox(prev=>!prev)}}
                        >
                            {showInputBox ? <FaChevronUp/> : <FaChevronDown/>}
                        </button>}
                    </div>
                    {showInputBox && <textarea 
                        className='w-full h-full outline-none bg-[#1e1e1e] text-white p-2 placeholder:italic placeholder:text-sm resize-none' 
                        placeholder='Enter Input Here...'
                        rows={isMobile ? 3 : 7}
                        onChange={(e) => {setInput(e.target.value); setResult('');}}
                        value={input}
                    />}
                </div>
                {/* expected output box */}
                {!isMobile && <div className={`w-full p-2 md:p-4 gap-2 bg-[#1e1e1e] flex flex-col items-start`}>
                    <div className='flex items-center justify-between h-[30px] w-full'>
                        <div className='text-white flex items-center gap-2'>
                            <LuFileOutput className='text-2xl'/>
                            <span className='pt-1'>Expected Output</span>
                        </div>
                        <button
                            className='mt-1 rounded-[5px] p-2 flex items-center text-white text-[12px] bg-neutral-500/40 hover:bg-neutral-500/90'
                            onClick={() => {setShowExpectedOutput(prev=>!prev)}}
                        >
                            {showExpectedOutput ? <FaChevronUp/> : <FaChevronDown/>}
                        </button>
                    </div>
                    {output && expectedOutput && result && <div>
                        {result==='Passed' ? 
                        <div className='px-3 py-1 text-green-500 rounded-[5px] bg-green-500/20'>Passed</div> :
                        <div className='px-3 py-1 text-red-500 rounded-[5px] bg-red-500/20'>Failed</div>}
                    </div>}
                    {showExpectedOutput && <textarea 
                        className={`h-full w-full outline-none bg-[#1e1e1e] text-white text-sm p-2 placeholder:italic placeholder:text-sm resize-none`} 
                        placeholder='Enter expected output...'
                        rows={6}
                        onChange={(e) => {setExpectedOutput(e.target.value); setResult('');}}
                        value={expectedOutput}
                    />}
                </div>}
                {/* output box */}
                <div className='h-full md:h-1/3 grow w-full p-2 md:p-4 gap-2 bg-[#1e1e1e] flex flex-col items-center justify-between'>
                    <div className='flex items-center justify-between h-[30px] w-full'>
                        <div className='text-white flex items-center gap-2'>
                            <LuFileOutput className='text-2xl'/>
                            <span className='pt-1'>Output</span>
                        </div>
                        <button
                            className='mt-1 rounded-[5px] px-3 py-1 flex items-center text-white text-[12px] bg-neutral-500/40 hover:bg-neutral-500/90'
                            onClick={() => {setOutput(null); setResult('');}}
                        >
                            {isMobile ? 'Clear' : 'Clear Output'}  
                        </button>
                    </div>
                    <div className='text-white text-sm overflow-scroll w-full min-h-0 grow'>
                        {output ? 
                        (output?.output?.trim()?.split('\n')?.map((line,index)=>(
                            <div key={index}>{line}<br/></div>
                        ))) : 
                        <span className='text-neutral-500 italic'>Nothing to show</span>}
                    </div>
                    {output && <div className='text-neutral-500 text-sm italic flex items-center justify-between px-1 w-full'>
                        <span>CPU Time: {output.cpuTime}</span>
                        <span>Memory: {output.memory}</span>
                    </div>}
                </div>
            </div>

        </div>
    )
}

export default CodeEditor