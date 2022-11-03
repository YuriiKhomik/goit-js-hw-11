import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '31038159-6af05e52325bfcde27c5dd046';

export class ImagesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.loadQuantity = 6;
    this.loadedQuantity = this.loadQuantity;
  }

  fetchImages() {
    axios.defaults.baseURL = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${this.loadQuantity}&page=${this.page}`;

    this.incrementPage();

    return axios.get();
  }

  incrementPage() {
    this.page += 1;
  }

  incrementLoadedQuantity() {
    this.loadedQuantity += this.loadQuantity;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
