/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
  name: String,
  totalGames: Number,
  wins: Number,
  losses: Number,
  draws: Number,
  winRatio: Number,
  rocks: Number,
  papers: Number,
  scissors: Number,
  mostPlayed: String,
  mostPlayedCount: Number,
});

playerSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Player = mongoose.model('Player', playerSchema);

export default Player;
