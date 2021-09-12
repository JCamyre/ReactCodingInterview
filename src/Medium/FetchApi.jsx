import React, { useState, useEffect } from 'react';
import axios from 'axios';

// https://randomuser.me/api/?results=20
// Data structure is one dictionary (key 'results') that has a value of a list of dictionaries
function fetchData() { // could do const fetchData = () => {}
    return axios.get('https://randomuser.me/api/?results=20')
    .then((res) => {
        // console.log(results['data']['results'], typeof results['data']['results']);
        const {results} = res.data; // Cool way of getting {results} = res.data.results. Ig {} gets the column results and sets it equal to {results} ?
        // Yes cause if you do const {data} = res; you have a dictionary with a key 'results'. 
        console.log(results);
        return results; // results.data.results
    }).catch((err) => {
        console.error(err);
    });
}

function FetchApi() {
    const [userLocations, setUserLocations] = useState([]);

    // on page load: run fetchData()
    // .then() => {} takes care of the promisers, listeners, async/await, all that crud (create, read, update, delete). LOLL!
    useEffect(() => {
        fetchData()
        .then((apiUsers) => {
            for (let i=0; i < apiUsers.length; i++){
                let location = apiUsers[i]['location'];
                // Could do some fancy dictionary variable setting or smth
                // maybe const {longitude, latitude}
                let {longitude, latitude} = location['coordinates'];
                let {number, name} = location.street;
                let {description, offset} = location['timezone']
                // could do a dictionary instead of list. {'city': location.city, etc.}
                location = {'city': location.city, 'longitude': longitude, 'latitude': latitude, 
                'country': location.country, 'postcode': location['postcode'], 'state': location.state, 'number': number, 
                'name': name, 'description': description, 'offset': offset};
                apiUsers[i] = location;
            }

            console.log(apiUsers);
            setUserLocations(apiUsers);
        })
    }, []);


    // Simplest way to make table without modules is to just use <table>, <td>, <tr>, etc.
    // All columns for location: city, coords, country, postcode, street, timezone (everything flattened). Rows are each user, columns are each feature
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        {userLocations[0].map((feature, idx) => (
                            <td index={idx}>
                                {feature}
                            </td>
                        ))}
                    </tr>
                </thead>
                <tbody>
                        {userLocations.map((location, idx) => (
                            <tr key={idx}>
                                <td>{location['longitude']}</td>
                            </tr>
                        ))}
                </tbody>

            </table>
        </div>
    )
}

export default FetchApi