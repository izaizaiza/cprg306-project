/**
 * This is the main page of the application.
 */

"use client"

import { Row, Col, Button } from 'react-bootstrap';

import Headline from './features/headline';

import SearchBar from './features/search-bar';

import { imgURLCAM } from "./api/api-cam";
import { imgURLHAM, getArtistName } from './api/api-ham';
import ArtPiece from './features/art-piece';

import Filter from './features/filter';
import { useArtContext } from './features/art-context';

export default function Page() {

    const {
        query,
        mergedResults,
        handleSearch,
        handleSubmit,
        handleSortChange,
        handleFilterChange,
        collection,
    } = useArtContext();

    console.log('collection at app/page: ',collection);

    return(
        <div>
            <Headline />

            <SearchBar
            query={query}
            handleSearch={handleSearch}
            handleSubmit={handleSubmit}/>

            <Filter 
            handleFilterChange={handleFilterChange} 
            handleSortChange={handleSortChange}/>


            <Row className='auto-rows-auto'>
                {mergedResults.map((art) => (
                    <Col key={art.id} xs={12} sm={6} md={4} lang={3}>
                        {art.source == 'CAM' && (
                            <ArtPiece
                                source = {art.source}
                                key={art.id}
                                artID={art.id}
                                imgURL={imgURLCAM(art.image_id)}
                                altText={art.thumbnail?.alt_text}
                                title={art.title}
                                artist={art.artist_title}
                                showAddButton={true} // show the Add to Collection button
                            />    
                        )}

                        {art.source == 'HAM' && (
                            
                            <ArtPiece
                                source = {art.source}
                                key={art.id}
                                artID={art.id}
                                imgURL={imgURLHAM(art.primaryimageurl)}
                                altText={art.title}
                                title={art.title}
                                artist={getArtistName(art)}
                                showAddButton={true} // show the Add to Collection button
                            />
                        )}
                    </Col>
                ))}     
            </Row>
        </div> 
    )
}