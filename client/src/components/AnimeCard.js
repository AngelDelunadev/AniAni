import React from 'react'

export default function AnimeCard(props) {

    return (
        <div >
            <a href="#" className="card">
                <img src={props.anime.image_url} alt="" className="card-image"></img>
                <div className="card-content">
                    <div className="card-content-title">{props.anime.title}</div>
                    <button className="card-content-details">Details</button>
                    <div className="card-content-footer">
                        <div>{props.anime.type}</div>
                        <div>{props.anime.start_date}</div>
                    </div>
                </div>
            </a>
        </div>
    )
}
