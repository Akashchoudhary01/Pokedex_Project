import PokemonList from "../Pokemon-List/PokemonList";
import Search from "../Search/Search";
// Css Import
import './Pokedex.css'

function Pokedex(){
return(
    <div className="Pokedex-Wrapper">
        <h1 id="pokedex-header">Pokedex</h1>
 
    <Search/>
    <PokemonList/>
    </div>
)
}
export default Pokedex;