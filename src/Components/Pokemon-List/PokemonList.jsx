import { useEffect, useState } from "react";
import axios from 'axios';
// Import Css
import './PokemonList.css';
import Pokemon from "../Pokemon/Pokemon";
function PokemonList(){

    const [pokimonListState , setPokimonListState] = useState({
        PokemonList:[],
        isLoading: true,
        PokedexUrl:'https://pokeapi.co/api/v2/pokemon/',
        nextUrl:'',
        prevUrl: ''
    })

    async function downlodePokemon(){
        setPokimonListState((state)=>({...state, isLoading:true}));
        const response =  await axios.get(pokimonListState.PokedexUrl); //this downlode the list of 20 pokemons
        const pokemonResults = response.data.results; //We got the array of pokemon from result
        console.log(response.data);
        setPokimonListState((state)=>({
            ...state,
             nextUrl:response.data.next ,
            prevUrl:response.data.previous
        }));


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
    setPokimonListState((state)=>({
        ...state,
        PokemonList:pokeListResult , 
        isLoading:false
    }));
    }

    useEffect(() =>{
        downlodePokemon()
      
        
    } , [pokimonListState.PokedexUrl]);


    return(
       <div className="PokemonList-Wrapper">
                    
                <div className="Pokemon-Wrapper">
                    
                {(pokimonListState.isLoading)?'loading....': pokimonListState.PokemonList.map  ((p)=> <Pokemon
                 name={p.name}
                 image={p.image}
                 key={p.id}
                 id = {p.id}
                 />)  
                }
                </div>   

                <div className="Controls">
                    <button 
                    disabled={pokimonListState.prevUrl == null}
                    onClick={()=> setPokimonListState({...pokimonListState,PokedexUrl : pokimonListState.prevUrl})}>Prev </button>



                    <button
                     disabled={pokimonListState.nextUrl == null}
                     onClick={()=>setPokimonListState({...pokimonListState,PokedexUrl : pokimonListState.nextUrl})}>Next </button>


                    
               </div> 
       </div>
    )

}
export default PokemonList;
