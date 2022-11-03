import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { ImagesApiService } from './partials/fetchImagesService';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
  loadMoreContainer: document.querySelector('.load-more-contsiner'),
};

const imagesApiService = new ImagesApiService();
let simpleLightBox = new SimpleLightbox('.photo-card a');

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

async function onSearch(e) {
  e.preventDefault();
  clearImagesContainer();
  imagesApiService.loadedQuantity = 0;
  imagesApiService.resetPage();

  imagesApiService.query = e.currentTarget.elements.searchQuery.value;

  if (imagesApiService.query === '') {
    return Notify.info('type smth');
  }

  try {
    const { data } = await imagesApiService.fetchImages();
    if (!data.hits.length) {
      return Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    //   console.log(response.data.totalHits);
    //   console.log(response.data.hits);
    imagesApiService.loadedQuantity = data.hits.length;
    totalHitsNotify(data.totalHits);

    hideLoadMoreButton();

    createImagesMarkup(data.hits);
    if (data.totalHits >= imagesApiService.loadQuantity) {
      showLoadMoreButton();
    }
  } catch (error) {
    console.log(error);
  }
}

function showLoadMoreButton() {
  refs.loadMoreContainer.classList.remove('is-hidden');
}

function hideLoadMoreButton() {
  refs.loadMoreContainer.classList.add('is-hidden');
}

async function onLoadMoreBtnClick() {
  try {
    const { data } = await imagesApiService.fetchImages();
    let maxQuantity = data.totalHits;

    imagesApiService.loadedQuantity += data.hits.length;
    createImagesMarkup(data.hits);

    if (imagesApiService.loadedQuantity >= maxQuantity) {
      Notify.info("We're sorry, but you've reached the end of search results.");
      hideLoadMoreButton();
    }
  } catch (error) {
    console.log(error);
  }
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
             <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" width="300" height="200" /></a>
            <div class="info">
                <p class="info-item">
                    <b>Likes ${likes}</b>
                </p>
                <p class="info-item">
                    <b>Views ${views}</b>
                </p>
                <p class="info-item">
                    <b>Comments ${comments}</b>
                </p>
                <p class="info-item">
                    <b>Downloads ${downloads}</b>
                </p>
            </div>
        </div>`;
      }
    )
    .join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  simpleLightBox.refresh();
}

function clearImagesContainer() {
  refs.gallery.innerHTML = '';
}

function totalHitsNotify(total) {
  if (total === 0) return;
  Notify.info(`Hooray! We found ${total === 500 ? 520 : total} images.`);
}
