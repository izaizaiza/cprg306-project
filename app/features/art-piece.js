

import React from 'react';
import {Col, Card, Button} from 'react-bootstrap';
import Link from 'next/link';


import { useArtContext } from './art-context';

export default function ArtPiece({source, artID, imgURL, altText, title, artist, showAddButton}) {

   
    let artDetailsURL= null;
    if (source == 'CAM'){
        artDetailsURL = `/pages/artdetailsCAM/${artID}`;
    }
    else if (source == 'HAM'){
        artDetailsURL = `/pages/artdetailsHAM/${artID}`;
    }
    else{
        artDetailsURL = null;
    }

    const { addToCollection} = useArtContext();
    // event handler for adding art piece to collection
    const handleAddToCollection = () => {
        console.log('add to collection:', {source, artID, imgURL, altText, title, artist});
        if (showAddButton){
            addToCollection({source, artID, imgURL, altText, title, artist});
            alert('Added to collection!');
        }
        
    }
    
    
    return(
        <Col 
        key= {artID}
        className='w-2/3 rounded mx-auto items-center justify-between'>

            <Link 
            href={artDetailsURL}
            target="_blank">
                <Card className="m-3">
                    <Card.Img variant="top" src={imgURL} alt={altText} className="mx-auto rounded-lg border-4 border-custom-pearl hover:border-custom-pink"/>
                    <Card.Body className="pt-5 pb-10 text-center">
                        <Card.Title className='text-2xl'>{title}</Card.Title>
                        <Card.Text className='text-lg'>{artist}</Card.Text>
                    </Card.Body>
                </Card>
            </Link>
            
            {/*Conditionally render the Add to Collection button based on showAddButton*/}
            {showAddButton &&(
                <Button 
                variant="primary" 
                className="bg-custom-pearl text-custom-neon-blue font-bold py-2 px-4 rounded hover:text-custom-pearl hover:bg-custom-pink" 
                onClick={handleAddToCollection}>
                    Add to Collection
                </Button>

            )}

        </Col>
    )
}


/**
 * <Col key={art.id} xs={12} md={4}>
                                <Card className="mb-4">
                                    <Card.Img variant="top" src={imgURLCAM(art.image_id)} alt={art.thumbnail?.alt_text} />
                                    <Card.Body>
                                        <Card.Title>{art.title}</Card.Title>
                                        <Card.Text>{art.artist_title}</Card.Text>
                                    </Card.Body>
                                </Card>
                        </Col>
 */


/**
 * <Col key={art.id} xs={12} sm={6} md={4} lg={3}>
                        <Card className="mb-4">
                            <Card.Img variant="top" src={imgURLHAM(art.primaryimageurl)} alt={`${art.title}`} />
                            <Card.Body>
                                <Card.Title>{art.title}</Card.Title>
                                <Card.Text>{getArtistName(art)}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
 */