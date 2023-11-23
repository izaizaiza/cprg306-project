

"use client"

import { useState, useEffect, use } from 'react';
import SearchBar from './features/search-bar';
import SearchResults from "./features/search-results"
import { searchData } from "./features/api-connect"


export default function LandingPage() {

    
    const [query, setQuery] = useState(""); // state variable to store the search query
    
    const [results, setResults] = useState([]); // state variable to store the search results
    
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
            setResults(null);
            return; //exit the function
        }
        if(query.length < 3){
            return; //exit the function
        }

        // searching...
        setLoading(true);
        searchData(query,['id', 'title', 'artist_title', 'image_id'])
            .then((data) => {
                if(data && data.data){
                    setResults([...data.data]);
                }
            })
            .catch((error) => {
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [query])

    // add results from harvard art museum api
    // turn results into a list? then add from there?

    

    return(
        <div>

            <SearchBar
            query={query}
            handleSearch={handleSearch}
            handleSubmit={handleSubmit}
            />
            <SearchResults results={results} loading={loading}/>
            
        </div>
    )
}