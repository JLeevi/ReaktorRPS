import { GameResult } from '../types';

const getGameSearchFilter = (playerName: string, cursor?: string) => {
  const playerFilter = {
    $or: [
      { playerAName: playerName },
      { playerBName: playerName },
    ],
  };
  const paginationFilter = { _id: { $lt: cursor } };
  const filter = cursor ? { ...playerFilter, ...paginationFilter } : playerFilter;
  return filter;
};

const getNextCursor = (documents: any[]) => {
  try {
    const lastDocument = documents[documents.length - 1];
    const nextCursor: string = lastDocument.id;
    return nextCursor;
  } catch {
    return undefined;
  }
};

const generateGameDocumentId = (result: GameResult) => `${result.t.toString()}${result.gameId}`;

export default {
  getGameSearchFilter,
  getNextCursor,
  generateGameDocumentId,
};
