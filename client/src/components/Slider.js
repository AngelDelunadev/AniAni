import { useEffect, useState } from 'react'
import AnimeCard from '../components/AnimeCard'

export default function Slider(props) {

    const [topAnime, setTopAnime] = useState([])

    const fetchTopAnime = () => {
        fetch(`/api/v1/jikan/anime/${props.type}`)
            .then(res => res.json())
            .then((data) => {
                setTopAnime(data)
            })
    }
    useEffect(() => {
        fetchTopAnime()
        // eslint-disable-next-line
    }, [])

    return (
        <div className="separator ">
            <h2 className="separator-title twice">{props.title}</h2>
            <div>
                <hr className="line" />
                <div className="slider overflow-auto">{
                    topAnime.map((anime, index) => {

                        return (
                            <div key={anime.mal_id}>
                                <AnimeCard anime={anime} />
                            </div>
                        )
                    })
                }
                </div>
                <hr className="line" />
            </div>
        </div>
       
    )
}
