const BASE_URL = 'https://pixabay.com/api';

function fetchPhotoes(searchingWord) {
    const API_KEY = '31433732-587fed4cb039ee24c3149a17c';
    const URL =`${BASE_URL}/?key=${API_KEY}&q=${searchingWord}&image_type=photo&orientation=horizontal&safesearch=true`;

    return fetch(URL).then(response => {
        if (!response.ok) {
            throw new Error(response.status);
        };
    
        return response.json();
    });
};

export default { fetchPhotoes };