

"use client"

import { useState, useEffect, use } from 'react';
import SearchBar from './features/search-bar';

import { searchDataCAM } from "./api/api-cam";
import { searchDataHAM } from './api/api-ham';

import {imgURLCAM} from './api/api-cam';
import { imgURLHAM } from './api/api-ham';



export default function LandingPage() {

    
    const [query, setQuery] = useState(""); // state variable to store the search query
    
    const [camResults, setCamResults] = useState([]); // state variable to store the search results from Chicago Art Museum
    const [hamResults, setHamResults] = useState([]); // state variable to store the search results from Harvard Art Museum
    
    //const [results, setResults] = useState([]); // state variable to store the search results
    
    const [loading, setLoading] = useState(false); // state variable to store the loading status
    
    const [error, setError] = useState(null); // state variable to store the error

    // function to handle the search change
    const handleSearch = (e) => {
        setQuery(e.target.value);
    }

    // function to handle the search submission
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    

    // function run every time the query changes
    useEffect(() => {
        if(!(query || query.length)){
            setCamResults([]);
            setHamResults([]);
            //setResults([]);
            return; //exit the function
        }
        if(query.length < 3){
            return; //exit the function
        }

        // searching...
        setLoading(true);
        searchDataCAM(query,['id', 'title', 'artist_title', 'image_id'])
            .then((data) => {
                if(data && data.data){
                    setCamResults([...data.data]);
                }
            })
            .catch((error) => {
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });
        
        searchDataHAM(query)
            .then((data) => {
                if(data && data.records){
                    setHamResults([...data.records]);
                    
                }
            })
            .catch((error) => {
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });
        
        // combine the results from both museums
        //setResults([...camResults, ...hamResults]);


    }, [query]);


    // another 

    // add results from harvard art museum api
    // turn results into a list? then add from there?

    

    return(
        <div>

            <SearchBar
            query={query}
            handleSearch={handleSearch}
            handleSubmit={handleSubmit}
            />
            <div>
                <h2>Chicago Art Museum</h2>
                <ul>
                {camResults.map((art) => (
                    <li key={art.id}>
                        <h3>{art.title}</h3>
                        <img src={imgURLCAM(art.image_id,400)} alt={art.title} />
                    </li>
                ))}
                </ul>                
            </div>

            <div>
                <h2>Harvard Art Museum</h2>
                <ul>
                {hamResults.map((art) => (
                    <li key={art.id}>
                        <h3>{art.title}</h3>
                        <img src={art.primaryimageurl} alt={art.title} />
                    </li>
                    
                ))}
                </ul>
            </div>
            
        </div>
    )
}