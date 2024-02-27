console.log('JS is running');

window.onload = $('#title').focus();

let reviews = [];
let key = 0;
let unwanted;

// Add event Listener for the delete button
$('#reviewDiv').on('click', '.delete', function(){
    unwanted = $(this).attr('id');
    deleteMovie(unwanted);
    console.log(`unwanted key number: ${unwanted}`)});

// Add event listener for the submit movie review button
$( "#submit" ).on( "click", function( event ) {
    event.preventDefault();
    let title = $('#title').val();
    let rating = $('#rating').val();
    addMovie(title, rating);
  });

// Add event listener for the sort buttons
$('#title_sort').on('click', function() {
    sortByTitle(reviews)});
$('#rating_sort').on('click', function() {
    sortByRating(reviews)});

  class Movie {
    constructor(key, title, rating) {
        this.key = key;
        this.title = title;
        this.rating = rating;
    }
} // END Movie


function addMovie(title, rating){
// Check the the movie title and ratings are correct
    if ( titleCheck(title) ){
        if (ratingInRange(rating)){
                // If they are correct proceed
                reviews.push(new Movie(key, title, rating));
                key++,
                displayMovies(reviews);
                // Reset the form & focus
                $('input').val('');
                $('#title').focus();
        }  // END if...
     }  // END if...
    } // END checkEntries


function titleCheck(title){
// Check that the movie title is >2 characters
        if (title.length <= 2){
            window.alert('Please enter a movie title.')
            $('#title').focus();
            return false;
        } else {
            return true;
        }  // END if...
    }  // END titleCheck()


function ratingInRange(rating){
// Check that the rating is between 1-10
        if (rating == '' || rating <= 0 || rating > 10){
            window.alert('Rating must be between 1 and 10.');
            $('#rating').val('').focus();
            return false;
        } else {
            return true;
        }  // END if...
} // END ratingInRange()


function displayMovies(reviews){
// Show the movies on the webpage
$('#reviews').text('');
// Loop through the movie reviews array
for (let i = 0; i < reviews.length; i++) {
    // Access the inner array at index i
    let innerArray = reviews[i];
   $('#reviews').append(
        `<p><button class="delete" id="${innerArray.key}">X</button>
        Movie: <b>${innerArray.title}</b>, 
        Rating: <b>${innerArray.rating}</b>. 
        </p>`);
    }
  }  // END displayMovies()


function deleteMovie(unwanted){
// Deletes a movie using the key number to identify the movie to delete
// and then use find to get the index number, and splice to delete from array
    const unwantedObj = reviews.find(toDelete => toDelete.key == unwanted);
    const unwantedIndex = reviews.indexOf(unwantedObj);
    reviews.splice(unwantedIndex, 1);
    displayMovies(reviews);
}  // END deleteMovie()


function sortByTitle(reviews) {
// Sorts the movies alphabetically by title
    reviews.sort((a, b) => a.title.localeCompare(b.title));
    displayMovies(reviews);
    }  // END softByTitle()


function sortByRating(reviews) {
// Sorts the movies by rating (high to low)
    reviews.sort((a, b) => b.rating - a.rating);
    displayMovies(reviews);
    }  // END softByTitle()