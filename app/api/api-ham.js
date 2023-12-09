/**
 * This handles the connection to Harvard Art Museum's API
 */



import { throttle } from 'lodash';



// Throttle function to limit the number of API calls
const json = throttle(async (endpoint) => {
  const apiKey = process.env.NEXT_PUBLIC_HAM_API_KEY;
  const url = `https://api.harvardartmuseums.org/${endpoint}&apikey=${apiKey}`;
  console.log('api request url:', url);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Fetch error. Error loading ${endpoint} (${response.status})`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Harvard Art Museum API request error: ', error);
    throw error;
  }
}, 1000); // Limit to 1 call per second

export const searchDataHAM = async (query) => {
  let endpoint = `object?q=${query}`;
  const response = json(endpoint);
  console.log(response);
  //console.log(response.records);
  return response;
}


// function to get the image of the art piece
/**
 * 
 * @param {*} id 
 * @param {*} width 
 * @returns 
 */
//function to get the image of the art piece
export const imgURLHAM = (url) => {
    return `${url}/?width=350`;
}



// helper function to get the artist's name
export const getArtistName = (art) => {
  if (art.people && art.people.length > 0) {
    return art.people[0].name;
  }
  return 'Unknown artist';
}


// function to get details of the art piece from Harvard by id
export const getArtDetailsHAM = async (id) => {
  try{
    const response = await json(`object?q=${id}`);
    console.log(response);
    return response;
  }
  catch(error){
    console.error('Harvard Art Museum API request error: ', error);
    throw error;
  }
}
