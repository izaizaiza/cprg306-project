
/**
 * holds collection of art pieces to be rendered in collection page
 */
"use client"

import { ArtProvider, useArtContext } from '../../features/art-context';
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ArtPiece from '../../features/art-piece';


export default function Page(){
    const { collection } = useArtContext();
    console.log(collection);

    return (
        <Container>
            <ArtProvider>
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
            </ArtProvider>
        </Container>
    );
};

