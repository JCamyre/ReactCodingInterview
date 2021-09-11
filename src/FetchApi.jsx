import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Make a call and display contents from https://randomuser.me/api
// Might need to do response.data


// never used the interface keyword before. I think it is typescript only

function GetApi(page){
    //?page=2, page=3, ...
    // You return the get function, and then inside the function you return the JSON. Don't forget for axios two returns. 
    return axios.get(`https://randomuser.me/api?page=${page}`)
    .then((response) => {
        if(response){
            // console.log(JSON.stringify(response));
            // return JSON.stringify(response, null, 2); // idk what null, 2 does.
            return response;
        }
    })
    .catch((err) => {
        console.error('There has been an error');
    });
// Don't use useEffect if you are using a separate function for getting API?
// Huge brain move: use the useEffect when you are calling this function in the main component (FetchApi). 
}

// Display username and profile pic
// Could split up into more files, but it find
function FetchApi() {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);
    const [test, setTest] = useState([])

    // Best to put the API getting logic (GetApi) in a separate file (like an API components folder) separate from this FetchApi.jsx file
    useEffect(() => {
        GetApi(page)
        .then((result) => {
            // users.push(result);
            setUsers([result['data']['results']]);
        })

    }, []); // [data] doesn't work here since it checks the "next" value to the current value and since this api returns random data every time, always update, so we just have it empty so it will only load once (on page load). 

    console.log(users);

    const getFullUserName = (user) => {
        // This is some cool code: Set the variables first, last equal to user['name'], thanks to the {name: }. 
        // This might be typescript lol: const {name: {first, last}} = user;
        const [first, last] = user['name'];
        return `${first} ${last}`;
    };

    const loadNextUser = (pagenum, users) => {
        users.push(GetApi(pagenum));
        setUsers(users);
        setPage(pagenum + 1);
    };

    return (
        <div>

            {
                users.map((element, index) => (
                    <h2>{element}</h2>
                ))
            }

            {/* {
                users.map((user, index) => (
                    <div key={index}>
                        <h3>{getFullUserName(user)}</h3>
                        <h1>{user['name']}</h1>
                    </div>
                ))
            } */}
            <button onClick={() => {
                loadNextUser(page, users);
            }}>
                Load next user
            </button>

        </div>
    )
}



export default FetchApi