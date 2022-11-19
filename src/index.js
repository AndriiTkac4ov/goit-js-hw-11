import getRefs from './get-refs';
import ImagesApiService from './api-service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = getRefs();

refs.searchForm.addEventListener('submit', searchImages);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

const imagesApiService = new ImagesApiService();

function searchImages(event) {
    event.preventDefault();

    imagesApiService.query = event.currentTarget.elements.searchQuery.value;

    imagesApiService.fetchImages(searchQuery).then(renderGallery).catch(onFetchError);
}

function renderGallery(responseObject) {
    const arrayForGallery = responseObject.hits;
    const galleryMarkup = createGalleryMarkup(arrayForGallery);

    // if (arrayForGallery = []) {
    //     return Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    // };

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
    imagesApiService.fetchImages(searchQuery).then(renderGallery).catch(onFetchError);
};

function onFetchError(error) {
    Notify.failure(error);
};