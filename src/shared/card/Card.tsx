import React from "react";
import { Pokedex } from "../../types/Types";
import "./Card.css";
import { Link } from "react-router-dom";

const addLeadingZeros = (num: number, totalLength: number) => {
  return String(num).padStart(totalLength, "0");
};
function Card(pokemonDeatils: Pokedex) {
  console.log(pokemonDeatils);

  return (
    <>
      
      <div className="Cards">
      <Link to={"/details"} state={{ pokemon: pokemonDeatils }} style={{textDecoration:'none'}}>
      <div className="idnum">#{addLeadingZeros(pokemonDeatils.id, 3)}</div>
        <div className="moveToghter">
        <img className="image" src={pokemonDeatils.sprites.front_default} />
        <div className="PokeName">{pokemonDeatils.name}</div>
        </div>
      </Link>
     </div>
    </>
  );
}

export default Card;
