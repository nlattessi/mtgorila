(function(){

    var app = angular.module('mtgorila', []);

    app.controller('CardController', [ '$http', function($http){
        var mtgorila = this;
        mtgorila.cartas = [];
        mtgorila.encontrado = false;
        mtgorila.noEncontrado = false;
        mtgorila.nombre = null;

        mtgorila.url = "https://api.deckbrew.com/mtg/cards?name=";

        this.buscar = function() {
            mtgorila.encontrado = false;
            mtgorila.noEncontrado = false;
            mtgorila.cartas = [];
            $http.get(this.url + this.nombre).success(function(data, status, headers, config){
                if (data.length > 0) {
                    mtgorila.encontrado = true;

                    data.forEach(function(entry) {
                        entry.editions.forEach(function(e) {                            
                            if ((e.multiverse_id > 0) && (typeof e.price != 'undefined')) {
                                carta = {};
                                carta.nombre = entry.name;
                                carta.store_url = entry.store_url;
                                carta.image_url = e.image_url;
                                carta.precio = e.price.median / 100;
                                mtgorila.cartas.push(carta);
                            }                        
                        });
                    });
                } else {
                    mtgorila.noEncontrado = true;
                }
            });
        };
    }]);
})();
