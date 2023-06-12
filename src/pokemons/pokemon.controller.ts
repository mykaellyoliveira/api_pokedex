import { Request, Response} from 'express'
import pokemonService from './pokemon.service';

class PokemonController{
  
    async createPokemon(req: Request, res: Response){
        const pokemonsList = await pokemonService.mapPokemons()
        const pokemons = await pokemonService.createPokemons(pokemonsList)
        return res.status(201).send(pokemons)
    }

    async mapPokemonsType(req: Request, res: Response){
        const pokemons = await pokemonService.pokemonsByTypeAndDex();
        return res.status(201).send(pokemons)
    }
    async findPokemonByType(req: Request, res: Response){
        const pokemons = await pokemonService.getPokemonsByType(req.params.type)
        return res.status(200).json(pokemons)
    }

    async findPokemonByDex(req: Request, res: Response){
        const dex =  Number(req.params.dex);
        const pokemon = await pokemonService.getPokemonByDex(dex)
        return res.status(200).json(pokemon)
    }

    async findPokemonByName(req: Request, res: Response){
        const pokemon = await pokemonService.getPokemonByName(req.params.name)
        return res.status(200).json(pokemon)
    }

}

export default new PokemonController();