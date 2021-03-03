const apiURL = `https://api.tvmaze.com`;

(async function() {
    try {
        const datas = await getMovies("US", "2020-03-03");
        getFilteredData(datas)
    } catch (e) {
        console.error(e.message)
    }
})();

async function getMovies(country = 'US', date = '2020-03-03') {
    const movieUrl = `${apiURL}/schedule?country=${country}&date=${date}`;
    const response = await fetch(movieUrl);
    if (response.ok) {
        return await response.json();
    }
    new Error(`Error:${response.statusText}`)
}

function getFilteredData(videos) {
    const result = videos.filter(video => {
        if (isProperTime(video) && isCategory(video.show.genres)) return video
    });
    displayMovie(result);
}

function isProperTime(element) {
    const reg = /^((1[89])|2[0-4])/gi;
    return element.airtime.match(reg);
}

function isCategory(genres) {
    const regCat = /Comedy|Family|Travel/gi
    for (let elem of genres) {
        if (elem.match(regCat)) {
            return true;
        }
    }
    return false;

}

function displayMovie(movies) {
    for (let movie of movies) {
        const body = document.querySelector("body")
        const div = document.createElement("div");
        movie.show.genres.map((genre, index) => { movie.show.genres[index] = `#${genre}` });

        let countryTag = movie.show.webChannel ? movie.show.webChannel.country.timezone : "";
        div.innerHTML = `${movie.name} ${movie.show.name} ${movie.show.genres.join(', ')} ${movie.airdate} ${movie.airtime}${countryTag}`;
        body.appendChild(div);
        const img = document.createElement('img');
        img.src = `${movie.show.image.medium}`;
        body.appendChild(img)
    }
}