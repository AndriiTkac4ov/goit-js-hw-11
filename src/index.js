import getRefs from './get-refs';
import API from './api-service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = getRefs();

refs.searchForm.addEventListener('submit', searchImages);

function searchImages(event) {
    event.preventDefault();

    console.log('Hello JS!!!')
}

const flowersArray = API.fetchPhotoes('flowers').then(renderPhotoCard).catch(onFetchError);

function renderPhotoCard(responseObject) {
    const photoesArray = responseObject.hits;
    const galleryMarkup = createPhotoMarkup(photoesArray);

    refs.galleryListEl.insertAdjacentHTML('beforeend', galleryMarkup);
};

function createPhotoMarkup(photoArray) {
    return photoArray
        .map(photo => {
            const { webformatURL, tags, likes, views, comments, downloads } = photo;

            return `
                <div class="photo-card">
                    <img src="${webformatURL}" alt="${tags}" loading="lazy" width="320px" height="210px"/>
                    <div class="info">
                        <p class="info-item">
                            <b>Likes</b>${likes}
                        </p>
                        <p class="info-item">
                            <b>Views</b>${views}
                        </p>
                        <p class="info-item">
                            <b>Comments</b>${comments}
                        </p>
                        <p class="info-item">
                            <b>Downloads</b>${downloads}
                        </p>
                    </div>
                </div>
            `
        })
        .join('');
};

function onFetchError(error) {
    Notify.failure("Sorry, there are no images matching your search query. Please try again.");
};