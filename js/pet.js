var apiKey = require('./../.env').petapiKey;

function SearchPet() {
}

SearchPet.prototype.pets = function(zipcode, animal, tom) {
  $.get("http://api.petfinder.com/pet.find?key=" + apiKey + "&format=json&count=18&animal=" + animal + "&location=" + zipcode + "&breed=" + tom).then(function(response) {
    response.petfinder.pets.pet.forEach(function(pet) {
      console.log(response);
      $("div.row.results").append("<div class='col-sm-4 pet-container'><h3>" + pet.name.$t + "</h3><img class='' src=" + pet.media.photos.photo[3].$t + "></div>");
    });
  }).fail(function(error) {
    $("div.row.results").append("<h1> Something didn't work, refine your search and try again.</h1>");
  });
};
exports.searchpetModule = SearchPet;
