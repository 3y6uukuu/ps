;(function() {

    function StorageIndicatorController(STORAGE, INDICATOR, StorageIndicatorService, $mdDialog, LocalStorageService) {
        this.service = StorageIndicatorService;
        this.$mdDialog = $mdDialog;
        this.usedInPercentage = 0;
        this.warnAfter = INDICATOR.WARN_AFTER;

        this.showStorageAlert = function() {
            var storageAlert = this.$mdDialog.alert({
                parent: angular.element(document.body),
                title: 'Storage is full',
                content: 'Please select the file with smaller size or delete some sticker(s) to free space',
                ok: 'Got it!'
            });

            this.$mdDialog.show(storageAlert);
        };

        this.checkStorageSpace = function() {
            var used = this.service.getUsed();

            if (used >= STORAGE.MAX) {
                this.showStorageAlert();
            }

            this.usedInPercentage = this.service.calculateUsedSpaceInPercentage(used, STORAGE, INDICATOR);
        };

        this.checkStorageSpace();

        LocalStorageService.subscribe(this.checkStorageSpace.bind(this));
    }

    angular
        .module('photoSticker.storageIndicator')
        .constant('STORAGE', {
            MAX: 5 // MB
        })
        .constant('INDICATOR', {
            MAX: 100, WARN_AFTER: 80 // Percents
        })
        .controller('StorageIndicatorController', StorageIndicatorController);
})();