nominationList = [];
searchText = '';

$(document).ready( () => {
    $('#searchForm').on('keyup', (e) => {
        document.getElementById("movies-header").innerHTML = "Results";
        document.getElementById("nominations-header").innerHTML = "Nominations";
        searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    });
});

function getMovies(searchText) {
    // Make request to OMDB API
    const apiKey = 'd57fefb0';
    axios.get('http://www.omdbapi.com?s='+ searchText + '&apikey=' + apiKey).then((response) => {
        console.log(response);
        let movies = response.data.Search;
        let output = '';
        $.each(movies, (index, movie) => {
            if (!nominationList.includes(movie.imdbID)) {
                output += `
                <div class="col-md-3">
                    <div class="well text-center">
                        <img src="${movie.Poster}">
                        <h5 class="movie-title">${movie.Title} (${movie.Year})</h5>
                        <a onclick="nominate('${movie.imdbID}')" class= "btn btn-primary btn-block" href="#">Nominate</a>
                    </div>
                </div>
                `;
            } else {
                output += `
                <div class="col-md-3">
                    <div class="well text-center">
                        <img src="${movie.Poster}">
                        <h5 class="movie-title">${movie.Title} (${movie.Year})</h5>
                    </div>
                </div>
                `;
            }
        });

        $('#movies').html(output);
    })
    .catch((err) => {
        console.log(err);
    });
}

function nominate(movieID) {
    nominationList.push(movieID);
    getNominations(nominationList);
    getMovies(searchText);
}

function getNominations(list) {
    const apiKey = 'd57fefb0';
    let output = '';
    $.each(list, (index, id) => {
        axios.get('http://www.omdbapi.com?i='+ id + '&apikey=' + apiKey).then((response) => {
            console.log(response);
            let movie = response.data;
            output += `
                <div class="col-md-3">
                    <div class="well text-center">
                        <img src="${movie.Poster}">
                        <h5 class="movie-title">${movie.Title} (${movie.Year})</h5>
                        <a onclick="remove('${movie.imdbID}')" class= "btn btn-primary btn-block" href="#">Remove</a>
                    </div>
                </div>
                `;

            $('#nominations').html(output);
        });
    });
    if (list.length == 0) {
        $('#nominations').empty();
    } else if (list.length == 5) {
        // Create banner
        location.replace("../banner.html");

    } else {
        return;
    }

}

function remove(movieID) {
    let pos = nominationList.findIndex(element => element.imdbID == movieID);
    nominationList.splice(pos, 1);
    console.log(nominationList.length);
    getNominations(nominationList);
    getMovies(searchText);
}
