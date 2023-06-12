import { writeFile, readFile } from 'fs/promises';
import { PokemonType } from './types/pokemon.type';
import PokemonModel from './pokemon.schema'
import { TeamType } from '../teams/types/team.type';
import  TeamModel from '../teams/team.schema';
import { ErrorMessagePokemons } from './pokemon.errorMessage';

class PokemonService {
    async getPokemons(){
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=30");
        const data = await response.json();
        writeFile("pokemons.json", JSON.stringify(data.results, null, 2));        
        return data;
    }

    async mapPokemons(){
        const api = JSON.parse(await readFile("pokemons.json", "utf-8"))
        let list: PokemonType[] = [];

        list = api.map(async (pokemon) =>{
            let url = pokemon.url;
            const response = await fetch(url)
            const result = await response.json()
            console.log("aq")

            const pokeStats = result.stats.map((stats) =>{
                return {
                    value: stats.base_stat,
                    name: stats.stat.name,
                }
            })

            const pokeTypes = result.types.map((types) =>{
                return {
                    slot: types.slot,
                    name: types.type.name,
                }
            })
          
            let pokeMoves: any = [];
     
            while (pokeMoves.length < 4) {
                const i = Math.floor(Math.random() * result.moves.length);
                const randomMove = result.moves[i].move.name;
                if (!pokeMoves.includes(randomMove)) {
                    pokeMoves.push(randomMove);
                }
            }

            const PokeData = {
                name: result.forms[0].name,
                type: pokeTypes,
                stats: pokeStats,
                dex: result.game_indices[9].game_index,
                height: result.height,
                weight: result.weight, 
                moves: pokeMoves
            }
            return PokeData
        })
        const pokemonsData: PokemonType[] = await Promise.all(list)
        return pokemonsData 
    }

    async createPokemons(pokemonsData: PokemonType[]){
        if (pokemonsData.length == 0){
            return ErrorMessagePokemons.PARAM_NULL_POKEMONS
        }
        else {
            this.getPokemons()
            this.mapPokemons()
            await writeFile("pokeMaps.json", JSON.stringify(pokemonsData, null, 2));
            const createPokemons = await PokemonModel.insertMany(pokemonsData);
            return createPokemons
        }
    }

    async getPokemonsByType(type: String){
        const pokemons = await PokemonModel.find({'type.name': { $eq: type}})
        if(pokemons.length  === 0){
            return ErrorMessagePokemons.RETURN_NULL_TYPE
        }
        else{
            return pokemons
        }
        
    }

    async getPokemonByDex(dex: number){
        const pokemon = await PokemonModel.findOne({dex: dex})
        if(pokemon === null){
            return ErrorMessagePokemons.RETURN_NULL_DEX
        }
        else{
            return pokemon         
        }
   }

    async getPokemonByName(name: string){
        const pokemon = await PokemonModel.findOne({name: name})
        if(pokemon === null){
            return ErrorMessagePokemons.RETURN_NULL_NAME
        }
        else{
            return pokemon         
        }
    }

    async pokemonsByTypeAndDex() {
        const pokemons = JSON.parse(await readFile("pokeMaps.json", "utf-8"))
        
        const pokesType = pokemons.reduce((pokemonsType, currentPokemon) =>{    
            pokemonsType[currentPokemon.type.name] = pokemonsType[currentPokemon.type.name] || []
            pokemonsType[currentPokemon.type.name].push(currentPokemon)
            return pokemonsType
        }, {})

        await writeFile("pokeMapsType.json", JSON.stringify(pokesType, null, 2));
    }
}

export default new PokemonService()