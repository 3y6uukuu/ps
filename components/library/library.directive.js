;(function() {

    function libraryDirective() {
        return {
            restrict: 'E',
            templateUrl: 'components/library/library.view.html',
            controller: 'LibraryController',
            controllerAs: 'libraryCtrl'
        };
    }

    angular
        .module('photoSticker.library')
        .directive('library', libraryDirective);
})();