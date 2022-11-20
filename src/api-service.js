import getRefs from './get-refs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = getRefs();

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '31433732-587fed4cb039ee24c3149a17c';
const perPage = 40;

export default class ImagesApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    fetchImages() {
        const URL =`${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${perPage}`;

        return fetch(URL)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.status);
                };
    
                return response.json();
            })
            .then(data => {
                this.page += 1;
                const { totalHits, hits } = data;
                if (totalHits / (this.page - 1) < perPage && hits.length !== 0) {
                    refs.loadMoreBtn.classList.add('is-hidden');
                    Notify.info("We're sorry, but you've reached the end of search results.");
                };

                return { totalHits, hits };
            });
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newSearchQuery) {
        return this.searchQuery = newSearchQuery;
    }
}