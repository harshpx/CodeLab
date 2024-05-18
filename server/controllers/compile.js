import AsyncHandler from 'express-async-handler';
import fetch from 'node-fetch';

export const compile = AsyncHandler(async (req, res) => {
    const {language,code,input} = req.body;
    const url = "https://online-code-compiler.p.rapidapi.com/v1/";
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': process.env.COMPILER_API_KEY,
            'X-RapidAPI-Host': process.env.COMPILER_API_HOST,
        },
        body: JSON.stringify({
            language: language,
            code: code,
            input: input
        })
    }


    res.setHeader('Access-Control-Allow-Origin', '*');

    const response = await fetch(url,options);
    const data = await response.json();

    if(data){
        const result = {
            output: data.output,
            cpuTime: data.cpuTime,
            memory: data.memory,
        }
        res.status(200).json(result);
    }else{
        res.status(400);
        throw new Error('Unable to compile code');
    }
});