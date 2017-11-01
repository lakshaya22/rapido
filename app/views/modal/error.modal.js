angular.module('yapp')
    .controller('ModalInstanceCtrl', function ($scope, $http, $state, restService, $uibModalInstance, errorData) {
        $scope.displayError = undefined;
        $scope.displayObject = undefined;
        $scope.ok = function () {
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        /*Error 400 Modal*/
        if (!!errorData) {
            $scope.displayObject = undefined;
            $scope.displayError = undefined;

            if (Array.isArray(errorData)) {
                $scope.displayObject = errorData;
            } else {
                $scope.displayError = errorData;
            }
            // errorData.replace(/\\/g, "");
        }

    });