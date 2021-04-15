import React from 'react'

export default function AnimeCard(props) {

    return (
        <div className="item ">
            <img src = {props.anime.image_url} alt= "" className="aniCard-img"></img>
        </div>
    )
}
