
let audio = new Audio('star-wars-theme-song.mp3');

let moviesUl = $('#movies ul');
moviesUl.find('li').remove();

$.ajax({
    url: 'https://swapi.co/api/films/',
    method: 'GET',
    success: function(response) {      
      let results = order_movies ( response.results );
      results.forEach(add_movies);
      moviesUl.find('li').click(getMovieIntro);
    }
  });


function add_movies ( movie ){
    moviesUl.append("<li data-url-episodio='"+ movie.url + "'>Episode "+ convertToRoman(movie.episode_id) + ": " + movie.title + '</li>');
}

function order_movies( movies ){
    movies = movies.sort(function (a, b) {
        return a.episode_id - b.episode_id ;
    });
    return movies;
}

function getMovieIntro(e){
    audio.play();
    let movieTarget = $(e.currentTarget);
    let urlTarget = movieTarget.data('url-episodio');
    updateIntroMovie(urlTarget);
}

function updateIntroMovie(url){
    $.ajax({
        url: url,
        method: 'GET',
        success: function(response) {      
          let movieTxt = 'Episode ' + convertToRoman(response.episode_id) + '\n' +
                      response.title.toUpperCase() + '\n\n' +
                      response.opening_crawl;
          $('.container .flow .reading-animation ').text(movieTxt);
        }
      }); 
}

function convertToRoman(number) {
    const listRoman = [null, 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];
    return listRoman[number];
  }
