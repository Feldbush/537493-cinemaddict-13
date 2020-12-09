export function getRandomInteger(a = 0, b = 1) {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));

}

export function getRandomArrayElement(array) {
  return array[getRandomInteger(0, array.length - 1)];
}

export function getRandomElementsArray(array, maxQuantityTry = 5) {
  const resultArray = [];
  for (let index = 0; index < maxQuantityTry; index++) {
    let element = getRandomArrayElement(array);
    if (element !== undefined) {
      resultArray.push(element);
    }
  }
  return resultArray;
}
