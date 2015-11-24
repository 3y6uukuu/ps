(function() {
    angular
        .module('photoSticker')
        .config(function($routeProvider) {
            $routeProvider.otherwise('/');
        });
})();
