import Slider from '../components/Slider'
// import AnimeCard from '../components/AnimeCard'

export default function Home(props) {
    
    return (
        <div className= "m-4">
                <Slider type="1"title="Top Rated" />
                <Slider type="airing" title= "Airing"/>
                <Slider type={"upcoming"} title="Upcoming"/>
        </div>


    )

}

