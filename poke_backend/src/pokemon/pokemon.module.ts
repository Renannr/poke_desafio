import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokemonController } from './pokemon.controller';
import { Pokemon } from './pokemon.entity';
import { PokemonService } from './pokemon.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pokemon]),
    HttpModule
  ],
  providers: [PokemonService],
  controllers: [PokemonController],
  exports: [PokemonService],
})
export class PokemonModule { }
