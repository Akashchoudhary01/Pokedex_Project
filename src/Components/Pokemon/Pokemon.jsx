import './Pokemon.css'
function Pokemon({name , image}){
    return(
        <div className='Pokemon'>
            <div className='PokemonName'>{name}</div>
            <div>
                <img className='PokemonImage' src={image}/>
            </div>
        </div>
    )

}
export default Pokemon;