import React, { useEffect, useState } from 'react'
import { Badge, Col, Container, Jumbotron, Row, Table, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'

export default function AnimeSingle(props) {
    const { id } = useParams()
    const [anime, setAnime] = useState([])
    const [info, setInfo] = useState({
        status: "Airing",
        score: '90',
        genres: [],
        debut: "No debut date found",
    })
    const user = useSelector((state) => state.user);
    const [favorites, setFavorites] = useState([])
    const [results, setResults] = useState([])


    const fetchAnime = () => {
        fetch(`/api/v1/jikan/single/${id}`)
            .then(res => res.json())
            .then((data) => {
                setAnime(data)
                fetch(`/api/v1/favorites/${user.id}`)
                    .then(res => res.json())
                    .then(response => {
                        setFavorites(response)
                        const filter = response.filter(fav => Number(fav.malId) === data.mal_id)
                        setResults(filter)
                    })
                let infoStatus = "info"
                switch (data.status) {
                    case "Finished Airing":
                        infoStatus = "success"
                        break;
                    case "Currently Airing":
                        infoStatus = "primary"
                        break;
                    case "Not yet aired":
                        infoStatus = 'warning'
                        break;
                    default:
                        infoStatus = 'info'
                        break;
                }

                let infoScore = "info"
                if (parseInt(data.score) >= 9) {
                    infoScore = "success"
                }
                else if (parseInt(data.score) >= 7) {
                    infoScore = "primary"
                }
                else if (parseInt(data.score) >= 6) {
                    infoScore = "warning"
                }
                else if (parseInt(data.score) === 0) {
                    infoScore = "info"
                }
                else {
                    infoScore = "danger"
                }
                setInfo({
                    ...info,
                    score: infoScore,
                    status: infoStatus,
                    genres: data.genres,
                    debut: data.aired.string,
                    mal_id: data.mal_id
                })
            })

    }

    const handleClick = (e) => {
        fetch('/api/v1/favorites', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                malId: anime.mal_id,
                title: anime.title,
                imageUrl: anime.image_url,
                type: anime.type,
                aired: info.debut,
            }),
        })
    }

        const removeFavorite = () => {
            fetch(`/api/v1/favorites/${results[0].id}`, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(data => {
                    fetchAnime()
                })
        }
    



    useEffect(() => {
        fetchAnime()
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <Container className="mt-5 aniBio">
                <h1 className="twice">{anime.title}</h1>
                <hr className="line" />
                <Row>
                    <Col sm={6}>
                        <Row>
                            <Col sm={3}></Col>
                            <Col sm={6}>
                                <img src={anime.image_url} alt=""></img>
                            </Col >
                            <Col sm={12}>
                                {
                                    results.length
                                        ?
                                        (<Button className="mt-4 " size="lg" variant="outline-danger" onClick={removeFavorite}>Remove</Button>
                                        ) : (

                                            <Button className="mt-4 " size="lg" variant="outline-primary" onClick={handleClick}>Favorite  </Button>
                                        )
                                }
                            </Col>
                        </Row>
                    </Col>
                    <Col sm={6}>
                        <Jumbotron className="aniJumbo" >
                            <Table striped bordered hover className="aniTable" variant="dark">
                                <thead>
                                    <tr>
                                        <th>Information</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td > <span className="twice">Status: </span> <Badge variant={info.status}>{anime.status}</Badge> </td>
                                    </tr>
                                    <tr>
                                        <td><span className="twice">Score: </span> <Badge variant={info.score}>{anime.score}</Badge>  </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="twice">Genres: </div>
                                            <div>
                                                {
                                                    info.genres.map(genre => {

                                                        return (
                                                            <span className="m-1" key={genre.mal_id}>
                                                                <Badge variant="light"> {genre.name}</Badge>
                                                            </span>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td> <span className="twice">Premiered: {info.debut} </span></td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Jumbotron>
                    </Col>
                </Row>
                <Row>
                    <Col className="mt-5 " >
                        <h2 className="twice">Synopsis</h2>
                        <p style={{ textAlign: "left" }} >
                            {anime.synopsis}
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col className="mb-5 " >
                        <hr className="line" />
                        <h2 className="twice">Trailer</h2>
                        <iframe src={anime.trailer_url}
                            title="Trailer"
                            width="420" height="315"

                        />

                    </Col>
                </Row>
            </Container>
        </div>
    )
}
