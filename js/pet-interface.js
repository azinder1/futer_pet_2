
var SearchPet = require('./../js/pet.js').searchpetModule;
var animals = require('./../js/breedlist.js').animals;


$(document).ready(function() {
  searchpet = new SearchPet();
  animals.forEach(function(animal) {
    $("select#animal").append("<option>" + animal + "</option>");
  });

  $('form#pet-form').submit(function(event){
    event.preventDefault();

    $("div.row.results").empty();
    var zipcode = $('input#zip').val();
    var animal = $('select#animal').val();
    var tom = $('input#tom').val();
    searchpet.pets(zipcode, animal, tom);
    $("#header").slideUp(function() {
      $("#header").fadeOut(1000)
    } 5000);
  });

});
