import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'pokemons' })
export class Pokemon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'order', type: 'integer' })
  order: number;

  @Column({ name: 'name', type: 'text' })
  name: string;

  @Column({ name: 'height', type: 'integer' })
  height: number;

  @Column({ name: 'weight', type: 'integer' })
  weight: number;

  @Column({ name: 'base_experience', type: 'integer' })
  base_experience: number;

  @Column({ name: 'types', type: 'simple-array' })
  types: string[];

  @Column({ name: 'abilities', type: 'simple-array' })
  abilities: string[];

  @Column({ name: 'sprites', type: 'simple-json' })
  sprites: {
    front_default?: string | null;
    front_shiny?: string | null;
  };

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: string;
}