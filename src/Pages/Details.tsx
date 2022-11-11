import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Pokedex } from "../types/Types";
import Card from "../shared/card/Card";
import pokemonDeatils from "../types/Element";
import "../shared/card/Card.css";
import TypeOfPokemons from "./TypesOfPokemons";
import { DeatilsDescription } from "./DescriptionGetter";
const Details = () => {
  const selectedPokemon = useLocation();
  const { pokemon } = selectedPokemon.state;
  const [detatils, setDeatils] = useState<Pokedex>(pokemon);
  const [pokemondescribe, setPokemonDescribe] = useState<string>("");
  const [allnum,setAllNum]=useState<number[]>([])
  const addLeadingZeros = (num: number, totalLength: number) => {
    return String(num).padStart(totalLength, "0");
  };
  useEffect(() => {
    const urldet = detatils.species.url;
    console.log(urldet);
    fetchpokemondet(urldet);
  
  }, []);
  const fetchpokemondet = async (urldetails: string) => {
    try {
      const response = await fetch(urldetails);
      const json = await response.json();
      const result: DeatilsDescription = json;
      setPokemonDescribe(result.flavor_text_entries[0].flavor_text.charAt(0).toUpperCase() + result.flavor_text_entries[0].flavor_text.slice(1));
    } catch (error) {}
  };
  
  const totalnum=(allnum:number[])=>{
    let total=0;
    detatils.stats.map((stat:any)=>total+=stat.base_stat)
    console.log(total);
    return total;
    
  }

  return (
    <>
      <div className="pokemonDeatils">
        <div className="idblock">#{addLeadingZeros(detatils.id, 3)}</div>
        <div className="pokemonContainer">
          <div className="pokemondet">
            <img 
              src={detatils.sprites.other?.["official-artwork"].front_default}
            />
           
            {<div className="namePokemon">{detatils.name}</div>}
            <div className="DeatilsType">
            {detatils.types
              .flatMap((type) => type.type.name)
              .map((pokemonDetails) => (
                
                  <TypeOfPokemons TypeOfPoke={pokemonDetails} />
                
              ))}
              
              
              </div>
          </div>
          <div className="bordersplitter"></div>
          <div className="right">
            <div className="padtitle">Description</div>
            <div className="desctext">{pokemondescribe}</div>
            <div className="paddown">
            <div className="padtitle Movealone">Stats</div>
            <div className="statcont">
            {detatils.stats.map((stat) => (
              <div className="namestat">
                 {stat.stat.name} : {stat.base_stat}
              </div>
            ))}
              Total : {totalnum(allnum)}

            </div>
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
