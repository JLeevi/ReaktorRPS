/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import mongoose from 'mongoose';

// fields "playerAName" and "playerBName"
// are used for indexing / querying of games only.

// _id field is a custom string created from game's
// timestamp 't' to allow for efficient sorting and pagination

const playerGameSchema = new mongoose.Schema({
  _id: String,
  playerAName: {
    type: String,
    index: true,
  },
  playerBName: {
    type: String,
    index: true,
  },
  gameId: String,
  t: Number,
  playerA: {
    name: String,
    played: String,
    outcome: String,
  },
  playerB: {
    name: String,
    played: String,
    outcome: String,
  },
});

playerGameSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.playerAName;
    delete returnedObject.playerBName;
  },
});

const PlayerGame = mongoose.model('PlayerGame', playerGameSchema);

export default PlayerGame;
