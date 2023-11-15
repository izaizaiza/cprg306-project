
"use client"
import { useState, useEffect } from "react";



export default function ArtList({ query }) {

    // state variable to hold list of art
    const [artList, setArtList] = useState([]);
    // state variable to hold loading status
    const [loading, setLoading] = useState(true);

    //function to fetch and load art pieces 
    const loadArtPieces = async () => {
        try{
            const data = await fetchArtPieces(query);
            setArtList(data);
        }
        catch (err) {
            console.error("Error loading art pieces",err);
        }
        finally {
            setLoading(false);
        }
    }

    // load art pieces when component mounts
    useEffect(() => {
        setLoading(true);
        loadArtPieces();
    }, [query]);


    // render art pieces
    return (
        <div>
            {loading && <p>Loading...</p>}
            {!loading && artList.length === 0 && <p>No art found</p>}
            {!loading && artList.length > 0 && 
                <ul>
                    {artList.map(art => (
                        <li key={art.id}>
                            <img src={art.images[0].b.url} alt={art.title} />
                            <h3>{art.title}</h3>
                            <p>{art.date}</p>
                            <p>{art.medium}</p>
                            <p>{art.description}</p>
                        </li>
                    ))}
                </ul>
            }
            
        </div>
    )
    
}



// helper to fetch art pieces from api
async function fetchArtPieces(query) {
    try {
        const encodedQuery = encodeURIComponent(query);
        const response = await fetch(
            `https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.exhibitions.getObjects&access_token=<FORAEHS_API_KEY>&query=${encodedQuery}&has_images=yes&page=1&per_page=100`);
        if(!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
        }
        else {
            const data = await response.json();
            return data.objects;
        }
    }
    catch(err) {
        console.error(err);
        return [];
    }

}