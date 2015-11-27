;(function() {

    function MainController($rootScope, $mdDialog) {
        this.$mdDialog = $mdDialog;

        var getLocalStorageSize = function() {
            var total = 0;

            for (var key in localStorage) {
                total += (localStorage[key].length * 2) / 1024 / 1024;
            }

            return total;
        };

        this.checkFreeSpace = function() {
            //if (getLocalStorageSize() > 5) {
            //    this.$mdDialog.show({
            //        templateUrl: 'components/library/stickerUploader/stickerUploader.view.html',
            //        parent: angular.element(document.body),
            //        clickOutsideToClose: true
            //    });
            //}
        };

        $rootScope.$on('localstorageAction', this.checkFreeSpace.bind(this));
    };

    angular
        .module('photoSticker.main')
        .controller('MainController', MainController);
})();