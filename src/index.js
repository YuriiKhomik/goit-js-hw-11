import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { ImagesApiService } from './partials/fetchImagesService';

const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
};

const imagesApiService = new ImagesApiService();

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();

  imagesApiService.query = e.currentTarget.elements.searchQuery.value;

  if (imagesApiService.query === '') {
    return Notify.info('type smth');
  }

  imagesApiService.fetchImages();
}

function clearImagesContainer() {
  refs.gallery.innerHTML = '';
}
