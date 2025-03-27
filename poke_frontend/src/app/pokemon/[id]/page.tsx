"use client";

import { Pokemon } from "@/app/page";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PokemonDetails() {
  const { id } = useParams();
  const router = useRouter();

  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const response = await axios.get<Pokemon>(`http://localhost:8080/pokemon/${id}`);
        setPokemon(response.data);
      } catch (error) {
        console.error("Erro ao carregar Pokémon:", error);
      }
    }

    if (id) fetchPokemon();
  }, [id]);

  const handleUpdate = async () => {
    if (!pokemon || !pokemon.id) return;
    setLoading(true);
    try {
      await axios.put("http://localhost:8080/pokemon", pokemon);
      alert("Pokémon atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar Pokémon:", error);
      alert("Erro ao atualizar Pokémon.");
    } finally {
      setLoading(false);
    }
  };

  if (!pokemon) return <p>Carregando...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg flex flex-col items-center text-center space-y-6">
        <h1 className="text-3xl font-bold capitalize">{pokemon.name}</h1>
        <div className="flex justify-center gap-4">
          {pokemon.sprites.front_default && (
            <img
              src={pokemon.sprites.front_default}
              alt="Front Default"
              className="w-24 h-24"
            />
          )}
          {pokemon.sprites.front_shiny && (
            <img
              src={pokemon.sprites.front_shiny}
              alt="Front Shiny"
              className="w-24 h-24"
            />
          )}
        </div>
        <div className="w-full">
          <h2 className="text-xl font-semibold mb-2">Habilidades</h2>
          <ul className="list-disc list-inside text-left inline-block">
            {pokemon.abilities.map((ability, index) => (
              <li key={index} className="capitalize">
                {ability}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4 w-full">
          <label className="block text-left">
            Nome:
            <input
              type="text"
              value={pokemon.name}
              onChange={(e) => setPokemon({ ...pokemon, name: e.target.value })}
              className="w-full p-2 border rounded mt-1"
            />
          </label>

          <label className="block text-left">
            Altura:
            <input
              type="number"
              value={pokemon.height}
              onChange={(e) =>
                setPokemon({ ...pokemon, height: +e.target.value })
              }
              className="w-full p-2 border rounded mt-1"
            />
          </label>

          <label className="block text-left">
            Peso:
            <input
              type="number"
              value={pokemon.weight}
              onChange={(e) =>
                setPokemon({ ...pokemon, weight: +e.target.value })
              }
              className="w-full p-2 border rounded mt-1"
            />
          </label>

          <label className="block text-left">
            Base Experience:
            <input
              type="number"
              value={pokemon.base_experience}
              onChange={(e) =>
                setPokemon({
                  ...pokemon,
                  base_experience: +e.target.value,
                })
              }
              className="w-full p-2 border rounded mt-1"
            />
          </label>

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            {loading ? "Salvando..." : "Salvar"}
          </button>
          <div className="flex gap-4 mt-4 justify-center">
            <button
              onClick={async () => {
                if (!pokemon?.id) return;
                const confirm = window.confirm(`Tem certeza que deseja excluir ${pokemon.name}?`);
                if (!confirm) return;

                try {
                  await axios.delete(`http://localhost:8080/pokemon`, {
                    data: { id: pokemon.id },
                  });
                  alert("Pokémon excluído!");
                  window.location.href = "/";
                } catch (err) {
                  console.error("Erro ao excluir Pokémon:", err);
                  alert("Erro ao excluir Pokémon.");
                }
              }}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Excluir
            </button>

            <button
              onClick={() => window.location.href = "/"}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            >
              Voltar para Pokédex
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
