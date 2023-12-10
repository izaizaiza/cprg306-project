
// ArtContext.js

"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { searchDataCAM } from "../api/api-cam";
import { searchDataHAM } from '../api/api-ham';

const ArtContext = createContext();

export const useArtContext = () => {
  const context = useContext(ArtContext);
  if (!context) {
    throw new Error('useArtContext must be used within an ArtProvider');
  }
  return context;
};

export const ArtProvider = ({ children }) => {
    const [query, setQuery] = useState('');  // state variable to store the search query
    const [camResults, setCamResults] = useState([]); // state variable to store the search results from Chicago Art Museum
    const [hamResults, setHamResults] = useState([]); // state variable to store the search results from Harvard Art Museum
    const [mergedResults, setMergedResults] = useState([]); // state variable to store the search results from both museums
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // state variable to store the filter status
    const [showChicago, setShowChicago] = useState(true); // default to true
    const [showHarvard, setShowHarvard] = useState(false);
    // state variable to store the sort status
    const [sortOption, setSortOption] = useState('default'); // default to empty string
    
    const [collection, setCollection] = useState([]); // default to empty array
    
    const addToCollection = (artPiece) => {
        setCollection((prevCollection) => [...prevCollection, artPiece]);
        console.log(collection);
    }

    const removeFromCollection = (artID) => {
        console.log('remove from collection:', artID);
        setCollection((prevCollection) => 
        prevCollection.filter((artPiece) => artPiece.artID !== artID));
    };

    const handleSearch = (e) => {
        setQuery(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Trigger fetching logic here
    };

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

    useEffect(() => {
        if (!query || query.length < 3) {
        setCamResults([]);
        setHamResults([]);
        setLoading(false);
        return;
        }
        setLoading(true);

        Promise.all([
            // Fetch data from Chicago if the checkbox is checked
            showChicago ? searchDataCAM(query) : null,
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

    const contextValue = {
        query,
        mergedResults,
        loading,
        error,
        sortOption,
        showChicago,
        showHarvard,
        collection,
        addToCollection,
        removeFromCollection,
        handleSearch,
        handleSubmit,
        handleSortChange,
        handleFilterChange,
    };

    return <ArtContext.Provider value={contextValue}>{children}</ArtContext.Provider>;
};
