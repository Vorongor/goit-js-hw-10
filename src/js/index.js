import { fetchBreeds, fetchCatByBreed } from "./cat-colection.js"
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
    const image = document.createElement('img');
    image.src = cat.imageUrl;
    image.classList.add('cat-picture')
    catInfo.innerHTML = '';

    const breedName = document.createElement('h2');
    breedName.textContent = `Breed: ${cat.breed}`;
    breedName.classList.add('breed-name');

    const description = document.createElement('p');
    description.textContent = `Description: ${cat.description}`;
    description.classList.add('description');


    const temperament = document.createElement('p');
    temperament.textContent = `Temperament: ${cat.temperament}`;
    temperament.classList.add('temperament');
    
    const textContainer = document.createElement('div');
    textContainer.append(breedName, description, temperament);

    const container = document.createElement('div');
    container.classList.add('container')

    container.append(image, textContainer);
    catInfo.appendChild(container);
  }

  // Отримання списку порід котів при завантаженні сторінки
  fetchBreeds()
   .then(breeds => {
     // Наповнення селекту опціями порід котів
     breeds.forEach(breed => {
       const option = document.createElement('option');
       option.value = breed.id;
       option.text = breed.name;
       breedSelect.appendChild(option);
     });

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
           Notiflix.Notify.failure('Помилка при отриманні інформації про кота:', error);
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



  