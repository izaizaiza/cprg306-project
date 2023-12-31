import { throttle } from 'lodash';


// Throttle function to limit the number of API calls
// https://lodash.com/docs/4.17.15#throttle
const chicago_json = throttle(async (endpoint) => {
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
        console.error('Chicago Art Museum API request error: ', error);
        throw error;
    }
}, 1000); //limit to 1 call per second



/**
 * 
 * @param {*} query 
 * @param  {...any} fields
 * @returns the json data from the api
 */
//function to search for art pieces in Chicago Art Museum
const fields = ['id', 'title', 'artist_title', 'image_id', 'web_url'];
export const searchDataCAM = async (query) => {
    let endpoint = `artworks/search?q=${query}&fields=${fields.join(',')}`;

    //let endpoint2 = `/artworks/129884`;
    //if(fields.length){
    //    endpoint += `&fields=${fields.join(',')}`; //join the fields with a comma
    //}
    
    //call the throttle function
    const response = chicago_json(endpoint);
    return response;
}


/**
 * 
 * @param {*} id 
 * @param {*} width 
 * @returns 
 */
//function to get the image of the art piece
export const imgURLCAM = (id) =>
`https://www.artic.edu/iiif/2/${id}/full/350,/0/default.jpg`; //the 400 is width




// function to get art details by id from Chicago Art Museum
export const getArtDetailsCAM = async (id) => {
    //api url
    const url = `https://api.artic.edu/api/v1/artworks/${id}`;
    console.log('api request url:', url);

    try{
        //fetch data from api
        const response = await fetch(url);
        if(!response.ok){
            throw new Error(`Fetch error. Error loading ${id} ($(response.status})`);
        }
        //convert response to json
        const data = response.json();
        console.log('art details:', data);
        return data;

    } catch(error){
        console.error('Chicago Art Museum API request error: ', error);
        throw error;
    }
}