import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AxiosError } from 'axios';
import { firstValueFrom } from 'rxjs';
import { Repository } from 'typeorm';
import { PokemonDTO } from './dto/pokemon.dto';
import { Pokemon } from './pokemon.entity';

@Injectable()
export class PokemonService {
  constructor(
    private readonly httpService: HttpService,

    @InjectRepository(Pokemon)
    private readonly pokemonRepository: Repository<Pokemon>
  ) { }

  async create(name: string): Promise<Pokemon> {
    const pokemon = await this.pokemonRepository.findOne({ where: { name: name } })
    if (pokemon) {
      return pokemon
    }

    let newPokemon: PokemonDTO

    try {
      const { data } = await firstValueFrom(
        this.httpService.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      );

      const typeNames = data.types.map(t => t.type.name);
      const abilitiesNames = data.abilities.map(t => t.ability.name);

      newPokemon = {
        id: data.id,
        order: data.order,
        name: data.name,
        height: data.height,
        weight: data.weight,
        base_experience: data.base_experience,
        types: typeNames,
        abilities: abilitiesNames,
        sprites: {
          front_default: data.sprites.front_default,
          front_shiny: data.sprites.front_shiny,
        }
      };

    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 404) {
        throw new NotFoundException(`Pokémon "${name}" não existe ou não é encontrado na PokéAPI.`);
      }
      throw new Error('Erro ao consultar a PokéAPI');
    }

    return this.pokemonRepository.save(newPokemon);
  }

  list(): Promise<Pokemon[]> {
    return this.pokemonRepository.find()
  }

  listById(id: number): Promise<Pokemon | null> {
    return this.pokemonRepository.findOneBy({ id })
  }

  async update(pokemonDto: PokemonDTO): Promise<Pokemon> {
    const existingPokemon = await this.pokemonRepository.findOneBy({ id: pokemonDto.id });

    if (!existingPokemon) {
      throw new NotFoundException('Pokémon not found');
    }

    await this.pokemonRepository.update(existingPokemon.id, pokemonDto);
    const updatedPokemon = await this.pokemonRepository.findOneBy({ id: pokemonDto.id });

    if (!updatedPokemon) {
      throw new NotFoundException('Error retrieving updated Pokémon');
    }

    return updatedPokemon;
  }

  async delete(id: number) {
    const pokemon = await this.pokemonRepository.findOneBy({ id });
    if (!pokemon) {
      return false
    }
    return this.pokemonRepository.delete({ id });
  }
}
