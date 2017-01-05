var apiKey = require('./../.env').petapiKey;

function SearchPet() {
  this.search = [];
}


SearchPet.prototype.pets = function(zipcode, animal, tom) {
  var _this = this;
  $.get("http://api.petfinder.com/pet.find?key=" + apiKey + "&format=json&count=18&animal=" + animal + "&location=" + zipcode + "&breed=" + tom).then(function(response) {
    response.petfinder.pets.pet.forEach(function(pet) {
      if (typeof pet.media.photos === "undefined"){

      } else {
        console.log(pet);
        $("div.row.results").append("<div id=" + pet.id.$t + " class='col-sm-4 pet-container'><h3>" + pet.name.$t + "</h3><img class='' src=" + pet.media.photos.photo[3].$t + "></div>");
      }
    });
    $("div.pet-container").click(function() {
      var id = $("div.pet-container").attr("id");
      _this.specific(id);
      $(".results").toggle();
    });
  }).fail(function(error) {
    $("div.row.results").append("<h1> Something didn't work, refine your search and try again.</h1>");
  });
};


SearchPet.prototype.specific = function(id) {
  console.log("hello world");
  $.ajax({
    url: "http://api.petfinder.com/pet.get?key=" + apiKey + "&format=json&id=" + id,
    type: "GET",
    success: function(response) {
      console.log(response);
      $('.container .pet').append("<h3>" + response.petfinder.pet.name.$t + "</h3><img class='' src=" + response.petfinder.pet.media.photos.photo[3].$t + ">");

    }
  });
};




exports.searchpetModule = SearchPet;
