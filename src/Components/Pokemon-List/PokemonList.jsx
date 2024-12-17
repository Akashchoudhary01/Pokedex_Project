// import { useEffect, useState } from "react";
// import axios from 'axios';
// Import Css
import './PokemonList.css';
import Pokemon from "../Pokemon/Pokemon";
import usePokemonList from "../../hooks/usePokemonList";
function PokemonList(){
    const{setPokimonListState , pokimonListState} = usePokemonList();
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