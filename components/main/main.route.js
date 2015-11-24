;(function() {

    angular
        .module('photoSticker.main')
        .config(function($routeProvider) {
            $routeProvider.when('/', {
                controller: 'MainController',
                controllerAs: 'mainControllerCtrl',
                templateUrl: 'components/main/main.view.html'
            });
        });
})();