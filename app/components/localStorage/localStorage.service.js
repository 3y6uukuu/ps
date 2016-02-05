;(function() {

    function LocalStorageService($rootScope) {
        this.publish  = function() {
            $rootScope.$emit('localStorageHasChanged');
        };

        this.subscribe = function(callback) {
            $rootScope.$on('localStorageHasChanged', callback);
        };

        this.get = function(key) {
            var item = localStorage.getItem(key);

            return JSON.parse(item);
        };

        this.set = function(key, data) {
            data = JSON.stringify(data);

            localStorage.setItem(key, data);

            $rootScope.$emit('localStorageHasChanged');
        };

        this.remove = function(key) {
            localStorage.removeItem(key);

            $rootScope.$emit('localStorageHasChanged');
        };
    }

    angular
        .module('photoSticker')
        .service('LocalStorageService', LocalStorageService);
})();
