/*
// Функция, которая фетчит публичный API
function fetchCounries(searchQuery) {
  return fetch(`https://restcountries.com/v3.1/name/${searchQuery}`)
    .then(res => res.json())
    .then(data => data)
    .catch(error => console.log(`Smth wrong with request ${error}`));
}

// Экспорт функции во внешний код
export default fetchCounries;*/

const URL = 'https://restcountries.com/v3.1/name/';

export function fetchCountries(name) {
  const fields = ['name', 'capital', 'population', 'flags', 'languages'];

  return fetch(`${URL}${name}?fields=${fields.join(',')}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
