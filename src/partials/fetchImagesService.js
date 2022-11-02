const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '31038159-6af05e52325bfcde27c5dd046';
const options = {
  headers: {
    Authorisation: API_KEY,
  },
};

export class FetchImagesService {
  constructor() {
    this.searchQuery = '';
  }

  fetchImages() {
    const url = `${BASE_URL}?q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`;

    return fetch(url, options).then(response => response.json());
  }
}
