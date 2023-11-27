
import {Col, Card} from 'react-bootstrap';
export default function ArtPiece({artID,imgURL, altText, title, artist}) {
    return(
        <Col key= {artID} xs={12} md={4}>
                                <Card className="mb-4">
                                    <Card.Img variant="top" src={imgURL} alt={altText} />
                                    <Card.Body>
                                        <Card.Title>{title}</Card.Title>
                                        <Card.Text>{artist}</Card.Text>
                                    </Card.Body>
                                </Card>
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