import {jest, describe, test, expect} from '@jest/globals'
import pokemonService from '../src/pokemons/pokemon.service'
import { ErrorMessagePokemons } from '../src/pokemons/pokemon.errorMessage';
import PokemonModel from '../src/pokemons/pokemon.schema'
import { PokemonType } from '../src/pokemons/types/pokemon.type';

jest.mock('../src/pokemons/pokemon.schema')


describe('Cadastro de pokemons', () =>{
    test('Deve receber um array de pokemons vazio e retornar um erro ao tentar cadastrar', async ()=>{
        (PokemonModel.create as jest.Mock).mockImplementationOnce(() =>{
            throw new Error(ErrorMessagePokemons.PARAM_NULL_POKEMONS)
        })
        
        const pokemonData: PokemonType[] = [ ];
        const createPokemon = await pokemonService.createPokemons(pokemonData);
        expect(createPokemon).toBe(ErrorMessagePokemons.PARAM_NULL_POKEMONS);
    })
})


describe('Busca pokemons pelo nome', () => {
    test("Deve receber o nome de um pokémon não cadastrado e retornar um erro ao tentar buscar", async () =>{
        (PokemonModel.findOne as jest.Mock).mockReturnValue(null);
        const result = await pokemonService.getPokemonByName('pikachu')
        expect(result).toBe(ErrorMessagePokemons.RETURN_NULL_NAME);
    })
})

describe('Busca pokemons pela dex', () => {
    test("Deve receber o número da dex de um pokémon não cadastrado e retornar um erro ao tentar buscar", async () =>{
        (PokemonModel.findOne as jest.Mock).mockReturnValue(null);
        const result = await pokemonService.getPokemonByDex(0);
        expect(result).toBe(ErrorMessagePokemons.RETURN_NULL_DEX);
    })
})

describe('Busca pokemons pelo tipo', () => {
    test("Deve receber um tipo não cadastrado e retornar um erro ao tentar buscar", async () =>{
        (PokemonModel.find as jest.Mock).mockReturnValue([]);
        const result = await pokemonService.getPokemonsByType('pikachu')
        expect(result).toBe(ErrorMessagePokemons.RETURN_NULL_TYPE);
    })
})



