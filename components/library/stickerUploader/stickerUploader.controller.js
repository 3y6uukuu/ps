;(function() {

    function StickerUploaderController(RESIZE, $mdDialog, locals, Upload) {
        this.resize = RESIZE;
        this.$mdDialog = $mdDialog;
        this.locals = locals;
        this.title = null;

        var src = '';

        this.onSelectFile = function(files) {
            Upload.base64DataUrl(files).then(function(urls){
                src = urls[0];
            });
        };

        this.uploadNewSticker = function() {
            var sticker = {
                src: src,
                title: this.title,
                id: (new Date()).getTime()
            };

            this.locals.apply(sticker);

            this.$mdDialog.cancel();
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