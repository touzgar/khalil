import { Team } from "../team/team.model";

export class Installation{
    installationId:number;
    installationName: string;
    type: string;
    disponibilite: boolean;
    capacite: number;
    teamName: string;
    team: Team[]; // Ensure this is an array
}