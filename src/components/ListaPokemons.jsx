import React, { useState } from "react";
import { pokemonApi } from "../api/pokemonApi";

export default function ListaPokemons() {
  const [dataPokemons, setDataPokemons] = useState();

  const obtenerData = async () => {
    const { data } = await pokemonApi.get(`/pokemon?limit=10&offset=0.`);
    setDataPokemons(data);
  };

  obtenerData();
  return <div>ListaPokemons</div>;
}
