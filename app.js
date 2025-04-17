const apiKey = 'fbe01fa6';
let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
let isDark = JSON.parse(localStorage.getItem('darkMode')) || false;

document.body.classList.toggle('dark', isDark);

function searchMovie() {
  const query = document.getElementById('movieInput').value.trim();
  if (!query) return;

  fetchMovie(query);
}

function fetchMovie(title) {
  fetch(`https://www.omdbapi.com/?t=${title}&apikey=${apiKey}`)
    .then(res => res.json())
    .then(data => {
      if (data.Response === "False") {
        document.getElementById('movieInfo').innerHTML = "Movie not found.";
        return;
      }

      document.getElementById('movieInfo').innerHTML = `
        <h3>${data.Title} (${data.Year})</h3>
        <img src="${data.Poster !== "N/A" ? data.Poster : ''}" alt="${data.Title}" />
        <p><strong>Genre:</strong> ${data.Genre}</p>
        <p><strong>Plot:</strong> ${data.Plot}</p>
        <p><strong>IMDb Rating:</strong> ${data.imdbRating}</p>
        <button onclick="addToWatchlist('${data.Title}')">Add to Watchlist</button>
      `;
    });
}

function getRandomMovie() {
  const randomTitles = [
    "Casablanca", "The Godfather", "Inception", "Amélie", "Moonlight",
    "Pride and Prejudice", "La La Land", "Midnight in Paris", "The Grand Budapest Hotel"
  ];
  const random = randomTitles[Math.floor(Math.random() * randomTitles.length)];
  fetchMovie(random);
}

function addToWatchlist(title) {
  if (!watchlist.includes(title)) {
    watchlist.push(title);
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    renderWatchlist();
  }
}

function removeFromWatchlist(title) {
  watchlist = watchlist.filter(t => t !== title);
  localStorage.setItem('watchlist', JSON.stringify(watchlist));
  renderWatchlist();
}

function renderWatchlist() {
  const list = document.getElementById('watchlist');
  list.innerHTML = '';
  watchlist.forEach(title => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${title}
      <button onclick="removeFromWatchlist('${title}')">Remove</button>
    `;
    list.appendChild(li);
  });
}

function toggleDarkMode() {
  isDark = !isDark;
  document.body.classList.toggle('dark', isDark);
  localStorage.setItem('darkMode', JSON.stringify(isDark));
}

renderWatchlist();
