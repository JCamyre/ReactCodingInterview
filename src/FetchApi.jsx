import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Make a call and display contents from https://randomuser.me/api
// Might need to do response.data


// never used the interface keyword before. I think it is typescript only

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
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Best to put the API getting logic (GetApi) in a separate file (like an API components folder) separate from this FetchApi.jsx file
    useEffect(() => {
        var temp = [];
        // for loop -> make a call each time, add to temp, after loop, setUsers(temp)
        for(let i=0;i<10;i++) {
            GetApi().then((result) => {
                // setData(result);
                if (result) {
                    // could do a dictionary. name: result['name']
                    console.log(result.results);
                    temp.push([result['data']['results'][0]['name']['first'] + ' ' + result['data']['results'][0]['name']['last'], result['data']['results'][0]['picture']['large']]);
                }
            }); 
        }
        setUsers(temp);
        setIsLoading(false);
        // Given GetApi() returns a list of 'data', I'll just act on element

    }, []); // [data] doesn't work here since it checks the "next" value to the current value and since this api returns random data every time, always update, so we just have it empty so it will only load once (on page load). 

    console.log(isLoading, users[0]);
    const getFullUserName = (user) => {
        // This is some cool code: Set the variables first, last equal to user['name'], thanks to the {name: }. 
        // This might be typescript lol: const {name: {first, last}} = user;
        const [first, last] = user['name'];
        return `${first} ${last}`;
    }

    return (
        <div>
            {['a', 'b', 'c'].map((element) => (
                <h2>{element}</h2>
            ))}
            {users.map((user, index) => (
                <div key={index}>
                    <h3>{getFullUserName(user)}</h3>
                    <h1>yo</h1>
                </div>
            ))}

        </div>
    )
}



export default FetchApi