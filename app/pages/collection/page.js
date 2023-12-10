
/**
 * holds collection of art pieces to be rendered in collection page
 */
"use client"


import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import ArtPiece from '../../features/art-piece';
import { useArtContext } from '../../features/art-context';

export default function Page(){
    const { collection } = useArtContext();
    console.log('collection at collection/page: ',collection);


    return (
        <Container>
            <h2 className='text-center text-4xl font-bold m-20'>Collections</h2>
            <Row className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {collection.map((art) => (
                    <Col 
                    key={art.artID}
                    className='mb-10'>
                        {/* Use ArtPiece without Add to Collection button */}
                        <ArtPiece
                            source={art.source}
                            artID={art.artID}
                            imgURL={art.imgURL}
                            altText={art.altText}
                            title={art.title}
                            artist={art.artist}
                            showAddButton={false}
                            showRemoveButton={true}
                        />

                    </Col>

                    

                ))}
            </Row>
        </Container>
        
    );
};

