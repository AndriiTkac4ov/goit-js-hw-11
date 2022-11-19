export default class ImagesApiService {
    constructor() {
        this.searchQuery = '';
    }

    fetchImages() {
        const BASE_URL = 'https://pixabay.com/api';
        const API_KEY = '31433732-587fed4cb039ee24c3149a17c';
        const URL =`${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=40`;

        return fetch(URL).then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            };
    
            return response.json();
        });
    }

    get query() {
        return this.searchQuery;
    }

    set query(newSearchQuery) {
        return this.searchQuery = newSearchQuery;
    }
};