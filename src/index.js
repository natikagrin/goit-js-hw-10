import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';
import {
  createCuntryListMarkup,
  createCuntryInfoMarkup,
} from './createMarkup';
const DEBOUNCE_DELAY = 300;
