import { fetchBreeds, fetchCatByBreed } from './cat-colection.js';
import Notiflix from 'notiflix';

document.addEventListener('DOMContentLoaded', () => {
  const breedSelect = document.querySelector('.breed-select');
  const loader = document.querySelector('.loader');
  const error = document.querySelector('.error');
  const catInfo = document.querySelector('.cat-info');

  // Функція для відображення завантажувача
  function showLoader() {
    loader.style.display = 'block';
  }

  // Функція для приховування завантажувача
  function hideLoader() {
    loader.style.display = 'none';
  }

  // Функція для відображення повідомлення про помилку
  function showError() {
    error.style.display = 'block';
  }

  // Функція для приховування повідомлення про помилку
  function hideError() {
    error.style.display = 'none';
  }

  // Функція для очищення інформації про кота
  function clearCatInfo() {
    catInfo.innerHTML = '';
  }

  // Функція для створення картки з інформацією про кота
  function showCatInfo(cat) {
    const image = `
      <img src="${cat.imageUrl}" class="cat-picture">
    `;
    const breedName = `
      <h2 class="breed-name">Breed: ${cat.breedName}</h2>
    `;
    const description = `
      <p class="description">Description: ${cat.description}</p>
    `;
    const temperament = `
      <p class="temperament">Temperament: ${cat.temperament}</p>
    `;
    const textContainer = `
      <div>${breedName}${description}${temperament}</div>
    `;
    const container = `
      <div class="container">${image}${textContainer}</div>
    `;
    catInfo.innerHTML = container;
  }

  // Отримання списку порід котів при завантаженні сторінки
  fetchBreeds()
    .then(breeds => {
      // Наповнення селекту опціями порід котів
      const breedOptions = breeds.map(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.text = breed.name;
        return option;
      });
      breedSelect.append(...breedOptions);
      // Обробник події при виборі породи кота
      breedSelect.addEventListener('change', () => {
        const selectedBreedId = breedSelect.value;
        clearCatInfo();

        fetchCatByBreed(selectedBreedId)
          .then(cat => {
            showCatInfo(cat);
          })
          .catch(error => {
            showError();
            Notiflix.Notify.failure(
              'Помилка при отриманні інформації про кота:',
              error
            );
          })
          .finally(() => {
            hideLoader();
          });
      });
    })
    .catch(error => {
      showError();
      Notiflix.Notify.failure('Помилка при отриманні списку порід:', error);
    })
    .finally(() => {
      // Приховування завантажувача
      hideLoader();
      hideError();
    });
});
