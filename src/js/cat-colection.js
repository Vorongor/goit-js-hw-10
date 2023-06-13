const apiKey = 'live_NyTYIQ18qj6XnjGvUJMYHkddncj2ZTSRGxOgSOxcOOjMhiRf9nXjm7XsYf9nFFhe';

export function fetchBreeds() {
  const url = 'https://api.thecatapi.com/v1/breeds';

  return fetch(url, {
    headers: {
      'x-api-key':apiKey,
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch breeds');
    }
    return response.json();
  })
    .then(data => data.map(breed => ({ id: breed.id, name: breed.name })))
}

export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;

  return fetch(url, {
    headers: {
      'x-api-key': apiKey
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch breeds');
    }
    return response.json();
  })
    .then(data => {
      if (data.length > 0) {
        const cat = data[0];
        return {
          imageUrl: cat.url,
          breedName: cat.breeds[0].name,
          description: cat.breeds[0].description,
          temperament: cat.breeds[0].temperament
        };
      } else {
        throw new Error('Кота з такою породою не знайдено.');
      }
    })
}
