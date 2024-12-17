import { useState , useEffect } from "react";
import axios from 'axios';
function usePokemonList(){
      const [pokimonListState , setPokimonListState] = useState({
            PokemonList:[],
            isLoading: true,
            PokedexUrl:'https://pokeapi.co/api/v2/pokemon/',
            nextUrl:'',
            prevUrl: ''
        })
        // pokemon downlodes
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
        return {pokimonListState , setPokimonListState}
    
}
export default usePokemonList;