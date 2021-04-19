import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function AnimeCard(props) {

    const fetchDelete = () => {
        fetch(`/api/v1/favorites/${props.anime.id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                props.fetchFavorites()
            })

    }
    return (
        <div >
            {props.anime.malId ?
                    <Link to={`/anime/${props.anime.malId}`} className="card2">
                    <img src={props.anime.imageUrl} alt="" className="card-image"></img>
                    <div className="card-content">
                        <div className="card-content-title">{props.anime.title}</div>
                        <Button className="card-content-details" variant="outline-primary">Details</Button>
                        <Link to="/profile">
                            <Button onClick={fetchDelete} className="card-content-details" variant="outline-danger">Delete</Button>
                        </Link>

                        <div className="card-content-footer">
                            <div>{props.anime.type}</div>
                            <div>{props.anime.aired}</div>
                        </div>
                    </div>
                </Link>
                :
            <Link to={`/anime/${props.anime.mal_id}`} className="card2">
                <img src={props.anime.image_url} alt="" className="card-image"></img>
                <div className="card-content">
                    <div className="card-content-title">{props.anime.title}</div>
                    {/* <button className="card-content-details">Details</button> */}
                    <Button className="card-content-details" variant="outline-primary">Details</Button>
                    <div className="card-content-footer">
                        <div>{props.anime.type}</div>
                        <div>{props.anime.start_date}</div>
                    </div>
                </div>
            </Link>
            }
        </div>
    )
}
