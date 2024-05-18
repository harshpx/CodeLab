import React from "react";


const codeCompile = async (language, code, input) => {
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

export default codeCompile;