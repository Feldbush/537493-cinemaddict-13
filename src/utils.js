import dayjs from 'dayjs';
import Component from './view/component';

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const SortType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`
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
  let nativeDate = new Date(getRandomInteger(1945, 2000), getRandomInteger(0, 11), getRandomInteger(0, 25));
  let date = dayjs(nativeDate);
  return date;
}

export function createElement(htmlString) {
  const tmpContainer = document.createElement(`div`);
  tmpContainer.innerHTML = htmlString;
  return tmpContainer.firstChild;
}

export function render(container, content, place = RenderPosition.BEFOREEND) {
  if (container instanceof Component) {
    container = container.getElement();
  }
  if (content instanceof Component) {
    content = content.getElement();
  }

  if (place === RenderPosition.AFTERBEGIN) {
    container.prepend(content);
  } else if (place === RenderPosition.BEFOREEND) {
    container.append(content);
  }
}

export function replace(newChild, oldChild) {
  if (oldChild instanceof Component) {
    oldChild = oldChild.getElement();
  }

  if (newChild instanceof Component) {
    newChild = newChild.getElement();
  }

  const parent = oldChild.parentElement;

  if (parent === null || oldChild === null || newChild === null) {
    throw new Error(`Can't replace unexisting elements`);
  }

  parent.replaceChild(newChild, oldChild);
}

export function remove(component) {
  if (component === null) {
    return;
  }

  if (!(component instanceof Component)) {
    throw new Error(`Can remove only components`);
  }

  component.getElement().remove();
  component.removeElement();
}

export function isEmptyData(data) {
  return !(Array.isArray(data) && data.length > 0);
}

export function updateItem(items, update) {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1)
  ];
}

function getWeightForNullProperty(propA, propB) {
  if (propA === null && propB === null) {
    return 0;
  }

  if (propA === null) {
    return 1;
  }

  if (propB === null) {
    return -1;
  }

  return null;
}

export function getDateDifference({releaseDate: dateA}, {releaseDate: dateB}) {
  const weight = getWeightForNullProperty(dateA, dateB);

  if (weight !== null) {
    return weight;
  }

  const difference = dayjs(dateA).diff(dayjs(dateB));

  return difference;
}

export function getRatingDifference({rating: ratingA}, {rating: ratingB}) {
  const weight = getWeightForNullProperty(ratingA, ratingB);

  if (weight !== null) {
    return weight;
  }

  return Number(ratingA - ratingB);
}


export function generateId() {
  return Date.now() + parseInt(Math.random() * 10000, 10);
}
