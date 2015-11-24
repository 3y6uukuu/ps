;(function() {

    function PhotoAreaResource(Upload) {
        this.restoreData = function() {
            return localStorage.getItem('photoArea');
        };

        this.startOver = function() {
            localStorage.clear();
        };

        this.onSelectFile = function(file) {
            Upload.base64DataUrl(file).then(function(urls){
                localStorage.setItem('photoArea', urls[0]);
            });
        };
    }

    angular
        .module('photoSticker.photoArea')
        .service('PhotoAreaResource', PhotoAreaResource);
})();