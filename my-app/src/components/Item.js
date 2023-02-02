import React, { useState } from 'react'

const characterDetails = {
    name: null,
    height: null,
    homeworld: null,
    films: []
}
export default function StarWars ()  {
    const [details, setCharacterDetails] = useState(characterDetails)
    const [loadedData, setLoadedData] = useState(false)
    const [filmList, setFilmList] = useState([])
    const { name, height, homeworld } = details || {}

    const getNewCharacter = () => {
        const randomNumber = Math.round(Math.random() * 82)
        setLoadedData(false)
        const url = `https://swapi.dev/api/people/${randomNumber}`

        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setCharacterDetails({details, ...data})
                data.films.forEach(filmUrl => {
                    fetch(filmUrl)
                    .then(response => response.json())
                    .then(data => {
                        setFilmList(filmList => [...filmList, data])
                    }) 
                })
                setLoadedData(true)
            })
            
    }

     return (
        <div>
            {
                loadedData &&
                <div>
                    <h1>Name: {name}</h1>
                    <p>Height: {height} cm</p>
                    <p>Home World: <a href={homeworld} target="_blank">{homeworld}</a></p>
                    <p>Films stared in:</p>
                    <ul>
                        {filmList &&
                            filmList.map(x => {
                                return <li key={x.episode_id}>{x.title}</li>
                            }) 
                        }
                    </ul>
                </div>
            }
            <button type='button' className='btn' onClick={() => getNewCharacter()}>Randomize Generator</button>
        </div>
     )
  }