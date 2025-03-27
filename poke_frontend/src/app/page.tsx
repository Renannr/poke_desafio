"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export type Pokemon = {
  id?: number;
  order: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  types: string[];
  abilities: string[];
  sprites: {
    front_default: string | null;
    front_shiny: string | null;
  };
};

export default function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [newPokemon, setNewPokemon] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchPokemons() {
      try {
        const response = await axios.get("http://localhost:8080/pokemon");
        setPokemons(response.data);
      } catch (error) {
        console.error("Erro ao buscar pokémons:", error);
      }
    }
    fetchPokemons();
  }, []);

  const handleAddPokemon = async () => {
    if (!newPokemon.trim()) return;
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/pokemon", { name: newPokemon });
      setPokemons((prev) => [...prev, response.data]);
      setNewPokemon("");
    } catch (error: any) {
      if (error.response?.status === 404) {
        alert("Pokémon não encontrado!");
      } else {
        console.error("Erro ao adicionar pokémon:", error);
        alert("Erro ao adicionar Pokémon.");
      }
    } finally {
      setLoading(false);
    }
  };


  const handleDeletePokemon = async (id?: number) => {
    if (!id) return;
    try {
      await axios.delete("http://localhost:8080/pokemon", {
        data: { id },
      });
      setPokemons((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Erro ao deletar pokémon:", error);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full max-w-md">
        <h1 className="text-2xl font-bold">Pokémons</h1>

        <ul className="w-full list-none pl-0 space-y-2">
          {pokemons.map((pokemon: Pokemon) => (
            <li
              key={pokemon.id}
              className="flex items-center justify-between gap-3 bg-white p-2 rounded shadow"
            >
              <div className="flex items-center gap-3">
                {pokemon.sprites.front_default && (
                  <img
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    className="w-10 h-10"
                  />
                )}
                <Link href={`/pokemon/${pokemon.id}`} className="capitalize text-lg hover:underline">
                  {pokemon.name}
                </Link>
              </div>
              <button
                onClick={() => handleDeletePokemon(pokemon.id)}
                className="text-red-500 hover:text-red-700 text-xl"
                title="Excluir"
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>

        <div className="flex gap-2 w-full">
          <input
            type="text"
            value={newPokemon}
            onChange={(e) => setNewPokemon(e.target.value)}
            placeholder="Nome do Pokémon"
            className="flex-1 px-3 py-2 border rounded"
          />
          <button
            onClick={handleAddPokemon}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {loading ? "Adicionando..." : "Adicionar"}
          </button>
        </div>
      </main>
    </div>
  );
}
