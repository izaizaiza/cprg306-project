

"use client"

import { useState, useEffect, use} from 'react';
import { Row, Col } from 'react-bootstrap';

import SearchBar from './features/search-bar';

import { searchDataCAM, imgURLCAM } from "./api/api-cam";
import { searchDataHAM, imgURLHAM, getArtistName } from './api/api-ham';
import ArtPiece from './features/art-piece';

import Filter from './features/filter';





export default function LandingPage() {

    
    const [query, setQuery] = useState(""); // state variable to store the search query
    
    const [camResults, setCamResults] = useState([]); // state variable to store the search results from Chicago Art Museum
    const [hamResults, setHamResults] = useState([]); // state variable to store the search results from Harvard Art Museum
    
    //const [results, setResults] = useState([]); // state variable to store the search results
    
    const [loading, setLoading] = useState(false); // state variable to store the loading status
    
    const [error, setError] = useState(null); // state variable to store the error

    // state variable to store the filter status
    const [showChicago, setShowChicago] = useState(false);
    const [showHarvard, setShowHarvard] = useState(false);


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
    

    // function run every time the query changes and the filter changes
    useEffect(() => {
        if(!(query || query.length)){
            setCamResults([]);
            setHamResults([]);
            return; //exit the function
        }
        if(query.length < 3){
            return; //exit the function
        }

        // searching...
        setLoading(true);

        // get results
        if (showChicago && !showHarvard){
            searchDataCAM(query,['id', 'title', 'artist_title', 'image_id', 'web_url'])
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
        }
        
        if (showHarvard && !showChicago){
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
        }

        if (!showChicago && !showHarvard){
            setLoading(false);
        }
    }, [query, showChicago, showHarvard]); //end of useEffect

    // another useEffect to run when the filter changes to check both checkboxes
    useEffect(() => {
        if (showChicago && showHarvard){
            searchDataCAM(query,['id', 'title', 'artist_title', 'image_id', 'web_url'])
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
        }
    }, [query,showChicago, showHarvard]);


    return(
        <div>

            <SearchBar
            query={query}
            handleSearch={handleSearch}
            handleSubmit={handleSubmit}
            />
            <Filter handleFilterChange={handleFilterChange} />
            <Row className='auto-rows-auto items-center'>
                {showChicago && (
                    <Col xs={12} sm={6} md={4} lang={3}>
                        {/*<h2>Chicago Art Museum</h2>*/}
                        {camResults.map((art) => (
                            <ArtPiece
                                key={art.id}
                                artID={art.id}
                                imgURL={imgURLCAM(art.image_id)}
                                altText={art.thumbnail?.alt_text}
                                title={art.title}
                                artist={art.artist_title}
                                siteURL={art.url}
                            />
                        ))}
                    </Col>    
                )}
            </Row>

            <Row className='auto-rows-auto'>
                <Col xs={12} sm={6} md={4} lang={3}>
                    {/*<h2>Harvard Art Museum</h2>*/}
                    {hamResults.map((art) => (  
                        <ArtPiece
                            key={art.id}
                            artID={art.id}
                            imgURL={imgURLHAM(art.primaryimageurl)}
                            altText={art.title}
                            title={art.title}
                            artist={getArtistName(art)}
                            siteURL={art.url}
                        />
                    ))}
                </Col>
                
            </Row>
            
        </div>
    )
}