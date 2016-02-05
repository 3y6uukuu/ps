;(function() {

    angular
        .module('photoSticker.main')
        .config(function($routeProvider) {
            $routeProvider.when('/', {
                templateUrl: 'components/main/main.view.html'
            });
        });
})();