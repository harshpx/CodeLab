import React from "react";


export const codeCompile = async (language, code, input) => {
    const URL = "https://codelab-server-harshpx.vercel.app/api/compile";
    const options = {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({language,code,input}),
    };

    try {
        const response = await fetch(URL, options);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
    return {}
}


export const fetchCodes = async(user)=>{
    const url = 'https://codelab-server-harshpx.vercel.app/api/codes';
    const options = {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${user.token}`
        }
    }
    try {
        const response = await fetch(url, options);
        let data = await response.json();
        data = data.reverse();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const createCode = async (user, title, code, language, input) => {
    const url = "https://codelab-server-harshpx.vercel.app/api/codes";
    const options = {
        method: 'POST',
        headers: {
            'authorization': `Bearer ${user.token}`,
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            title,
            code,
            language,
            input
        })
    }
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error('Error creating code');
    }
}

export const updateCode = async (user, id, title, code, language, input) => {
    const url = `https://codelab-server-harshpx.vercel.app/api/codes/${id}`;
    const options = {
        method: 'PUT',
        headers:{
            'authorization': `Bearer ${user.token}`,
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            title,
            code,
            language,
            input
        })
    }
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const deleteCode = async (user, id) => {
    const url = `https://codelab-server-harshpx.vercel.app/api/codes/${id}`;
    const options = {
        method: 'DELETE',
        headers:{
            'authorization': `Bearer ${user.token}`,
        }
    }
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}