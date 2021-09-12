import React, { useState, useEffect } from 'react';
import axios from 'axios';

// https://randomuser.me/api/?results=20
// Data structure is one dictionary (key 'results') that has a value of a list of dictionaries
function fetchData() { // could do const fetchData = () => {}
    return axios.get('https://randomuser.me/api/?results=20')
    .then((res) => {
        const {results} = res.data; // Cool way of getting {results} = res.data.results. Ig {} gets the column results and sets it equal to {results} ?
        // Yes cause if you do const {data} = res; you have a dictionary with a key 'results'. 
        return results; // results.data.results
    }).catch((err) => {
        console.error(err);
    });
}

function FetchApi() {
    const [userLocations, setUserLocations] = useState([]);
    // Back to scuffed because it broke for some reason
    const [columnHeaders, setColumnHeaders] = useState([]);

    // on page load: run fetchData()
    // .then() => {} takes care of the promisers, listeners, async/await, all that crud (create, read, update, delete). LOLL!
    // not caring about users, setUsers any more.
    useEffect(() => {
        fetchData()
        .then((apiUsers) => {
            // BRuh I am so stupid, why would I use for loop when I could just use .map(). L. .map() everything. enumerate()
            // Could modularize and make this it's own function
            apiUsers.forEach((user, i) => {
                let location = user['location'];
                // Could do some fancy dictionary variable setting or smth
                // Could probably do this in one line somehow
                let {longitude, latitude} = location['coordinates'];
                let {number, name} = location.street;
                let {description, offset} = location['timezone']
                // could do a dictionary instead of list. {'city': location.city, etc.}
                // Could do dynamically (add as function) (not manually where you specify every key you want, cause what if more columns that you want but didn't account for manually)
                // Doing manual is fine since you know the keys for the api
                location = {'city': location.city, 'longitude': longitude, 'latitude': latitude, 
                'country': location.country, 'postcode': location['postcode'], 'state': location.state, 'number': number, 
                'name': name, 'description': description, 'offset': offset};
                apiUsers[i] = location;
            })
            setColumnHeaders(Object.keys(apiUsers[0]));
            setUserLocations(apiUsers);
        })
    }, []);


    // Simplest way to make table without modules is to just use <table>, <td>, <tr>, etc.
    // All columns for location: city, coords, country, postcode, street, timezone (everything flattened). Rows are each user, columns are each feature
    return (
        <div>
            <table>
                <thead style={{fontSize: '24px', fontWeight: 'bold'}}>
                    <tr>
                    {/* Object.keys(columnHeaders[0]) */}
                        {columnHeaders.map((column, columnIdx) => (
                                <td index={columnIdx}>
                                    {column}
                                </td>
                            ))}
                    </tr>
                </thead>
                <tbody>
                        {/* I did this so badly lol. Redoing. */}
                        {userLocations.map((location, idx) => (
                            <tr key={idx}>
                                {columnHeaders.map((column, idx) => (
                                    <td key={idx}>{location[column]}</td>
                                ))}
                            </tr>
                        ))}
                </tbody>

            </table>
        </div>
    )
}

export default FetchApi