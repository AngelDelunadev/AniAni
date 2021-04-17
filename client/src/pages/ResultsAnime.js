import React, { useEffect, useState } from 'react'
import { Button, Card, CardGroup, Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router'
import { Link } from 'react-router-dom';

export default function ResultsAnime() {
    const { title } = useParams()
    const [results, setResults] = useState([])

    useEffect(() => {
        fetchResults()
        //eslint-disable-next-line
    }, [title]);

    const fetchResults = () => {
        fetch(`/api/v1/jikan/search/anime/${title}`)
            .then((res) => res.json())
            .then((data) => {
                if (!data.error) {
                    setResults(data)
                }
                else {
                    setResults(["No Results Found"])
                }
            });
    }

    return (
        <Container>
            <Row>
                <h1 className="separator-title twice">Results for {title}</h1>
            </Row>
            <Row>
                <CardGroup>
                    {results.map(anime => {
                        return (
                            <Col className="mt-5">
                                <Card style={{ width:"18rem"}} id= "aniCard" >
                                    <Card.Img variant="top" src={anime.image_url} />
                                    <Card.Body >
                                        <Card.Title className="separator-title twice">{anime.title}</Card.Title>
                                        <Card.Text>
                                            
                                            {`Rating: ${anime.score}`}
                                            <br/>
                                            {anime.type}
                                            
                                     </Card.Text>
                                        <Link to ={`/anime/${anime.mal_id}`}>
                                        <Button  variant="outline-primary" >Details</Button>
                                        </Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })
                    }
                </CardGroup>
            </Row>
        </Container>
    )
}
