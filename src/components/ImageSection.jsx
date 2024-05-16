// ImageSection.jsx


import React, {useState, useEffect} from "react";

export default function ImageSection() {
    const [imageUrls, setImageUrls] = useState([]);

    
    useEffect(() => {
        async function getPokemons() {
            const randomPokemonIds = [];
            const numberOfPokemons = 10;
            while (randomPokemonIds.length < numberOfPokemons) {
                const randomId = Math.floor(Math.random() * 50) + 1;
                if(!randomPokemonIds.includes(randomId)) {
                    randomPokemonIds.push(randomId);
                }
            }
            
            const promises = randomPokemonIds.map(id => fetch(`https://pokeapi.co/api/v2/pokemon/${id}`));           
            const responses = await Promise.all(promises);
            const data = await Promise.all(responses.map(response => response.json()))

            const urls = data.map(pokemon => pokemon.sprites.front_default);
            setImageUrls(urls);
        }
    
        getPokemons();
    }, []);

    return (
        <div>
            <h2>The Images are here</h2>
            {imageUrls.length > 0 ? (
                <div>
                    {imageUrls.map((url, index) => (
                        <img key={index} src={url} alt={`Pokemon ${index + 1}`} />
                    ))}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}