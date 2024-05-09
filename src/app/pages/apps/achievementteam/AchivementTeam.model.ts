import { Team } from '../team/team.model';

export class AchievementTeam {
  achivementId: number;
  trophies: string[] = []; // Correct field name
  dateAchived: Date;
  achievementRank: string; // Correct field name
  teamName: string; // Included for binding
  team: Team;
}


