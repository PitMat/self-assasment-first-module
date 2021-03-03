const apiURL = `http://api.tvmaze.com/schedule?country=`

    (async function () {
        try {
            const datas = await getMovies(apiURL, "US", "2020-03-03");
            getTime(datas)
        } catch (e) {
            console.error(e.message)
        }
    })();

async function getMovies(url = apiURL, country ='US', date = '2020-03-03') {
    const movieUrl = `${url}${country}&date=${date}`;
    const response = await fetch(movieUrl);
    if (response.ok) {
        return await response.json();
    } else {
        new Error(`Error:${response.statusText}`)
    }
}

function getTime(arr) {
    const arr1 = [];
    const reg = /^((1[89])|2[0-4])/gi;
    arr.filter(element => {
        element.airtime.match(reg) ? arr1.push(element) : element;
    })

    getCategories(arr1)
}

function getCategories(data) {
    const catArr = [];
    const regCat = /Comedy|Family|Travel/gi
    data.filter(element => {
        for (let elem of element.show.generes) {
            if (elem.match(regCat)) {
                catArr.push(element);
                return catArr
            }
        }
    })
    displayMovie(catArr);
}

function displayMovie(arr) {
    for (let element of arr) {
        const body = document.querySelector("body")
        const div = document.createElement("div");
        let hashtags;
        element.show.generes ? hashtags = element.show.generes.join("3") : hashtags = "";
        let countryTag;
        element.show.webChannel ? countryTag = element.show.webChannel.country.timezone : countryTag = "";
        div.innerHTML = `${element.name} ${element.show.name} ${hashtags} ${element.airdate} ${element.airtime}${countryTag}`;
        body.appendChild(div);
        const img = document.createElement('img');
        img.src = `${element.show.image.medium}`;
        body.appendChild(img)

    }
}