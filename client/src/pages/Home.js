import { useEffect, useState } from 'react'
import AnimeCard from '../components/AnimeCard'

export default function Home(props) {
    const [topAnime, setTopAnime] = useState([])

    const fetchTopAnime = () => {
        fetch("/api/v1/jikan/anime/top")
            .then(res => res.json())
            .then((data) => {
                setTopAnime(data)
            })
    }

    useEffect(() => {
        fetchTopAnime()
    }, [])
    return (
                <div className= "separator">
                    <h2 className="separator-title">Top Anime</h2>
                    <hr className="line"/>
                <div className="slider">{
                    topAnime.map((anime, index) => {
                        
                        return (
                            <div key={anime.mal_id}>
                                <AnimeCard anime={anime} />
                            </div>
                        )
                    })
                }
                </div>
                <hr className="line"/>
                </div>


    )

}
