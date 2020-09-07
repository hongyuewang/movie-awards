listString = localStorage.getItem("nominations");
nominationList = listString.split(',');
console.log(nominationList);

const apiKey = 'd57fefb0';
let output = '';
$.each(nominationList, (index, id) => {
    axios.get('http://www.omdbapi.com?i='+ id + '&apikey=' + apiKey).then((response) => {
        console.log(response);
        let movie = response.data;
        output += `
            <div class="col-sm banner-col">
                <div class="well text-center banner-movie">
                    <img src="${movie.Poster}">
                    <h5 class="movie-title">${movie.Title} (${movie.Year})</h5>
                </div>
            </div>
            `;

        $('#banner-nominations').html(output);
    });
});
