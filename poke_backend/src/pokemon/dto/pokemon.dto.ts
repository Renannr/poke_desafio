export class PokemonDTO {
  readonly id?: number;
  readonly order: number;
  readonly name: string;
  readonly height: number;
  readonly weight: number;
  readonly base_experience: number;
  readonly types: string[];
  readonly abilities: string[];
  readonly sprites: {
    front_default: string | null;
    front_shiny: string | null;
  };
}
