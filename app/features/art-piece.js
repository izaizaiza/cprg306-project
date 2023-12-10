

import React from 'react';
import {Col, Card} from 'react-bootstrap';
import Link from 'next/link';
import AddToCollectionButton from './add-to-collection';

export default function ArtPiece({source, artID, imgURL, altText, title, artist, setCollection, showAddButton}) {
    let artDetailsURL= null;
    if (source == 'CAM'){
        artDetailsURL = `/artdetails/${artID}`;
    }
    else if (source == 'HAM'){
        artDetailsURL = `/artdetailsHAM/${artID}`;
    }
    else{
        artDetailsURL = null;
    }

    // event handler for adding art piece to collection
    const handleAddToCollection = () => {
        console.log('add to collection:', {source, artID, imgURL, altText, title, artist});
        // add item to collection\
        if (showAddButton){
            setCollection((prevCollection) => [
                ...prevCollection, 
                {source, artID, imgURL, altText, title, artist}]);
            alert('Added to collection!');
        }
        
    }
    
    
    return(
        <Col 
        key= {artID}
        className='w-2/3 rounded mx-auto items-center justify-between'>
            {/*Conditionally render the Add to Collection button based on showAddButton*/}
            {showAddButton &&(
                <AddToCollectionButton
                item={{ source, artID, imgURL, altText, title, artist }}
                onClick={handleAddToCollection}
                ></AddToCollectionButton>
            )}
            
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