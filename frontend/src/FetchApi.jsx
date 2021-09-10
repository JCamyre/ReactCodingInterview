import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Make a call and display contents from https://randomuser.me/api
// Might need to do response.data

function GetApi(){

    // You return the get function, and then inside the function you return the JSON. Don't forget for axios two returns. 
    return axios.get('https://randomuser.me/api')
    .catch((err) => {
        console.error('There has been an error');
    })
    .then((response) => {
        if(response.data){
            // console.log(JSON.stringify(response));
            return JSON.stringify(response);
        }
    });
// Don't use useEffect if you are using a separate function for getting API?
// Huge brain move: use the useEffect when you are calling this function in the main component (FetchApi). 
}

function FetchApi() {
    const [data, setData] = useState('');

    // Best to put the API getting logic in a separate file (like an API components folder)
    useEffect(() => {
        GetApi().then((result) => {
            setData(result);
        })
    }, []); // [data] doesn't work here since it checks the "next" value to the current value and since this api returns random data every time, always update, so we just have it empty so it will only load once (on page load). 


    console.log(data);

    return (
        <div>
            <h3>{data}</h3>
        </div>
    )
}



export default FetchApi