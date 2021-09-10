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
    const [users, setUsers] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    // Best to put the API getting logic (GetApi) in a separate file (like an API components folder) separate from this FetchApi.jsx file
    useEffect(() => {
        var temp = [];
        // for loop -> make a call each time, add to temp, after loop, setUsers(temp)
        for(let i=0;i<10;i++) {
            GetApi().then((result) => {
                // setData(result);
                if (result) {
                    console.log(result['data']['results'][0]['picture']['medium']);
                    // could do a dictionary. name: result['name']
                    temp.push([result['data']['results'][0]['name']['first'] + ' ' + result['data']['results'][0]['name']['last'], result['data']['results'][0]['picture']['large']]);
                }
            }); 
        }
        setUsers(temp);
        setIsLoading(false);
        // Given GetApi() returns a list of 'data', I'll just act on element

    }, []); // [data] doesn't work here since it checks the "next" value to the current value and since this api returns random data every time, always update, so we just have it empty so it will only load once (on page load). 


    return (
        <div>
            {!isLoading && users.map((user) => {
                console.log(user[0]);
                // <div>
                //     <h3>{user[0]}</h3>
                //     <img alt='profile pic' src={user[1]} />
                // </div>
            })}
            {!isLoading && (
                <>
                    {users.map((user) => (
                    <div>
                        <h3>{user[0]}</h3>
                        <img alt='profile pic' src={user[1]} />
                    </div>
                    ))}
                </>
            )}

        </div>
    )
}



export default FetchApi