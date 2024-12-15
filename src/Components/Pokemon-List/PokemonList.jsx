import { useEffect, useState } from "react";
import axios from 'axios';
// Import Css
import './PokemonList.css';
import Pokemon from "../Pokemon/Pokemon";
function PokemonList(){

    const [PokemonList , setpokemonList] = useState([]);
    const [isLoading , setIsloading] = useState(true);

    const PokedexUrl = 'https://pokeapi.co/api/v2/pokemon/'


    async function downlodePokemon(){
        const response =  await axios.get(PokedexUrl); //this downlode the list of 20 pokemons
        const pokemonResults = response.data.results; //We got the array of pokemon from result
        console.log(response.data);


        // iterating over the array of pokemons , and using their url, to create an array of promises
        // that will downlode those 20 pokemon


        
        const pokemonResultPromise = pokemonResults.map((pokemon)=> axios.get(pokemon.url));
        // passing that promish array to axios.all

        const pokemonData = await axios.all(pokemonResultPromise); //Array of 20 pokemon detail data
        console.log(pokemonData);
        // now iterate on the data of each pokemon an d extract id ,mame , image , types
        const pokeListResult = pokemonData.map((pokeData)=>{
            const pokemon = pokeData.data;
            return {
                id:pokemon.id,
                name: pokemon.name ,
                image:(pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny ,
                types: pokemon.types
            }
    });
    console.log(pokeListResult); 
    setpokemonList(pokeListResult);
    setIsloading(false);
    }

    useEffect(() =>{
        downlodePokemon()
      
        
    } , []);


    return(
       <div className="PokemonList-Wrapper">
                    
                <div className="Pokemon-Wrapper">
                    
                {(isLoading)?'loading....': PokemonList.map  ((p)=> <Pokemon
                 name={p.name}
                 image={p.image}
                 key={p.id}
                 />)  
                }
                </div>   

                <div className="Controls">
                    <button>Prev</button>
                    <button>Next</button>

                    
               </div> 
       </div>
    )

}
export default PokemonList;
