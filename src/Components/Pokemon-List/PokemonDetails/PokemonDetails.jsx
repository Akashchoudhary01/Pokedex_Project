// export default PokemonDetails;
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './PokemonDetails.css';
import { Link } from "react-router-dom";

function PokemonDetails() {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState({});

    async function downloadPokemon() {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        setPokemon({
            name: response.data.name,
            img: response.data.sprites.other.dream_world.front_default,
            weight: response.data.weight,
            height: response.data.height,
            types: response.data.types.map((t) => t.type.name),
        });
    }

    useEffect(() => {
        downloadPokemon();
    }, []);

    return (
        <div className="pokemonDetails-Wrapper">
            <div className="pokemon-Card">
                <h1 className="pokemon-Name">{pokemon.name}</h1>
                <img className="pokemon-Image" src={pokemon.img} alt={pokemon.name} />

                <div className="Attributes">
                    <div>Height: <span>{pokemon.height}</span></div>
                    <div>Weight: <span>{pokemon.weight}</span></div>
                </div>

                <div className="pokemonTypes">
                    {pokemon.types &&
                        pokemon.types.map((t) => (
                            <div key={t} className="pokemon-Type">
                                {t}
                            </div>
                        ))}
                </div>

                <div className="buttonContainer">
                    <Link to="/">
                        <button className="backButton">Back</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default PokemonDetails;