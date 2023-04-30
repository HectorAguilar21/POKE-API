import React, { useEffect, useState } from "react";
import Forms from "../components/componentsLanding/Forms";
import Results from "../components/componentsLanding/Results";
import { pokemonApi } from "../api/pokemonApi";
import FilterResults from "../components/componentsLanding/FilterResults";

export default function Landing() {
  const [tipos, setTipos] = useState([]);

  const typeColors = {
    normal: "#909BA1",
    fighting: "#D0436A",
    flying: "#8BACDE",
    poison: "#A670C1",
    ground: "#E57842",
    rock: "#CAB98B",
    bug: "#9ABF35",
    ghost: "#436CA8",
    steel: "#568FA9",
    fire: "#FF9B52",
    water: "#2E92D9",
    grass: "#6FBA60",
    electric: "#FCD23D",
    psychic: "#F87578",
    ice: "#73CEC0",
    dragon: "#0371BC",
    dark: "#5C5663",
    fairy: "#EA93E6",
  };

  const obtenerTipos = async () => {
    const response = await pokemonApi.get("/type");
    const resultTypes = response.data.results;
    setTipos(resultTypes);
  };

  useEffect(() => {
    obtenerTipos();
  }, []);

  const [tiposSeleccionados, setTiposSeleccionados] = useState([]);

  const toggleTipoSeleccionado = (tipo) => {
    if (tiposSeleccionados.includes(tipo)) {
      setTiposSeleccionados(tiposSeleccionados.filter((t) => t !== tipo));
    } else {
      setTiposSeleccionados([...tiposSeleccionados, tipo]);
    }
  };

  const [pokemonsResult, setPokemonsResult] = useState([]);

  const obtenerData = async () => {
    const response = await pokemonApi.get("/pokemon?limit=10000&offset=0");
    const pokemonResults = response.data.results;
    if (tiposSeleccionados.length > 0) {
      const pokemonData = await Promise.all(
        pokemonResults.map(async (pokemon) => {
          const response = await pokemonApi.get(`/pokemon/${pokemon.name}/`);
          return response.data;
        })
      );
      setPokemonsResult(pokemonData);
    }
  };

  useEffect(() => {
    obtenerData();
  }, [tiposSeleccionados]);

  const [pokemonsFiltrados, setPokemonsFiltrados] = useState([]);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (tiposSeleccionados.length) {
      setCargando(true);

      let filteredPokemon = pokemonsResult.filter((pokemon) =>
        pokemon.types.some((type) =>
          tiposSeleccionados.includes(type.type.name)
        )
      );
      let pokemonNames = filteredPokemon.map((pokemon) => pokemon.name);
      setPokemonsFiltrados(pokemonNames);
      setCargando(false);
    }
  }, [tiposSeleccionados, pokemonsResult]);

  const [mensajeDeError, setMensajeDeError] = useState("");

  return (
    <>
      <nav className="bg-red-500 flex justify-center py-1 gap-x-28 items-center max-sTMINI:gap-x-10">
        <img
          className="w-24"
          src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
          alt="imagen logo pokemon"
        />
        <button
          className="bg-amber-400 rounded-full h-fit py-2 px-4 font-Righteous uppercase font-semibold text-blue-800 tracking-widest"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasTop"
          aria-controls="offcanvasTop"
        >
          Filtrar
        </button>
        <div
          className="offcanvas offcanvas-top"
          tabIndex="-1"
          data-bs-scroll="true"
          id="offcanvasTop"
          aria-labelledby="offcanvasTopLabel"
        >
          <div className="offcanvas-header max-sHDplus:py-0">
            <h5
              className="offcanvas-title font-Righteous uppercase font-medium text-2xl text-blue-800 max-sTMINI:text-lg max-sCXS:text-base"
              id="offcanvasTopLabel"
            >
              Filtrar por tipo de Pokemon:{" "}
              {tiposSeleccionados.map((tipoSelec, index) => (
                <span className="capitalize text-red-400" key={index}>
                  {tipoSelec}
                  {tiposSeleccionados.length > 1 && ","}{" "}
                </span>
              ))}
            </h5>
          </div>
          <div className="offcanvas-body flex justify-center flex-wrap">
            {tipos.map((tipo, index) => (
              <button
                className={`rounded-3xl text-base py-2 sHDplus:w-[150px] uppercase font-Righteous font-light m-1  sTPRO:w-[100px] sTMINI:w-[75px] max-sT:text-sm sCXS:w-[65px] max-sCXS:text-xs sMINI:w-[60px] ${
                  tiposSeleccionados.includes(tipo.name)
                    ? "text-black"
                    : "text-white"
                }`}
                key={index}
                style={{ backgroundColor: `${typeColors[tipo.name]}` }}
                onClick={() => toggleTipoSeleccionado(tipo.name)}
              >
                {tipo.name}
              </button>
            ))}
          </div>
        </div>
      </nav>
      <main className="w-full flex p-1 sHD:flex-row sMINI:flex-col">
        <div className="">
          <Forms />
        </div>
        <div className="w-full">
          {tiposSeleccionados.length === 0 ? (
            <Results />
          ) : (
            <FilterResults
              pokemonsFiltrados={pokemonsFiltrados}
              setMensajeDeError={setMensajeDeError}
              cargando={cargando}
            />
          )}
        </div>
      </main>
    </>
  );
}
