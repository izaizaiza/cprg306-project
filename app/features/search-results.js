

"use client"
import React from 'react';
import {Row, Col, Card, Spinner} from 'react-bootstrap';
import {imgURL} from './api-connect';

/**
 * search results component that displays the search results
 */
export default function SearchResults({ results, loading }) {
  console.log(results);
  // if the results are loading, display a spinner
  if (loading) {
    return (
      <Row>
        <Spinner animation="border" role="status" className='mx-auto'>
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Row>
    );
  }

  // if there are no results, display a message
  if (results === null) {
    return (
      <Row>
        <Col>
          <p className="text-center">No results found.</p>
        </Col>
      </Row>
    );
  }


  // if there are results, display them
  return (
    <Row>
      {results.map((art) => (
        <Col key={art.id} xs={12} sm={6} md={4} lg={3}>
          <Card className="mb-4">
            <Card.Img variant="top" src={imgURL(art.image_id)} alt={art.thumbnail?.alt_text} />
            <Card.Body>
              <Card.Title>{art.title}</Card.Title>
              <Card.Text>{art.artist_title}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}




