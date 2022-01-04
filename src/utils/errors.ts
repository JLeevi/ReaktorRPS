const getFetchPlayerErrorMsg = (playerName: string) => `Server has not finished initializing 
  data for ${playerName}. Please try again in a few moments.`;

export default {
  getFetchPlayerErrorMsg,
};
