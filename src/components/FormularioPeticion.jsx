import React, { useEffect, useState } from "react";

export default function FormularioPeticion({ guardarUrl }) {
  const [nombrePokemon, setNombrePokemon] = useState("");

  const handleNombrePokemon = (e) => {
    setNombrePokemon(e.target.value);
  };

  useEffect(() => {
    guardarUrl(nombrePokemon);
  }, [nombrePokemon]);

  return (
    <div className="bg-white rounded-3xl shadow-2xl mb-10 font-Righteous w-[425px] max-sT:w-[275px]">
      <h1 className="text-2xl text-center p-3">¿Que pokemon estas buscando?</h1>
      <div className="p-5">
        <input
          className="w-full bg-amber-100 rounded-lg p-2"
          type="text"
          placeholder="Buscar"
          onChange={handleNombrePokemon}
          value={nombrePokemon}
        />
      </div>
    </div>
  );
}
