import { fetchBreeds, fetchCatByBreed } from "./cat-colection.js"

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

  // Функція для відображення інформації про кота
  function showCatInfo(cat) {
    const image = document.createElement('img');
    image.src = cat.url;
    catInfo.innerHTML = '';
    catInfo.appendChild(image);

    const breedName = document.createElement('p');
    breedName.textContent = `Breed: ${cat.breed}`;
    catInfo.appendChild(breedName);

    const description = document.createElement('p');
    description.textContent = `Description: ${cat.description}`;
    catInfo.appendChild(description);

    const temperament = document.createElement('p');
    temperament.textContent = `Temperament: ${cat.temperament}`;
    catInfo.appendChild(temperament);
  }

  // Функція для очищення інформації про кота
  function clearCatInfo() {
    catInfo.innerHTML = '';
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

        // Очищення інформації про кота
        clearCatInfo();

        // Виклик функції для отримання інформації про кота за обраною породою
        fetchCatByBreed(selectedBreedId)
          .then(cat => {
            // Відображення інформації про кота
            showCatInfo(cat);
          })
          .catch(error => {
            // Відображення повідомлення про помилку
            showError();
            console.error('Помилка при отриманні інформації про кота:', error);
          })
          .finally(() => {
            // Приховування завантажувача
            hideLoader();
          });
      });
    })
    .catch(error => {
      // Відображення повідомлення про помилку
      showError();
      console.error('Помилка при отриманні списку порід:', error);
    })
    .finally(() => {
      // Приховування завантажувача
      hideLoader();
    });
});
