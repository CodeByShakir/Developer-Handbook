import { movies } from "./main.js";
// console.log(movies);
if (!movies) return;

const watchlistMovies = document.getElementById("watchlist-movies");

/* ------ HTML ------ */
function getMoviesHTML(movie) {
  return `
      <div class="watchlist-movie">
        <div class="movie-img">
          <img src="${movie.Poster}" alt="${movie.Title}" />
        </div>
        <div class="movie-info">
          <div class="movie-info-header">
            <h2>${movie.Title}</h2>
            <div class="movie-rating">
              <i class="fa-solid fa-star star-color"></i>
              <p>${movie.imdbRating}</p>
            </div>
          </div>
          <div class="movie-info-body">
            <p>${movie.Runtime}</p>
            <p>${movie.Genre}</p>
            <button class="watchlist-button" data-movie="${movie.imdbID}">
              <i class="fa-solid fa-circle-plus"></i>
              Watchlist
            </button>
          </div>
          <div class="movie-info-footer">
            <p>${movie.Plot}</p>
          </div>
        </div>
      </div>
    `;
}

function getFeedHtml() {
  return movies && movies.map((movie) => getMoviesHTML(movie)).join("");
}
/* ------ Render ------ */

function renderMovieslist() {
  watchlistMovies.innerHTML = getFeedHtml();
}

renderMovieslist();
