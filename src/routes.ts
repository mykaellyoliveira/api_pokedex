import { Router } from "express";
import pokemonController from "./pokemons/pokemon.controller";
import teamController from "./teams/team.controller";
const routes = Router()


routes.post('/pokemons', pokemonController.createPokemon)
routes.post('/pokemons/types', pokemonController.mapPokemonsType)
routes.get('/pokemons/type=:type', pokemonController.findPokemonByType)
routes.get('/pokemons/dex=:dex', pokemonController.findPokemonByDex)
routes.get('/pokemons/name=:name', pokemonController.findPokemonByName)

routes.post('/team', teamController.createTeam)
routes.get('/team', teamController.findTeam)
routes.get('/team/:trainer', teamController.findTeamByTrainer)
routes.put('/team/:trainer', teamController.updateTeamByTrainer)
routes.delete('/team/:trainer', teamController.deleteTeamByTrainer)

export default routes