export const getTotalReactionCount = (reactions) => {
  return reactions.reduce((total, reaction) => {
    return total + reaction.count;
  }, 0);
};
