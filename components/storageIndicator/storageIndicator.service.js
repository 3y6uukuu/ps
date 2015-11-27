;(function() {

    function StorageIndicatorService() {
        this.getUsed = function() {
            var total = 0;

            for (var key in localStorage) {
                if (localStorage.hasOwnProperty(key)) {
                    total += (localStorage[key].length * 2) / 1024 / 1024;
                }
            }

            return total;
        };

        this.calculateUsedSpaceInPercentage = function(data, STORAGE, INDICATOR) {
            return data / STORAGE.MAX * INDICATOR.MAX;
        };
    }

    angular
        .module('photoSticker.storageIndicator')
        .service('StorageIndicatorService', StorageIndicatorService);
})();