import dayjs from 'dayjs';

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

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

export function getRandomDate() {
  return dayjs().add(getRandomInteger(1, 9), `day`).valueOf();
}

export function createElement(htmlString) {
  const tmpContainer = document.createElement(`div`);
  tmpContainer.innerHTML = htmlString;
  return tmpContainer.firstChild;
}

export function render(container, content, place = RenderPosition.BEFOREEND) {
  if (place === RenderPosition.AFTERBEGIN) {
    container.prepend(content);
  } else if (place === RenderPosition.BEFOREEND) {
    container.append(content);
  }
}

export function isEmptyData(data) {
  return !(Array.isArray(data) && data.length > 0);
}
