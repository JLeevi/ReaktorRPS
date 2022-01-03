export type Weapon = 'ROCK' | 'PAPER' | 'SCISSORS';

export type GameOutcome = 'A' | 'B' | 'DRAW';
export type RelativeGameOutcome = 'WIN' | 'LOSS' | 'DRAW';

export type PlayerResult = {
    name: string,
    played: Weapon
}

export type HistoryPlayerResult = PlayerResult & {
    outcome: RelativeGameOutcome
}

export type GameResult = {
    type: 'GAME_RESULT',
    gameId: string,
    t: number,
    playerA: PlayerResult,
    playerB: PlayerResult
}

export type GameBegin = {
    type: 'GAME_BEGIN',
    gameId: string,
    playerA: Omit<PlayerResult, 'played'>,
    playerB: Omit<PlayerResult, 'played'>
}

export type HistoryGame = {
    gameId: string,
    t: number,
    playerA: HistoryPlayerResult,
    playerB: HistoryPlayerResult
}

type LivePlayerData = {
    name: string,
    played?: string,
    outcome?: RelativeGameOutcome;
}

export type LiveGame = {
    isFinished: boolean,
    gameId: string,
    playerA: LivePlayerData,
    playerB: LivePlayerData,
}

export type LiveUpdate = {
    type: 'GAME_BEGIN' | 'GAME_RESULT',
    data: LiveGame
}

export type LiveInit = {
    type: 'INIT',
    data: LiveGame[]
}

export type LiveEvent = LiveInit | LiveUpdate;

export type HistoryPage = {
    cursor: string,
    data: GameResult[],
}

export type PlayerStats = {
    name: string,
    totalGames: number,
    wins: number,
    losses: number,
    draws: number,
    winRatio: number,
    rocks:number,
    papers: number,
    scissors: number,
    mostPlayed: Weapon,
    mostPlayedCount: number,
}

export type PlayerInfo = {
    name: string,
    id: string
}
