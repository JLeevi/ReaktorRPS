export type Weapon = "ROCK" | "PAPER" | "SCISSORS";
type RelativeGameOutcome = "WIN" | "LOSS" | "DRAW";

export type PlayerResult = {
  name: string;
  played: Weapon;
};

export type GameResult = {
  type: "GAME_RESULT";
  gameId: string;
  t: number;
  playerA: PlayerResult;
  playerB: PlayerResult;
};

export type GameBegin = {
  type: "GAME_BEGIN";
  gameId: string;
  playerA: Omit<PlayerResult, "played">;
  playerB: Omit<PlayerResult, "played">;
};

type LivePlayerData = {
  name: string;
  played?: string;
  outcome?: RelativeGameOutcome;
};

export type LiveGame = {
  isFinished: boolean;
  gameId: string;
  playerA: LivePlayerData;
  playerB: LivePlayerData;
};

export type LiveUpdate = {
  type: "GAME_BEGIN" | "GAME_RESULT";
  data: LiveGame;
};

export type LiveInit = {
  type: "INIT";
  data: LiveGame[];
};

export type LiveEvent = LiveInit | LiveUpdate;

export type HistoryPage = {
  cursor: string;
  data: GameResult[];
};

export type PlayerStats = {
  name: string;
  totalGames: number;
  winRatio: number;
  mostPlayed: Weapon;
  mostPlayedCount: number;
};

export type PlayerData = {
  name: string;
  history: GameResult[];
  stats: PlayerStats;
};
