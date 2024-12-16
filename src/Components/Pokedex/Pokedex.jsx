import PokemonList from "../Pokemon-List/PokemonList";
import Search from "../Search/Search";
// Css Import
import './Pokedex.css'

function Pokedex(){
return(
    <div className="Pokedex-Wrapper">
     
 
    <Search/>
    <PokemonList/>
    </div>
)
}
export default Pokedex;