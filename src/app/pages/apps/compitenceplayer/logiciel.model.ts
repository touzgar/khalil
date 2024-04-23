import { Team } from "../team/team.model";

export class Logiciel{
    logicielId:number;
    logicielName:string;
    type:string;
    status:boolean;
    team:Team[];
    teamName:string;
}