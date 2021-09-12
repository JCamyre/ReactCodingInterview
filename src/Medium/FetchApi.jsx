import React, { useState, useEffect } from 'react';
import axios from 'axios';

// https://randomuser.me/api/?results=20
// Data structure is one dictionary (key 'results') that has a value of a list of dictionaries
function fetchData() { // could do const fetchData = () => {}
    return axios.get('https://randomuser.me/api/?results=20')
    .then((res) => {
        // console.log(results['data']['results'], typeof results['data']['results']);
        const {results} = res.data; // Cool way of getting {results} = res.data.results. Ig {} gets the column results and sets it equal to {results} ?
        console.log(results);
        return results; // results.data.results
    }).catch((err) => {
        console.error(err);
    });
}

function FetchApi() {
    const [users, setUsers] = useState([]);

    // on page load: run fetchData()
    // .then() => {} takes care of the promisers, listeners, async/await, all that crud (create, read, update, delete). LOLL!
    useEffect(() => {
        fetchData()
        .then((apiUsers) => {
            console.log(apiUsers);
            setUsers(apiUsers);
        })
    }, []);


    // Simplest way to make table without modules is to just use <table>, <td>, <tr>, etc.
    // All columns for location: city, coords, country, postcode, street, timezone (everything flattened). Rows are each user, columns are each feature
    return (
        <div>
            {users.map((user, index) => (
                <div key={index}>
                    {user.name.first}
                </div>
            ))}
        </div>
    )
}

export default FetchApi