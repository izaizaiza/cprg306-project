
// Path: app/artdetails/[artID]/page.js

/**
 * Art Details
 */
"use client"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getArtDetailsCAM, imgURLCAM } from '../../api/api-cam';

export default function ArtDetails({ params }) {
    // console
    console.log('artID:', params.artID);
    const [artDetails, setArtDetails] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            // Fetch art details based on artID from the API
            const data = await getArtDetailsCAM(params.artID);
            console.log('art details:', data);
            setArtDetails(data.data);
        };

        fetchData();
    }, [params.artID]);

    console.log('art details:', artDetails);
        
    // Render the art details using the fetched data
    return (
        <div>
            <img src={imgURLCAM(artDetails.image_id)} alt={artDetails.thumbnail?.alt_text} />
            <h1>{artDetails.title}</h1>
            <p>Artist: {artDetails.artist_title}</p>
            {/* Render other details as needed */}
        </div>
    );
}

       

