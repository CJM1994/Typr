function getIndexes(arr) {
  let lengths = [];
  
  for (let i = 0; i < arr.length; i++) {
    if (i === 0) {
      lengths.push([0, arr[i].length])
    } else {
      lengths.push([lengths[i - 1][1], arr[i].length + lengths[i - 1][1]])
    }
  }

  return lengths
};

function formatFromSeconds(seconds) {
  const hours = Math.round((seconds / 60 / 60));
  const minutes = Math.round((((seconds / 60 / 60) - hours) * 60));

  if (hours) {
    return `${hours}H ${minutes}M`;
  } else {
    return `${minutes}M`
  }
}

// Calculate score (accuracy 90, wpm 100, score will be 9000)
function calculateScore(wordsPerMinute, accuracy) {
  return (wordsPerMinute * accuracy)
}

module.exports = {formatFromSeconds, getIndexes, calculateScore}