import AsyncHandler from 'express-async-handler';
import fetch from 'node-fetch';

export const compile = AsyncHandler(async (req, res) => {
    const {language,code,input} = req.body;
    const url = "https://api.jdoodle.com/v1/execute";
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            clientId: process.env.COMPILER_CLIENT_ID,
            clientSecret: process.env.COMPILER_CLIENT_SECRET,
            script: code,
            stdin: input,
            language: language,
            versionIndex: "0",
            compileOnly: false,
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