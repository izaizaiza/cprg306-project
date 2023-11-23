

import { throttle } from 'lodash';


// Throttle function to limit the number of API calls
// https://lodash.com/docs/4.17.15#throttle
const json = throttle(async (endpoint) => {
    //api url
    const url = `https://api.artic.edu/api/v1/${endpoint}`;
    console.log('api request url:', url);

    try{
        //fetch data from api
        const response = await fetch(url);
        if(!response.ok){
            throw new Error(`Fetch error. Error loading ${endpoint} ($(response.status})`);
        }
        //convert response to json
        const data = response.json();
        return data;

    } catch(error){
        console.error('API request error: ', error);
        throw error;
    }
}, 1000); //limit to 1 call per second

/**
 * 
 * @param {*} query 
 * @param  {...any} fields 
 */
//function to search for art pieces
export const searchData = async (query, ...fields) => {
    let endpoint = `artworks/search?q=${query}`;
    //let endpoint2 = `/artworks/129884`;
    if(fields.length){
        endpoint += `&fields=${fields.join(',')}`; //join the fields with a comma
    }
    //call the throttle function
    const response = json(endpoint);
    return response;
}


/**
 * 
 * @param {*} id 
 * @param {*} width 
 * @returns 
 */
//function to get the image of the art piece
export const imgURL = (id, width=250) =>
`https://www.artic.edu/iiif/2/${id}/full/${width},/0/default.jpg`;







