import React from "react";
import Card from "../Card";

export default function FilterResults({
  pokemonsFiltrados,
  setMensajeDeError,
  cargando,
}) {
  return (
    <div className="flex flex-wrap justify-evenly gap-y-10 items-center h-full">
      {pokemonsFiltrados.length ? (
        pokemonsFiltrados.map((pokemon, index) => (
          <Card
            nombrePokemon={pokemon}
            key={index}
            setMensajeDeError={setMensajeDeError}
          />
        ))
      ) : (
        <h1 className="text-center text-8xl font-bold max-sTPRO:text-6xl max-sTMINI:text-4xl">
          Cargando...
        </h1>
      )}
    </div>
  );
}
