import getRefs from './get-refs';

const refs = getRefs();

refs.searchForm.addEventListener('submit', searchImages);

function searchImages(event) {
    event.preventDefault();

    console.log('Hello JS!!!')
}

function fetchPhotoArrayPromise(searchingWord) {
    const API_KEY = '31433732-587fed4cb039ee24c3149a17c';
    const q = searchingWord;
    const URL =`https://pixabay.com/api/?key=${API_KEY}&q=${q}&image_type=photo&orientation=horizontal&safesearch=true`;

    return fetch(URL).then(response => {
        if (!response.ok) {
            throw new Error(response.status);
        };
    
        return response.json();
    });
};

const flowersArray = fetchPhotoArrayPromise('flowers').then(ph => renderPhotoCard(ph.hits)).catch(error => console.log(error));

function renderPhotoCard(photoesArray) {
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