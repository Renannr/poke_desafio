import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { PokemonDTO } from './dto/pokemon.dto';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) { }

  @Post()
  async create(@Res() response: Response, @Body() pokemonDto: PokemonDTO) {
    const pokemon = await this.pokemonService.create(pokemonDto.name)
    return response.status(201).json(pokemon)
  }
  @Get()
  async list(@Res() response: Response) {
    const pokemons = await this.pokemonService.list()
    return response.status(200).json(pokemons)
  }

  @Get(':id')
  async listById(@Res() response: Response, @Param('id') id: number) {
    const pokemon = await this.pokemonService.listById(id)
    if (!pokemon) {
      throw new NotFoundException('Pokemon id não encontrado')
    }
    return response.status(200).json(pokemon)
  }

  @Put()
  async update(@Res() response: Response, @Body() pokemonDto: PokemonDTO) {
    try {
      if (!pokemonDto.id) {
        return response.status(400).json({ message: 'ID do Pokémon é obrigatório' });
      }

      const updated = await this.pokemonService.update(pokemonDto);

      return response.status(200).json(updated);
    } catch (error) {
      return response.status(500).json({
        message: 'Erro ao atualizar o Pokémon',
        error: error.message,
      });
    }
  }

  @Delete()
  async delete(@Res() response: Response, @Body('id') id: number) {
    try {
      const deleted = await this.pokemonService.delete(id);
      if (!deleted) {
        throw new NotFoundException(`Pokémon com id ${id} não encontrado.`);
      }

      return response.status(200).json({ message: `Pokémon ${id} deletado com sucesso.` });
    } catch (error) {
      return response.status(404).json({ message: 'Erro ao deletar Pokémon', error: error.message });
    }
  }
}
