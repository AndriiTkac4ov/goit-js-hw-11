import getRefs from './get-refs';
import ImagesApiService from './api-service-with-async';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = getRefs();

refs.loadMoreBtn.classList.add('is-hidden');

refs.searchForm.addEventListener('submit', searchImages);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

const imagesApiService = new ImagesApiService();

function searchImages(event) {
    event.preventDefault();
    clearGallery();
    refs.loadMoreBtn.classList.remove('is-hidden');

    imagesApiService.query = event.currentTarget.elements.searchQuery.value;
    imagesApiService.resetPage();
    imagesApiService.fetchImages()
        .then(({ totalHits, hits }) => {
            if (hits.length > 0) {
                Notify.success(`Hooray! We found ${totalHits} images.`);
            };
            if (hits.length === 0) {
                Notify.warning("Sorry, there are no images matching your search query. Please try again.");
                refs.loadMoreBtn.classList.add('is-hidden');
            } else {
                renderGallery(hits);
            };
        })
        .catch(onFetchError);
};

function renderGallery(arrayForGallery) {
    const galleryMarkup = createGalleryMarkup(arrayForGallery);

    refs.galleryListEl.insertAdjacentHTML('beforeend', galleryMarkup);
};

function createGalleryMarkup(imagesArray) {
    return imagesArray
        .map(image => {
            const { webformatURL, tags, likes, views, comments, downloads } = image;

            return `
                <div class="photo-card">
                    <img src="${webformatURL}" alt="${tags}" loading="lazy" width="320px" height="210px"/>
                    <div class="info">
                        <p class="info-item">
                            <b>Likes</b><br/>${likes}
                        </p>
                        <p class="info-item">
                            <b>Views</b><br/>${views}
                        </p>
                        <p class="info-item">
                            <b>Comments</b><br/>${comments}
                        </p>
                        <p class="info-item">
                            <b>Downloads</b><br/>${downloads}
                        </p>
                    </div>
                </div>
            `
        })
        .join('');
};

function onLoadMore () {
    imagesApiService.fetchImages()
        .then(({ hits }) => {
            renderGallery(hits);
        })
        .catch (onFetchError);
};

function clearGallery() {
    refs.galleryListEl.innerHTML = '';
};

function onFetchError(error) {
    Notify.failure(error.message);
};