import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';
import {
  createCuntryListMarkup,
  createCuntryInfoMarkup,
} from './createMarkup';
const DEBOUNCE_DELAY = 300;
const refs = {
  searchInput: window['search-box'],
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.searchInput.addEventListener(
  'input',
  debounce(onSearchInput, DEBOUNCE_DELAY)
);

function onSearchInput(e) {
  const searchText = e.target.value.trim();

  if (searchText === '') {
    clearCuntryList();
    clearCountryInfo();
    return;
  }

  fetchCountries(searchText)
    .then(result => {
      if (result.length > 10) {
        clearCuntryList();
        clearCountryInfo();
        Notify.info(
          'Too many matches found. Please enter a more specific name'
        );
      } else if (result.length === 1) {
        clearCuntryList();
        renderCountryInfo(result);
      } else if (result.length <= 10) {
        clearCountryInfo();
        renderCountryList(result);
      }
    })
    .catch(() => {
      clearCuntryList();
      clearCountryInfo();
      Notify.failure('Oops, there is no country with that name');
    });
}

function renderCountryInfo(countries) {
  refs.countryInfo.innerHTML = createCuntryInfoMarkup(countries);
}

function renderCountryList(countries) {
  refs.countryList.innerHTML = createCuntryListMarkup(countries);
}

function clearCuntryList() {
  refs.countryList.innerHTML = '';
}

function clearCountryInfo() {
  refs.countryInfo.innerHTML = '';
}
