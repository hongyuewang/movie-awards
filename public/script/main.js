nominationList = [];

$(document).ready( () => {
    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    });
});

function getMovies(searchText) {
    // Make request to OMDB API
    const apiKey = 'd57fefb0';
    axios.get('http://www.omdbapi.com?s='+ searchText + '&apikey=' + apiKey).then((response) => {
        //console.log(response);
        let movies = response.data.Search;
        let output = '';
        $.each(movies, (index, movie) => {
            output += `
            <div class="col-md-3">
                <div class="well text-center">
                    <img src="${movie.Poster}">
                    <h5>${movie.Title}</h5>
                    <a onclick="nominate('${movie.imdbID}')" class= "btn btn-primary" href="#">Nominate</a>
                </div>
            </div>
            `;
        });

        $('#movies').html(output);
    })
    .catch((err) => {
        console.log(err);
    });
}

function nominate(movieID) {
    nominationList.push(movieID);
    console.log(nominationList);
    console.log(nominationList.length);
    getNominations(nominationList);
}

function getNominations(list) {
    const apiKey = 'd57fefb0';
    list.forEach((id, i) => {
        axios.get('http://www.omdbapi.com?i='+ id + '&apikey=' + apiKey).then((response) => {
            console.log(response);
            let movie = response.data;
            let output = '';
                output += `
                <div class="col-md-3">
                    <div class="well text-center">
                        <img src="${movie.Poster}">
                        <h5>${movie.Title}</h5>
                        <a onclick="nominate('${movie}')" class= "btn btn-primary" href="#">Remove</a>
                    </div>
                </div>
                `;

            $('#nominations').html(output);
        });
    });

}
