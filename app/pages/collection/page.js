
/**
 * holds collection of art pieces to be rendered in collection page
 */
"use client"


import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ArtPiece from '../../features/art-piece';
import { useArtContext } from '../../features/art-context';

export default function Page(){
    const { collection } = useArtContext();
    console.log('collection at collection/page: ',collection);

    return (
        <div>
            <h2>Collections</h2>
            <Row>
                {collection.map((art) => (
                    <Col key={art.artID} xs={12} md={4}>
                        {/* Use ArtPiece without Add to Collection button */}
                        <ArtPiece
                            source={art.source}
                            artID={art.artID}
                            imgURL={art.imgURL}
                            altText={art.altText}
                            title={art.title}
                            artist={art.artist}
                            showAddButton={false}
                        />
                    </Col>
                ))}
            </Row>
        </div>
        
    );
};

