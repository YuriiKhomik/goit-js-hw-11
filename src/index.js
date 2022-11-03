import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { ImagesApiService } from './partials/fetchImagesService';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

const imagesApiService = new ImagesApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

function onSearch(e) {
  e.preventDefault();

  imagesApiService.query = e.currentTarget.elements.searchQuery.value;

  if (imagesApiService.query === '') {
    return Notify.info('type smth');
  }

  imagesApiService.resetPage();
  imagesApiService.fetchImages().then(function (response) {
    if (response.data.hits.length < 1) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    clearImagesContainer();
    createImagesMarkup(response.data.hits);
  });
}

function onLoadMoreBtnClick() {
  imagesApiService.fetchImages().then(createImagesMarkup);
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
             <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
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
  //   refs.gallery.innerHTML = markup;
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

// function createImagesMarkup(images) {
//   const markup = images
//     .map(
//       ({
//         webformatURL,
//         largeImageURL,
//         tags,
//         likes,
//         views,
//         comments,
//         downloads,
//       }) => {
//         return `
//         <div class="photo-card">
//              <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
//             <div class="info">
//                 <p class="info-item">
//                     <b>Likes${likes}</b>
//                 </p>
//                 <p class="info-item">
//                     <b>Views${views}</b>
//                 </p>
//                 <p class="info-item">
//                     <b>Comments${comments}</b>
//                 </p>
//                 <p class="info-item">
//                     <b>Downloads${downloads}</b>
//                 </p>
//             </div>
//         </div>`;
//       }
//     )
//     .join('');
//   //   refs.gallery.innerHTML = markup;
// }

// function appendImagesMarkup(images) {
//     refs.gallery.insertAdjacentHTML('beforeend', createImagesMarkup(images));
// }

function clearImagesContainer() {
  refs.gallery.innerHTML = '';
}
