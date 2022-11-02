import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
// axios.defaults.baseURL = BASE_URL;

const API_KEY = '31038159-6af05e52325bfcde27c5dd046';
const options = {
  headers: {
    Authorisation: API_KEY,
  },
};

export class ImagesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImages() {
    axios.defaults.baseURL = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`;
    // const url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`;

    return axios.get().then(response => {
      console.log(response);
      return response.data;
    });
  }

  // fetchImages() {
  //   const url = `${BASE_URL}?q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`;

  //   return fetch(url, options)
  //     .then(response => response.json())
  //     .then(({ images }) => {
  //       this.incrementPage();

  //       return images;
  //     });
  // }

  incrementPage() {
    this.page += 1;
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
