import React, { useContext } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark, vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { MdUpdate, MdDelete } from "react-icons/md";
import AppContext from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

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

const CodeCard = ({curr}) => {

    const {currCode,setCurrCode} = useContext(AppContext);
    const navigate = useNavigate();

    const clickHandler = ()=>{
        setCurrCode(curr);
        navigate('/');
    }

    const shortenCode = code =>{
        let arr = code.split('\n');
        let len = arr.length;
        arr = arr.slice(0, Math.min(10, len));
        if(len > 10) arr.push('...');
        return arr.join('\n');
    }

    return (
        <div 
        onClick={clickHandler}
        className='w-full aspect-3/4 bg-neutral-800 flex flex-col items-center cursor-pointer hover:bg-neutral-700 px-4 py-3 gap-2 hover:scale-105 duration-150'
        >
            <div className='text-3xl'>{curr.title}</div>
            <div className=' w-full grow rounded-lg overflow-hidden relative'>
                <SyntaxHighlighter language={monacoLanguages.get(curr.language)} style={vscDarkPlus} className='h-full overflow-hidden'>
                    {shortenCode(curr.code)}
                </SyntaxHighlighter>
                <div className='absolute bottom-0 right-2 text-right text-sm text-neutral-400'>{curr.language}</div>
            </div>
        </div>
    )
}

export default CodeCard;