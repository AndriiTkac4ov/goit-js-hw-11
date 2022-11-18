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