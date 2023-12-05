

/**
 * Art Details
 */
// Path: app/artdetails/[artID].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getArtDetailsCAM } from '../../api/api-cam';

const ArtDetails = () => {
    const router = useRouter();
    const { artID } = router.query;
    const [artDetails, setArtDetails] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            // Fetch art details based on artID from the API
            const data = await getArtDetailsCAM(artID);
            setArtDetails(data);
        };

        fetchData();
    }, [artID]);

    if (!artDetails) {
        // Render loading state or return null while fetching data
        return null;
    }

    // Render the art details using the fetched data
    return (
        <div>
            <img src={artDetails.image_id} alt={artDetails.thumbnail?.alt_text} />
            <h1>{artDetails.title}</h1>
            <p>Artist: {artDetails.artist_title}</p>
            {/* Render other details as needed */}
        </div>
    );
};

export default ArtDetails;
