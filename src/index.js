import getRefs from './get-refs';

const refs = getRefs();

refs.searchForm.addEventListener('submit', searchImages);

console.log(refs.searchInput)
console.log(refs.searchBtn)
console.log(refs.searchForm)

function searchImages(event) {
    event.preventDefault();

    console.log('Hello JS!!!')
}

function fetchPhotoArrayPromise(saerchingWord) {
    const url =`https://pixabay.com/api/?key=31433732-587fed4cb039ee24c3149a17c&q=flowers&image_type=photo`;

    return fetch(url).then(response => {
        if (!response.ok) {
            throw new Error(response.status);
        }
    
        return response.json();
    });
}

fetchPhotoArrayPromise().then(ph=>console.log('Dont STOP!!!'))

function renderPhotoCard(photoArray) {
    const galleryMarkup = createPhotoMarkup(galleryItems);

    refs.galleryListEl.insertAdjacentHTML('beforeend', galleryMarkup);
};


// // webformatURL - посилання на маленьке зображення для списку карток.
// // largeImageURL - посилання на велике зображення.
// // tags - рядок з описом зображення. Підійде для атрибуту alt.
// // likes - кількість лайків.
// // views - кількість переглядів.
// // comments - кількість коментарів.
// // downloads - кількість завантажень.


function createPhotoMarkup(photoArray) {
    return photoArray
        .map(photo => {
            const { webformatURL, tags, likes, views, comments, downloads } = photo;

            return `
                <div class="photo-card">
                    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
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
            `
        })
        .join('');
};