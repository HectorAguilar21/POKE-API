import React, { useEffect, useState } from "react";
import { pokemonApi } from "../api/pokemonApi";
import RadarChart from "./charts/RadarChart";

export default function Card({ setMensajeDeError, nombrePokemon }) {
  const [onePokemon, setOnePokemon] = useState({});
  const [abilitiesPokemons, setAbilitiesPokemons] = useState([]);
  const [movesPokemon, setMovesPokemon] = useState([]);
  const [statsPokemon, setStatsPokemon] = useState([]);
  const [typePokemon, setTypePokemon] = useState([]);

  const [imageColor, setImageColor] = useState("");
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
  const obtenerData = async () => {
    try {
      if (nombrePokemon !== "") {
        const response = await pokemonApi.get(
          `/pokemon/${nombrePokemon.toLowerCase().trim()}/`
        );
        const onePokemon = response.data;
        setOnePokemon(onePokemon);
        // console.log(onePokemon);
        const abilities = onePokemon.abilities;
        setAbilitiesPokemons(abilities);
        const moves = onePokemon.moves;
        setMovesPokemon(moves);
        const stats = onePokemon.stats;
        setStatsPokemon(stats);
        const types = onePokemon.types;
        setTypePokemon(types);
        const primaryType = types[0].type.name;
        setImageColor(primaryType);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setMensajeDeError("El pokemon no se encontró :(");
      } else {
        setMensajeDeError("Ingresa el nombre del pokemon para empezar :)");
      }
    }
  };

  useEffect(() => {
    obtenerData();
    if (onePokemon) {
      setMensajeDeError("");
      // setValidPokemon(true);
    }
  }, [nombrePokemon]);

  const [statsLabels, setStatsLabels] = useState([]);
  const [statsBase, setStatsBase] = useState([]);

  useEffect(() => {
    const nombreStats = statsPokemon.map((stat) => stat.stat.name);
    setStatsLabels(nombreStats);
    const baseStats = statsPokemon.map((stat) => stat.base_stat);
    setStatsBase(baseStats);
  }, [statsPokemon]);

  const chartStatsData = {
    labels: statsLabels,
    datasets: [
      {
        label: "Stats",
        data: statsBase,
        borderColor: ["#145a32d6"],
        backgroundColor: ["#145a3247"],
      },
    ],
  };

  const [typeModal, setTypeModal] = useState("");

  const handleTypeStats = () => {
    setTypeModal("stats");
  };
  const handleTypeMoves = () => {
    setTypeModal("moves");
  };

  return (
    <>
      {Object.keys(onePokemon).length !== 0 && (
        <div className="bg-white rounded-3xl shadow-2xl w-[425px] h-[575px] font-Righteous m-auto relative sHD:w-[375px] max-sTPROplus:w-[350px] max-sT:w-[275px] max-sT:h-[510px]">
          <p className="text-center text-3xl pt-2">#{onePokemon.id}</p>
          <div className="flex w-full items-center py-4 max-sT:py-1">
            <div className="w-1/2 flex justify-end">
              <div
                className="p-7 rounded-full h-[160px] w-[160px] flex items-center justify-center max-sT:h-[130px] max-sT:w-[130px]"
                style={{ border: `6px dotted ${typeColors[imageColor]}` }}
              >
                {onePokemon.sprites &&
                  onePokemon.sprites.other &&
                  onePokemon.sprites.other.home && (
                    <img
                      className={``}
                      src={onePokemon.sprites.other.dream_world.front_default}
                      alt=""
                    />
                  )}
                {(!onePokemon.sprites ||
                  !onePokemon.sprites.other ||
                  !onePokemon.sprites.other.home) && <p>Cargando...</p>}
              </div>
            </div>
            <div className="w-1/2 text-start pl-5 box-border">
              {typePokemon.map((type, index) => (
                <p className="text-xl max-sT:text-base" key={index}>
                  Type:
                  <span
                    className={`capitalize font-bold text-2xl max-sT:text-lg`}
                    style={{ color: `${typeColors[type.type.name]}` }}
                  >
                    {" "}
                    {type.type.name}
                  </span>
                </p>
              ))}
              <p className="text-xl">
                Altura:
                <span className="font-bold text-2xl"> {onePokemon.height}</span>
              </p>
              <p className="text-xl">
                Peso:
                <span className="font-bold text-2xl"> {onePokemon.weight}</span>
              </p>
            </div>
          </div>
          <h2 className="text-center pb-3 text-5xl capitalize text-blue-600 max-sT:text-4xl">
            {onePokemon.name}
          </h2>
          <div className="px-8 pt-3 pb-8 flex justify-center items-center">
            <ul className="list-disc text-3xl text-center max-sT:text-2xl">
              {abilitiesPokemons.map((ability, index) => (
                <li key={index}>{ability.ability.name}</li>
              ))}
            </ul>
          </div>
          <div className="w-full flex justify-around pb-5 text-white uppercase text-lg font-medium absolute bottom-0 max-sT:flex-col items-center max-sT:gap-y-3">
            <button
              className="bg-amber-400 hover:bg-amber-500 h-[30px] w-[140px] rounded-3xl uppercase"
              type="button"
              data-bs-toggle="modal"
              data-bs-target={`#${onePokemon.name}`}
              onClick={handleTypeStats}
            >
              Estadisticas
            </button>
            <button
              className="bg-red-400 hover:bg-red-500 h-[30px] w-[140px] rounded-3xl uppercase"
              type="button"
              data-bs-toggle="modal"
              data-bs-target={`#${onePokemon.name}`}
              onClick={handleTypeMoves}
            >
              Movimientos
            </button>
            <div
              className="modal fade"
              id={onePokemon.name}
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content bg-slate-100">
                  <div className="modal-header">
                    <h1
                      className="modal-title fs-5 text-amber-400"
                      id="exampleModalLabel"
                    >
                      {typeModal === "stats"
                        ? "Estadisticas: "
                        : "Movimientos: "}
                      <span className="text-blue-600">{onePokemon.name}</span>
                    </h1>
                    <button
                      type="button"
                      className="btn-close bg-black text-white"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      x
                    </button>
                  </div>
                  <div className="modal-body">
                    {typeModal === "stats" ? (
                      <div className="h-[500px] flex justify-center max-sTMINI:h-[450px] max-sCXS:h-[375px] max-sCS:h-[300px]">
                        <RadarChart chartData={chartStatsData} />
                      </div>
                    ) : (
                      <div className="w-full flex flex-wrap gap-2">
                        {movesPokemon.map((move, index) => (
                          <p
                            className="text-black bg-orange-400 rounded-3xl text-xl py-2 sTMINI:px-4 w-[250px] h-[50px] text-center max-sTPROplus:w-[225px] max-sTMINI:w-[140px] max-sTMINI:text-sm max-sTMINI:h-[40px] max-sCS:text-xs max-sCS:w-[120px]"
                            key={index}
                          >
                            {move.move.name}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
