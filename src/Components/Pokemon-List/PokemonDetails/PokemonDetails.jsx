import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './PokemonDetails.css';

function PokemonDetails() {
    const {id} = useParams();
    const [pokemon , setPokemon] = useState({});
    // console.log(id);
    async function downlodePokemon() {
        const response = await axios.get(` https://pokeapi.co/api/v2/pokemon/${id}`);
        setPokemon({
            name: response.data.name,
            img: response.data.sprites.other.dream_world.front_default,
            weight: response.data.weight,
            height: response.data.height,
            types: response.data.types.map((t)=> t.type.name)
        })
        
    }
    useEffect(()=>{
        downlodePokemon();
    },[]);
    
    return(
        <div className="pokemonDetails-Wrapper">
            <div className="pokemon-Name"> {pokemon.name}</div>
            <img className="pokemon-Image" src={pokemon.img} />
            <div className="Atttributes">
            <div>Height: {pokemon.height}</div>
            <div>Weight: {pokemon.weight}</div>

            </div>
            <div className="pokemonTypes">{ pokemon.types && pokemon.types.map((t)=><div key={t}>{t}</div>
                )}
            </div>
        </div>
    )
    
}
export default PokemonDetails;