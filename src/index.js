// import Notiflix from 'notiflix';
// import './css/styles.css';



// const DEBOUNCE_DELAY = 300;
import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './js/fetch';
import { countryListTemplate } from './js/coutryList';
import { countryInfoTemplate } from './js/coutryInfo';


const DEBOUNCE_DELAY = 300;
const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');


const searchParams = 'fields=name,capital,population,flags,languages';

searchBox.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

function onInputSearch(event) {
  const country = event.target.value.trim();

  if (country === '') {
    clearMarkup();
    return;
  }
  fetchCountries(`${country}?${searchParams}`)
    .then(renderMarkup)
    .catch(() => {
      clearMarkup();
      Notify.failure('Oops, there is no country with that name');
    });
}

function renderMarkup(countries) {
  if (countries.length > 10) {
    clearMarkup();
    Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  }

  if (countries.length === 1) {
    countryInfo.innerHTML = countryInfoTemplate(countries[0]);
    countryList.innerHTML = '';
    return;
  }

  countryInfo.innerHTML = '';
  countryList.innerHTML = countryListTemplate(countries);
}

function clearMarkup() {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
}


