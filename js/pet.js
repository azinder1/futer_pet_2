var apiKey = require('./../.env').petapiKey;
var Mapp = require('./../js/map.js').mapModule;

function SearchPet() {
  this.search = [];
}


SearchPet.prototype.pets = function(zipcode, animal, tom) {
   _this = this;
  $.get("http://api.petfinder.com/pet.find?key=" + apiKey + "&format=json&count=18&animal=" + animal + "&location=" + zipcode + "&breed=" + tom).then(function(response) {
    response.petfinder.pets.pet.forEach(function(pet) {
      if (typeof pet.media.photos === "undefined"){

      } else {
        console.log(pet);
        $("div.row.results").append("<div id=" + pet.id.$t + " class='col-sm-4 pet-container'><h3>" + pet.name.$t + "</h3><img class='' src=" + pet.media.photos.photo[3].$t + "></div>");
      }
    });
    attachClick();
  }).fail(function(error) {
    $("div.row.results").append("<h1> Something didn't work, refine your search and try again.</h1>");
  });
};


SearchPet.prototype.specificPet = function(id) {
  $.ajax({
    url: "http://api.petfinder.com/pet.get?key=" + apiKey + "&format=json&id=" + id,
    type: "GET",
    success: function(response) {
      pet = response.petfinder.pet;
      $('.container .pet').append("<div class='col-sm-6'><h3>" + pet.name.$t + "</h3><img class='' src=" + pet.media.photos.photo[3].$t + "><h4>AGE: " + pet.age.$t + "</h4><h4>SEX: " + pet.sex.$t + "</h4><p>" + pet.description.$t + "</p></div><div id='map' class='col-sm-6'></div>");
      var shelterid = pet.shelterId.$t;
      _this.findShelter(shelterid);
    }
  });
};

SearchPet.prototype.findShelter = function(shelterid) {
  $.get("http://api.petfinder.com/shelter.get?key="+ apiKey + "&format=json&id=" + shelterid).then(function(response) {
    long = response.petfinder.shelter.longitude.$t;
    lat = response.petfinder.shelter.latitude.$t;
    map = new Mapp();
    map.getShelter(lat, long);
  });
};

attachClick = function() {
  $("div.pet-container").on("click", function() {
    console.log(this);
    var id = $(this).attr("id");
      $("h1.back").show();
      $("#pet-form").hide();

    console.log(id);
    _this.specificPet(id);
    $(".results").hide();
  });
};


exports.searchpetModule = SearchPet;
