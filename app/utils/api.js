import axios from 'axios';

export function fetchPopularRepos(language) {
    var encodedURI = encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:') + encodeURIComponent(language) + encodeURI('&sort=stars&order=desc&type=Repositories');
    return axios.get(encodedURI)
        .then((response) => response.data.items);
}