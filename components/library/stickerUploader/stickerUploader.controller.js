;(function() {

    function StickerUploaderController(RESIZE, $mdDialog, locals, Upload) {
        this.resize = RESIZE;
        this.$mdDialog = $mdDialog;
        this.locals = locals;
        this.title = null;

        var urlSrcPromise = null;

        this.onSelectFile = function(file) {
            urlSrcPromise = Upload.base64DataUrl(file);
        };

        this.uploadNewSticker = function() {
            if (!urlSrcPromise) {
                return;
            }

            urlSrcPromise.then(function(urls) {
                var src = urls[0];

                var sticker = {
                    src: src,
                    title: this.title,
                    id: (new Date()).getTime()
                };

                this.locals.apply(sticker);

                this.$mdDialog.cancel();
            }.bind(this));
        };

        this.cancel = function() {
            this.$mdDialog.hide();
        };
    }

    angular
        .module('photoSticker.library')
        .constant('RESIZE', {width: 150, height: 150})
        .controller('StickerUploaderController', StickerUploaderController);
})();