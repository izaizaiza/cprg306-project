
// Path: app/artdetails/[artID]/page.js

/**
 * Art Details page for art pieces from the Chicago Art Museum
 */
"use client"

import { useEffect, useState } from 'react';
import { imgURLCAM } from '../../api/api-cam';
import { getArtDetailsCAM } from '../../api/api-cam';



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
    
    
    // get artdetails from camResults by the artID


    console.log('art details:', artDetails);
        
    // Render the art details using the fetched data
    return (
        <div className='flex-col p-20 mx-auto items-center align-middle my-auto'>
            
            <h1
            className=' p-10 text-3xl items-center align-middle text-center'>
                {artDetails.title}
            </h1>

            <Image 
            className='w-full h-fit'
            src={imgURLCAM(artDetails.image_id)} 
            alt={artDetails.thumbnail?.alt_text} />
            <section
            className='flex-col pt-10 text-center space-y-2'>
                <p>Artist: {artDetails.artist_title}</p>
                <p>Artwork type: {artDetails.artwork_type_title}</p>
                <p>Medium: {artDetails.medium_display}</p>
            </section>
            {/* Render other details as needed */}
        </div>
    );
}

       

