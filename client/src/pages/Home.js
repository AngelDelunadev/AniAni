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
    return(
        <div className = "box">{
            topAnime.map((anime,index) => {
                
                return (
                    <div key = {anime.mal_id}>
                        <AnimeCard anime={anime} />
                    </div>
                )
            })
            }
        </div>
        
        
    )

}
