import React, { useState, useEffect } from "react";

export default function ImageSection() {
    const [imageUrls, setImageUrls] = useState([]);
    const [currentScore, setCurrentScore] = useState([]);
    const [highScore, setHighScore] = useState(0);
    

    useEffect(() => {
        fetchPokemons();
    }, []);

    const fetchPokemons = async () => {
        const randomPokemonIds = [];
        const numberOfPokemons = 5;
        while (randomPokemonIds.length < numberOfPokemons) {
            const randomId = Math.floor(Math.random() * 50) + 1;
            if (!randomPokemonIds.includes(randomId)) {
                randomPokemonIds.push(randomId);
            }
        }

        const promises = randomPokemonIds.map(id => fetch(`https://pokeapi.co/api/v2/pokemon/${id}`));
        const responses = await Promise.all(promises);
        const data = await Promise.all(responses.map(response => response.json()));

        const urls = data.map(pokemon => pokemon.sprites.front_default);
        setImageUrls(urls);
    };

    const shuffleImages = () => {
        setImageUrls(prevUrls => {
            const shuffledUrls = [...prevUrls];
            for (let i = shuffledUrls.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffledUrls[i], shuffledUrls[j]] = [shuffledUrls[j], shuffledUrls[i]];
            }
            return shuffledUrls;
        });
    };


    const addToCurrentScore = (url) => {
        if(!currentScore.includes(url)) {
        setCurrentScore(prevScore => [...prevScore, url]);
        } else {
            CheckIfNewHighScore(currentScore.length);
            setCurrentScore([])
        }
        

    }

    const CheckIfNewHighScore= (currentScore) => {
        if(currentScore > highScore) {
            setHighScore(currentScore)
        }

    }

    return (
        <div>
            <h2>Catch each Pokomon - but only once!</h2>
            {imageUrls.length > 0 ? (
                <div>
                    {imageUrls.map((url, index) => (
                        <img key={index} src={url} alt={`Pokemon ${index + 1}`} onClick={() => {shuffleImages(); addToCurrentScore(url); }} />
                    ))}
                </div>
            ) : (
                <p>Loading...</p>
            )}

            <h2>Score: {currentScore.length} </h2>
            
            <h2>High Score: {highScore}</h2>
        </div>
    );
}



