const calcForShuffle = ({
  currentTrackIndex,
  shuffleOrder,
  removedByIndex,
  isRepeat,
}) => {
  let nextIndex = currentTrackIndex;
  let shuffleIndex = shuffleOrder.indexOf(currentTrackIndex);
  const lastShuffleIndex = shuffleOrder.length - 1;
  do {
    if (shuffleIndex < lastShuffleIndex) {
      shuffleIndex = parseInt(shuffleIndex, 10);
      shuffleIndex += 1;
      nextIndex = shuffleOrder[shuffleIndex];
    } else
    if (isRepeat) {
      [nextIndex] = shuffleOrder;
    } else {
      nextIndex = null;
    }
  } while (nextIndex !== null && removedByIndex[nextIndex] === true);
  if (nextIndex === null) return nextIndex;
  return `${nextIndex}`;
};

const calcForDefault = ({
  tracksLength,
  currentTrackIndex,
  removedByIndex,
  isRepeat,
}) => {
  let nextIndex = currentTrackIndex;
  const lastTrackIndex = tracksLength - 1;
  do {
    if (nextIndex < lastTrackIndex) {
      nextIndex = parseInt(nextIndex, 10);
      nextIndex += 1;
    } else
    if (isRepeat) {
      nextIndex = 0;
    } else {
      nextIndex = null;
    }
  } while (nextIndex !== null && removedByIndex[nextIndex] === true);
  if (nextIndex === null) return nextIndex;
  return `${nextIndex}`;
};

const calcNextTrackIndex = (state) => {
  const {
    isShuffle,
    tracksLength,
    removedLength,
  } = state;
  if (removedLength + 1 === tracksLength) return null;
  if (isShuffle) {
    return calcForShuffle(state);
  }
  return calcForDefault(state);
};

export default calcNextTrackIndex;
