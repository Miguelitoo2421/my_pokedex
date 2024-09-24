import { Link, useParams, useNavigate } from "react-router-dom";
import pokeballImg from "../assets/images/pokeball.png"
import { useEffect, useState } from "react";
import {DotLoader} from "react-spinners";

function PokemonPage(){

    const {pokemonName} = useParams();

    const [pokemonDetails, setPokemonDetails] = useState(null);

    const navigate = useNavigate();

    // useEffect(()=>{
    //     fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    //     .then((response)=>{
    //         return response.json();
    //     })
    //     .then((pokemonDetails)=>{
    //         setPokemonDetails(pokemonDetails)
    //     })
    //     .catch((error)=>console.log(error))
    // }, [])

    useEffect(()=>{
        getData();
    },[pokemonName])

    async function getData() {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
            const data = await response.json();
            console.log(data);
            setPokemonDetails(data);
        } 
        catch (error) {
            console.log(error)
            navigate("/error");
        };
    }

    //Esperando pokemon details...
    if(!pokemonDetails) return <div> <DotLoader color="red" size={50}/> </div>

    return(
        <div>
            <h3>{pokemonName}</h3>
            <div>
                <img id="pokemon-sprite" src={pokemonDetails.sprites.other.home.front_default} alt="pokemon sprite" />
                {pokemonDetails.types.map((type,index)=>{
                    return(
                        <p key={index}>{type.type.name}</p>
                    );
                })}
                <ul>
                    {pokemonDetails.abilities.map((ability)=>{
                        return(
                            <li key={ability.ability.name}>{ability.ability.name}</li>
                        );
                    })}
                </ul>
            </div>
            <Link to={"/"}>
                <img src={pokeballImg} alt="pokeball" width={70}/>
            </Link>
        </div>
    );
}

export default PokemonPage;