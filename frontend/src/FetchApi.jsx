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
            // return JSON.stringify(response, null, 2); // idk what null, 2 does.
            return response;
        }
    });
// Don't use useEffect if you are using a separate function for getting API?
// Huge brain move: use the useEffect when you are calling this function in the main component (FetchApi). 
}

// Display username and profile pic
// Could split up into more files, but it find
function FetchApi() {
    // const [data, setData] = useState('');
    const [name, setName] = useState('');
    const [profileImg, setProfileImg] = useState('');

    // Best to put the API getting logic (GetApi) in a separate file (like an API components folder) separate from this FetchApi.jsx file
    useEffect(() => {
        GetApi().then((result) => {
            // setData(result);
            if (result) {
                console.log(result['data']['results'][0]['picture']['medium']);
                setName(result['data']['results'][0]['name']['first'] + ' ' + result['data']['results'][0]['name']['last']);
                setProfileImg(result['data']['results'][0]['picture']['large'])
            }
        })
    }, []); // [data] doesn't work here since it checks the "next" value to the current value and since this api returns random data every time, always update, so we just have it empty so it will only load once (on page load). 


    return (
        <div>
            <img alt='Profile pic' src={profileImg} />
            <h2>{name}</h2>
        </div>
    )
}



export default FetchApi