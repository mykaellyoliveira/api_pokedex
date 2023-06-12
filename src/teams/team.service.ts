import { writeFile, readFile } from 'fs/promises';
import PokemonModel from '../pokemons/pokemon.schema'
import { TeamType } from './types/team.type';
import  TeamModel from './team.schema';
import { ErrorMessageTeams } from './team.errorMessage';

class TeamService {
    async createTeams(teams : TeamType){
        const poketeam = await Promise.all(
            teams.team.map(async (poke) => {
                const pokemons = await PokemonModel.findOne({ name: poke.name });
                return pokemons
            })
        )
        const createTeam = await TeamModel.create({
            trainerName: teams.trainerName,
            team: poketeam
        });

        return createTeam
    }

    async findTeams(){
        const teams = await TeamModel.find().populate('team');
        return teams
    }

    async findTeamsByTrainer(trainer: string){
        if (trainer === null){
            return ErrorMessageTeams.RETURN_NULL_TRAINER
        }
        const team = await TeamModel.findOne({ trainerName: trainer }).populate('team');
        return team
    }

    async updateTeamsByTrainer(trainer: string, data: TeamType){
        const poketeam = await Promise.all(
            data.team.map(async (poke) => {
                const pokemons = await PokemonModel.findOne({ name: poke.name });
                return pokemons
            })
        )
        if (trainer === null){
            return ErrorMessageTeams.RETURN_NULL_TRAINER
        }
        else {
            const updatedTeam = await TeamModel.findOneAndUpdate({ trainerName: trainer}, {
                trainerName: data.trainerName,
                team: poketeam
            }, {new: true})
    
            return updatedTeam
        }
    }

    async deleteTeamsByTrainer(trainerName: string){
        if (trainerName === null){
            return ErrorMessageTeams.RETURN_NULL_TRAINER
        }else {
            await TeamModel.findOneAndDelete({ trainerName: trainerName})
            return "successfully deleted team!"
        
        }
    }
}

export default new TeamService()