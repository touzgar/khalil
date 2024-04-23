import { Team } from "../team/team.model";

export class Materiel{
    materielId:number;
    materielName:string;
    type:string;
    status:boolean;
    team:Team;
    teamName:string;
}