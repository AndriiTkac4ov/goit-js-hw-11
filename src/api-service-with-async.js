import getRefs from './get-refs';
const axios = require('axios').default;
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = getRefs();

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '31433732-587fed4cb039ee24c3149a17c';

export default class ImagesApiService {
    constructor(perPage = 40, searchQuery = '') {
        this.searchQuery = searchQuery;
        this.page = 1;
        this.perPage = perPage;
    }

    async fetchImages() {
        const URL =`${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.perPage}`;
        const response = await axios.get(URL);
        
        const { totalHits, hits } = response.data;

        this.page += 1;

        return { totalHits, hits };
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