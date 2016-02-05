;(function() {

    function StorageIndicatorDirective() {
        return {
            restrict: 'E',
            templateUrl: 'components/storageIndicator/storageIndicator.view.html',
            controller: 'StorageIndicatorController',
            controllerAs: 'storageIndicatorCtrl',
            bindToController: true
        };
    }

    angular
        .module('photoSticker.storageIndicator')
        .directive('storageIndicator', StorageIndicatorDirective);
})();