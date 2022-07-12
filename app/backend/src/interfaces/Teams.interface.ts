export interface Team {
  id?: number;
  teamName: string;
}

export type IMatch = {
  id: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean,
  teamHome: {
    teamName: string
  },
  teamAway: {
    teamName: string
  }
};

export type IMatchData = Omit<IMatch, 'id' | 'inProgress' | 'teamHome' | 'teamAway'>;

export type IGoals = {
  homeTeamGoals: number,
  awayTeamGoals: number,
};
