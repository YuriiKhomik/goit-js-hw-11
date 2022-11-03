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

  imagesApiService.resetPage();

  imagesApiService
    .fetchImages()
    .then(response => createImagesMarkup(response.data.hits));
}

function clearImagesContainer() {
  refs.gallery.innerHTML = '';
}

function createImagesMarkup(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
        <div class="photo-card">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info">
                <p class="info-item">
                    <b>Likes${likes}</b>
                </p>
                <p class="info-item">
                    <b>Views${views}</b>
                </p>
                <p class="info-item">
                    <b>Comments${comments}</b>
                </p>
                <p class="info-item">
                    <b>Downloads${downloads}</b>
                </p>
            </div>
        </div>`;
      }
    )
    .join('');
  refs.gallery.innerHTML = markup;
}
