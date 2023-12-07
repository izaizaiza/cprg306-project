

"use client"

import { useState, useEffect} from 'react';
import { Row, Col } from 'react-bootstrap';

import Headline from './features/headline';

import SearchBar from './features/search-bar';

import { searchDataCAM, imgURLCAM } from "./api/api-cam";
import { searchDataHAM, imgURLHAM, getArtistName } from './api/api-ham';
import ArtPiece from './features/art-piece';

import Filter from './features/filter';
import { set } from 'lodash';





export default function LandingPage() {

    
    const [query, setQuery] = useState(""); // state variable to store the search query
    
    const [camResults, setCamResults] = useState([]); // state variable to store the search results from Chicago Art Museum
    const [hamResults, setHamResults] = useState([]); // state variable to store the search results from Harvard Art Museum
    const [mergedResults, setMergedResults] = useState([]); // state variable to store the search results from both museums
    
    //const [results, setResults] = useState([]); // state variable to store the search results
    
    const [loading, setLoading] = useState(false); // state variable to store the loading status
    
    const [error, setError] = useState(null); // state variable to store the error

    // state variable to store the filter status
    const [showChicago, setShowChicago] = useState(true); // default to true
    const [showHarvard, setShowHarvard] = useState(false);

    // state variable to store the sort status
    const [sortOption, setSortOption] = useState('default'); // default to empty string


    // function to handle the search change
    const handleSearch = (e) => {
        setQuery(e.target.value);
    }

    // function to handle the search submission
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    // function to handle the filter change
    const handleFilterChange = (filter, checked) => {
        if(filter === 'chicago'){
            setShowChicago(checked);
        }
        if(filter === 'harvard'){
            setShowHarvard(checked);
        }
    }

    // function to handle the sort change
    const handleSortChange = (sort) => {
        setSortOption(sort);
    }
    

    // function run every time the query changes and the filter changes
    useEffect(() => {
        if (!(query || query.length)) {
          setCamResults([]);
          setHamResults([]);
          setLoading(false);
          return; // exit the function
        }
        if (query.length < 3) {
          return; // exit the function
        }
      
        // searching...
        setLoading(true);
      
        Promise.all([
          // Fetch data from Chicago if the checkbox is checked
          showChicago ? searchDataCAM(query, ['id', 'title', 'artist_title', 'image_id', 'web_url']) : null,
          // Fetch data from Harvard if the checkbox is checked
          showHarvard ? searchDataHAM(query) : null,
        ])
          .then(([camData, hamData]) => {
            const camResults = camData && camData.data ? camData.data.map((art) => ({...art, source:'CAM'})) : [];
            const hamResults = hamData && hamData.records ? hamData.records.map((art) => ({...art, source:'HAM'})) : [];
            // set the results from both museums
            const allResults = [...camResults, ...hamResults];

            // sorting results based on selected option
            setCamResults(sortResults(camResults, sortOption));
            setHamResults(sortResults(hamResults, sortOption));
            setMergedResults(sortResults(allResults, sortOption));
          })
          .catch((error) => {
            setError(error);
          })
          .finally(() => {
            setLoading(false);
          });

        
        
      }, [query, showChicago, showHarvard, sortOption]);
    
    // function to sort results based on selected option
    const sortResults = (results, sortOption) => {
        if(sortOption === 'title'){
            return results.sort((a, b) => a.title.localeCompare(b.title));
        }
        else if(sortOption === 'artist'){
            return results.sort((a, b) => {
                // recall that the artist_title field is only available for Chicago Art Museum
                // and for Harvard Art Museum, we need to extract the artist name from the people field 
                // using the getArtistName function
                const artistA = a.artist_title || getArtistName(a);
                const artistB = b.artist_title || getArtistName(b);
                return artistA.localeCompare(artistB);
            });
        }
        else{
            return results; // return the results as is
        }
    }

    return(
        <div>
            <Headline />

            <SearchBar
            query={query}
            handleSearch={handleSearch}
            handleSubmit={handleSubmit}/>

            <Filter 
            handleFilterChange={handleFilterChange} 
            handleSortChange={handleSortChange}/>


            <Row className='auto-rows-auto'>
                <h2>From both</h2>
                    
                {mergedResults.map((art) => (
                    <Col key={art.id} xs={12} sm={6} md={4} lang={3}>
                        {art.source == 'CAM' && (
                            <ArtPiece
                                source = {art.source}
                                key={art.id}
                                artID={art.id}
                                imgURL={imgURLCAM(art.image_id)}
                                altText={art.thumbnail?.alt_text}
                                title={art.title}
                                artist={art.artist_title}
                                siteURL={art.url}
                            />    
                        )}
                        {art.source == 'HAM' && (
                            <ArtPiece
                                source = {art.source}
                                key={art.id}
                                artID={art.id}
                                imgURL={imgURLHAM(art.primaryimageurl)}
                                altText={art.title}
                                title={art.title}
                                artist={getArtistName(art)}
                                siteURL={art.url}
                            />
                        )}
                    </Col>
                ))}     
            </Row>



            
        </div>
    )
}