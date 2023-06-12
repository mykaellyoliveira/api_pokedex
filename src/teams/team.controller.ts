import { Request, Response} from 'express'
import teamService from './team.service';

class TeamController{
    async createTeam(req: Request, res: Response){
        const pokemons = await teamService.createTeams(req.body)
        return res.status(201).send(pokemons)
    }

    async findTeam(req: Request, res: Response){
        const teams = await teamService.findTeams()
        return res.status(200).json(teams)
    }

    async findTeamByTrainer(req: Request, res: Response){
        const team = await teamService.findTeamsByTrainer(req.params.trainer)
        return res.status(200).json(team)
    }

    async updateTeamByTrainer(req: Request, res: Response){
        const team = await teamService.updateTeamsByTrainer(req.params.trainer, req.body)
        return res.status(200).json(team)
    }

    async deleteTeamByTrainer(req: Request, res: Response){
        const deleteStatus = await teamService.deleteTeamsByTrainer(req.params.trainer)
        return res.status(200).json(deleteStatus)
    }
}

export default new TeamController();
  