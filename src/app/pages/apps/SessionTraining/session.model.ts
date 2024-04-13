import { User } from "../../authentication/model/login.model";
import { Role } from "../../authentication/model/Role.model";
import { Coach } from "../coach/coach.model";
import { Player } from "../player/player";
import { Scrims } from "../Scrims/Scrims.model";

export class Session {
    idSession: number;
  sessionName: string;
  dateStart: string; // Changed to string type if you are not converting dates from JSON
  dateEnd: string;   // Changed to string type if you are not converting dates from JSON
  objectifs: string[];
  feedbacksEntraineurs: string;
  presencePlayer: Player[];
  coach: Coach;
  coachName: string;
  playerNames: string;
  user:User;
  role:Role;
  username:string;
  player:Player;
  legalfullName:string;
  scrims:Scrims;
    // Other properties as needed
  }
  