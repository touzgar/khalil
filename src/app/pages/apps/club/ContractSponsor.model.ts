import { User } from "../../authentication/model/login.model";
import { Role } from "../../authentication/model/Role.model";
import { Team } from "../team/team.model";

export class ContractSponsor{
    idSponsorContract:number;
    sponsorContractName:string;
    dateStart:Date;
    dateEnd:Date;
    objectif:string;
    team: Team[];
    user:User[];
    role: Role[];
    teamName: string; // Add this field
  sponsorName: string; // Add this field
  sponsorUsername: string;
}