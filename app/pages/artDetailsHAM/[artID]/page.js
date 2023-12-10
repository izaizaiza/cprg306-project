

//path: app/artdetailsHAM/%5BartID%5D/page.js
/**
 * Art Details page for art pieces from the Chicago Art Museum
 */
"use client"
//import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getArtDetailsHAM, getArtistName, imgURLHAM } from '../../../api/api-ham';



export default function ArtDetails({ params }) {
    // console
    
    console.log('artID:', params.artID);
    const [artDetails, setArtDetails] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            // Fetch art details based on artID from the API
            const data = await getArtDetailsHAM(params.artID);
            console.log('data.records:', data.records);
            setArtDetails(data.records[0]);
        };

        fetchData();
    }, [params.artID]);

    console.log('art details:', artDetails);
    console.log('art url:', artDetails.url);
        
    // Render the art details using the fetched data
    return (
        <div className='flex-col p-20 mx-auto items-center align-middle my-auto'>
            
            <h1
            className=' p-10 text-3xl items-center align-middle text-center'>
                {artDetails.title}
            </h1>

            <img
            className='w-full h-fit'
            src={imgURLHAM(artDetails.primaryimageurl)} 
            alt={artDetails.title} />
            <section
            className='flex-col pt-10 text-center space-y-2'>
                <p>Artist: {getArtistName(artDetails)}</p>
                <p>Artwork type: {artDetails.classification ? artDetails.classification : artDetails.division}</p>
                <p>Medium: {artDetails.medium ? artDetails.medium : artDetails.technique}</p>
                <a
                href={artDetails.url}
                target = '_blank'>
                    <p className='text-custom-pink hover:text-custom-pearl'>
                        Learn more
                    </p>
                    
                </a>
            </section>
            
            {/* Render other details as needed */}
        </div>
    );
}