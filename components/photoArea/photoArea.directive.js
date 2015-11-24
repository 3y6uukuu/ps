;(function() {

    function photoAreaDirective() {
        return {
            restrict: 'E',
            templateUrl: 'components/photoArea/photoArea.view.html',
            controller: 'PhotoAreaController',
            controllerAs: 'photoAreaCtrl',
            bindToController: true
        };
    }

    angular
        .module('photoSticker.photoArea')
        .directive('photoArea', photoAreaDirective);
})();