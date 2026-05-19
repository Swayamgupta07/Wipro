let movieItems = [];
let favItems = [];

const createMovieList = () => {
    const moviesList = document.getElementById('moviesList');
    if (moviesList) {
        let html = '';
        movieItems.forEach(movie => {
            html = html + '<li class="movie-card">';
            html = html + '<div class="card-img-wrapper">';
            html = html + `<img src="${movie.posterPath}" class="movie-poster" `;
            html = html + `alt="${movie.title}"></div>`;
            html = html + '<div class="card-body">';
            html = html + `<h5 class="card-title">${movie.title}</h5>`;
            html = html + `<div class="release-date">Release Year: ${movie.releaseDate}</div>`;
            html = html + '<button class="btn-custom btn-add" ';
            html = html + `onclick="addFavourite('${movie.id}')">`;
            html = html + 'Add to Favourites</button>';
            html = html + '</div></li>';
        });
        moviesList.innerHTML = html;
    }
};

const createFavouriteList = () => {
    const favouritesList = document.getElementById('favouritesList');
    if (favouritesList) {
        let html = '';
        favItems.forEach(movie => {
            html = html + '<li class="movie-card fav-card">';
            html = html + '<div class="card-img-wrapper">';
            html = html + `<img src="${movie.posterPath}" class="movie-poster" `;
            html = html + `alt="${movie.title}"></div>`;
            html = html + '<div class="card-body">';
            html = html + `<h5 class="card-title">${movie.title}</h5>`;
            html = html + `<div class="release-date">Release Year: ${movie.releaseDate}</div>`;
            html = html + '<button class="btn-custom btn-remove" ';
            html = html + `onclick="removeFavourite('${movie.id}')">`;
            html = html + 'Remove Movie</button>';
            html = html + '</div></li>';
        });
        favouritesList.innerHTML = html;
    }
};

const getMovies = () => {
    return fetch('http://localhost:3000/movies')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(movies => {
            movieItems = movies;
            createMovieList();
            return movies;
        });
};

const getFavourites = () => {
    return fetch('http://localhost:3000/favourites')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(favourites => {
            favItems = favourites;
            createFavouriteList();
            return favourites;
        });
};

function isMoviePresentInFavItems(selectedMovieId) {
    return favItems.some(movie => String(movie.id) === String(selectedMovieId));
}

function getMovieById(id) {
    return movieItems.find(movie => String(movie.id) === String(id));
}

const postMovie = (myMovie) => {
    return fetch('http://localhost:3000/favourites', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(myMovie)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    });
};

function addFavourite(id) {
    if (isMoviePresentInFavItems(id)) {
        // eslint-disable-next-line no-alert
        alert('Movie is already added to favourites');
        return Promise.reject(new Error('Movie is already added to favourites'));
    }

    const movie = getMovieById(id);
    if (!movie) {
        return Promise.reject(new Error('Movie not found'));
    }

    return postMovie(movie)
    .then(addedMovie => {
        favItems.push(addedMovie);
        createFavouriteList();
        return favItems;
    });
}

const removeFavourite = (id) => {
    // eslint-disable-next-line no-alert
    if (!confirm('Do you want to delete or not?')) {
        return Promise.resolve(favItems);
    }
    return fetch(`http://localhost:3000/favourites/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(() => {
        favItems = favItems.filter(movie => String(movie.id) !== String(id));
        createFavouriteList();
        return favItems;
    });
};

if (typeof module !== 'undefined') {
    module.exports = {
        getMovies,
        getFavourites,
        addFavourite,
        removeFavourite
    };
}
