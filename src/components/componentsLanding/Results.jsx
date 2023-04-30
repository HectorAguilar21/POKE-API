import React, { useEffect, useState } from "react";
import { pokemonApi } from "../../api/pokemonApi";
import Card from "../Card";
import axios from "axios";

export default function Results() {
  const [urlPokemons, setUrlPokemons] = useState("/pokemon?limit=12&offset=0");
  const [nextPokemons, setNextPokemons] = useState("");
  const [prevPokemons, setPrevPokemons] = useState("");

  const [mensajeDeError, setMensajeDeError] = useState("");
  const [pokemonsResult, setPokemonsResult] = useState([]);

  const obtenerData = async () => {
    const response = await pokemonApi.get(urlPokemons);
    const pokemonResults = response.data.results;
    setPokemonsResult(pokemonResults);
    const nextResults = response.data.next;
    setNextPokemons(nextResults);
    if (response.data.previous) {
      const prevResults = response.data.previous;
      setPrevPokemons(prevResults);
    }
  };

  useEffect(() => {
    obtenerData();
  }, [urlPokemons]);

  const handleNextResult = () => {
    setUrlPokemons(nextPokemons);
  };

  const handlePrevResult = () => {
    setUrlPokemons(prevPokemons);
  };
  return (
    <>
      {pokemonsResult.length ? (
        <>
          <div
            className={`flex ${
              prevPokemons === "" ? "justify-center" : "justify-between"
            } px-10 pb-2`}
          >
            {prevPokemons === "" ? (
              <button
                className="bg-green-400 rounded-3xl text-2xl max-sTMINI:text-base uppercase font-semibold font-Righteous w-[250px] max-sT:w-[200px] max-sTMINI:w-[150px] py-2"
                onClick={handleNextResult}
              >
                Siguiente
              </button>
            ) : (
              <>
                <button
                  className="bg-green-400 rounded-3xl text-2xl max-sTMINI:text-base uppercase font-semibold font-Righteous w-[250px] max-sT:w-[200px] max-sTMINI:w-[150px] py-2"
                  onClick={handlePrevResult}
                >
                  Anterior
                </button>
                <button
                  className="bg-green-400 rounded-3xl text-2xl max-sTMINI:text-base uppercase font-semibold font-Righteous w-[250px] max-sT:w-[200px] max-sTMINI:w-[150px] py-2"
                  onClick={handleNextResult}
                >
                  Siguiente
                </button>
              </>
            )}
          </div>
          <div className="flex flex-wrap justify-evenly gap-y-10">
            {pokemonsResult ? (
              pokemonsResult.map((pokemon, index) => (
                <Card
                  nombrePokemon={pokemon.name}
                  setMensajeDeError={setMensajeDeError}
                  key={index}
                />
              ))
            ) : (
              <h1>Cargando...</h1>
            )}
          </div>
          <div
            className={`flex ${
              prevPokemons === "" ? "justify-center" : "justify-between"
            } px-10 pt-2`}
          >
            {prevPokemons === "" ? (
              <button
                className="bg-green-400 rounded-3xl text-2xl max-sTMINI:text-base uppercase font-semibold font-Righteous w-[250px] max-sT:w-[200px] max-sTMINI:w-[150px] py-2"
                onClick={handleNextResult}
              >
                Siguiente
              </button>
            ) : (
              <>
                <button
                  className="bg-green-400 rounded-3xl text-2xl max-sTMINI:text-base uppercase font-semibold font-Righteous w-[250px] max-sT:w-[200px] max-sTMINI:w-[150px] py-2"
                  onClick={handlePrevResult}
                >
                  Anterior
                </button>
                <button
                  className="bg-green-400 rounded-3xl text-2xl max-sTMINI:text-base uppercase font-semibold font-Righteous w-[250px] max-sT:w-[200px] max-sTMINI:w-[150px] py-2"
                  onClick={handleNextResult}
                >
                  Siguiente
                </button>
              </>
            )}
          </div>
        </>
      ) : (
        <h1 className="text-center text-8xl font-bold">Cargando...</h1>
      )}
    </>
  );
}
