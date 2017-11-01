angular.module('yapp')
  .controller('DeleteUserCtrl', function ($scope, $http, $state, restService, $uibModalInstance, userData, $uibModal) {

    var sc = $scope;
    sc.userData = userData;
    console.log(sc.userData);
    sc.showError = function showError(message) {
      $uibModal.open({
        templateUrl: '../../views/modal/errorModal.html',
        controller: 'ModalInstanceCtrl',
        size: 'sm',
        resolve: {
          errorData: function () {
            return message;
          }
        }
      });
    }

    $scope.delete = function (userData) {

      if (userData.type == 'user') {
        restService.deleteUser(userData)
          .then(function (res) {
            $uibModalInstance.close("success");

          }, function (res) {
            sc.showError("Not Able to Delete User");
          })
      }

      if (userData.type == 'task') {
        restService.deleteTask(userData)
          .then(function (res) {
            $uibModalInstance.close("success");

          }, function (res) {
            sc.showError("Not Able to Delete User");
          })
      }

    }

    $scope.cancel = function cancel() {
      $uibModalInstance.dismiss();
    }
  });