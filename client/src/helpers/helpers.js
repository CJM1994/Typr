export function getIndexes(arr) {
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