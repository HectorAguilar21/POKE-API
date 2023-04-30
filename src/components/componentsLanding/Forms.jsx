import React, { useEffect, useState } from "react";
import FormularioPeticion from "../FormularioPeticion";
import Card from "../Card";
import { pokemonApi } from "../../api/pokemonApi";

export default function Forms() {
  const [nombrePokemon, setNombrePokemon] = useState("");

  const guardarUrl = (nombrePokemonInput) => {
    setNombrePokemon(nombrePokemonInput);
  };

  const [mensajeDeError, setMensajeDeError] = useState("");
  const [validPokemon, setValidPokemon] = useState(false);
  const obtenerData = async () => {
    try {
      const response = await pokemonApi.get(
        `/pokemon/${nombrePokemon.toLowerCase().trim()}/`
      );
      if (response) {
        setValidPokemon(true);
        setMensajeDeError("");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setMensajeDeError("El pokemon no se encontró :(");
        setValidPokemon(false);
      } else {
        setMensajeDeError("Ingresa el nombre del pokemon para empezar :)");
        setValidPokemon(false);
      }
    }
  };

  useEffect(() => {
    obtenerData();
  }, [nombrePokemon]);

  return (
    <div className="sT:p-4 flex flex-col items-center sMINI:p-0 sMINI:py-4">
      <FormularioPeticion guardarUrl={guardarUrl} />
      {mensajeDeError || validPokemon === false ? (
        <h2 className="bg-white rounded-3xl shadow-2xl text-center p-10 text-2xl text-red-600 w-[425px]max-sT:w-[275px]">
          {mensajeDeError}
        </h2>
      ) : (
        <Card
          setMensajeDeError={setMensajeDeError}
          nombrePokemon={nombrePokemon}
        />
      )}
    </div>
  );
}
