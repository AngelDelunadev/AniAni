import { useEffect, useState } from "react"
import { CardGroup, Col, Container, Jumbotron, Row } from "react-bootstrap"
import { useSelector } from "react-redux";
import AnimeCard from "../components/AnimeCard"
import profile from '../profieAni.png'


export default function Profile() {
    const [favorites, setFavorites] = useState([])
  const user = useSelector((state) => state.user);

    useEffect(() => {
        fetchFavorites()
    }, [])

    const fetchFavorites = () => {
        fetch('/api/v1/favorites')
            .then(res => res.json())
            .then(data => {
                setFavorites(data)
            })
    }

    return (
        <Container className="">
            <h1 className="twice">Profile</h1>
            <div>
                <Row >
                    <Col className="mt-3" sm={12} md={5} xs={12}>
                        <Jumbotron className="aniJumbo">
                                <h2 className="twice ">{user.username.toUpperCase()}</h2>
                                <Col sm={12}>
                                    <img src={profile} alt="" id="profileImg"></img>
                                </Col>
                                <Col sm={12} >
                                    <h3 className="twice"> Favorites: {favorites.length}</h3>
                                   
                                </Col>
                        </Jumbotron>

                    </Col>
                    <Col sm={12} md={7} xs={12} >
                        <Row> 
                            <CardGroup >
                                {
                                    favorites.map(favs => {
                                        return (
                                            <Col lg={4} md={6} sm={6} >
                                                <AnimeCard anime={favs} />
                                            </Col>
                                        )
                                    })
                                }
                            </CardGroup>
                        </Row>
                    </Col>

                </Row>
            </div>
        </Container>
    )
}
