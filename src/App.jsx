import './App.css'
import { Link } from 'react-router-dom'
// import Pokedex from './Components/Pokedex/Pokedex'
import CustomRoutes from './Routes/CustomRoutes'


function App() {
 

  return (
    <>
    {/* <Pokedex/> */}
    <h1 id="pokedex-header">
      <Link to='/' >Pokedex</Link>

      </h1>
    <CustomRoutes/>
    </>
  )
}

export default App
