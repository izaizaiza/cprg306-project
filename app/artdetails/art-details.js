

import { Col,Row,Card } from "react-bootstrap"
import React from 'react';

export default function ArtDetails({imgURL, altText, title, artist, description, siteURL}) {
    return(
        <Row>
            <Col className='bg-custom-black-pearl
            rounded
            items-center
            justify-between'>
                <Card className="m-3">
                    <Card.Img variant="top" src={imgURL} alt={altText} className="mx-auto"/>
                    <Card.Body className="text-center">
                        <Card.Title>{title}</Card.Title>
                        <Card.Text>{artist}</Card.Text>
                        <Card.Body>
                            <Card.Text>{description}</Card.Text>
                            <Card.Body>
                                <Card.Link href="siteURL">Url</Card.Link>
                            </Card.Body>
                        </Card.Body>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
       
    )
}

