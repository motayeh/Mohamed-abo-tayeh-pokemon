import React, { useEffect, useState } from "react";
import { json } from "stream/consumers";
import Card from "../shared/card/Card";
import { Pokedex } from "../types/Types";
import { IPokemon } from "../types/Types";
import Deatils from "./Details";
import { pokemonDeatils } from "../types/Element";
import "../Layout/Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  const [pokemonsList, setPokemonsList] = useState<Pokedex[]>([]);
  const [nextUrl, setNextUrl] = useState<string>("");
  const [det, setDet] = useState<Pokedex[]>([]);
  const [newPokemon, setNewPokemon] = useState<string>("");
  const [inputSearchValue, setInputSearchValue] = useState<string>("");
  useEffect(() => {
    const url = "https://pokeapi.co/api/v2/pokemon";
    fetchData(url);
  }, []);

  const fetchData = async (url: string) => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      const allPokimons = [...pokemonsList, ...json.results];
      const pokde = json.results;
      setPokemonsList(allPokimons);
      pokde.forEach((deatils: IPokemon) => {
        const pokdet = deatils.url;
        fetchDeatils(pokdet);
      });
      if (json.next !== "") {
        setNextUrl(json.next);
      } else {
        setNextUrl("");
      }
      console.log(json);
    } catch (error) {
      console.log("error", error);
    }
  };

  const loadMore = async () => {
    await fetchData(nextUrl);
  };
  const fetchDeatils = async (url: string) => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setDet((poke) => [...poke, json]);
      console.log(json);
    } catch (error) {
      console.log("error", error);
    }
  };
  const isContaiendLetters = (pokemon: Pokedex) => {
    return pokemon.name.includes(newPokemon);
  };
  const search = () => {
    setNewPokemon(inputSearchValue);
  };

  return (
    <>
      <div className="allbars">
       <div className="box">
        <input
          className="searchbar"
          type={"text"}
          placeholder={"Pokemon Name"}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setInputSearchValue(e.currentTarget.value)
          }
        ></input>
        <button className="searchButton" onClick={search}>
         <div className="searchcontent">
          Search
          </div>
        </button>
      </div>
      </div>

      <div className="HomePage">
        {det &&
          det
            .filter(isContaiendLetters)
            .map((pokemon) => <Card {...pokemon} />)}
      </div>

      <div className="LoadMore">
        {nextUrl && <button onClick={loadMore}>Load more</button>}
      </div>
    </>
  );
};

export default Home;
