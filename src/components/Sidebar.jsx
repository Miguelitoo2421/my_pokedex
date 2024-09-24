import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {ClipLoader,DotLoader} from "react-spinners";

function Sidebar() {

  const [pokemons, setPokemons] = useState(null);

  useEffect(()=>{
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    .then((response)=> response.json())
    .then((responseJSON)=>{
      setPokemons(responseJSON.results);
    })
    .catch((error)=>console.log(error));
  }, []);

  //Esperando data...
  if(!pokemons) return <div> <DotLoader color="red" size={50}/> </div>

  return (
    <nav className="sidebar">
      
      <h6>Elige un pokemon</h6>

      {/* example of 3 links */}
      {pokemons.map((pokemon)=>{
        return(
          <Link to={`/pokemon-details/${pokemon.name}`} key={pokemon.name} >{pokemon.name}</Link>
        );
      })}

    </nav>
  )
}

export default Sidebar