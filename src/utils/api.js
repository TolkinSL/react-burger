const BASE_URL = 'https://norma.nomoreparties.space/api';

export const getIngredients = async () => {
  return await fetch(`${BASE_URL}/ingredients`)
      .then((res) => checkResponse(res));
};

export const getOrder = (itemsId) => {
  return fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      "ingredients": itemsId
    })
  })
      .then((res) => checkResponse(res));
};

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};