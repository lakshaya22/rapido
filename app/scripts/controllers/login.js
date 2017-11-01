'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('LoginCtrl', function ($scope, $location, $http, $uibModal, $window, restService) {
    var sc = $scope;
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
    sc.user = { username: '', password: '' };
    $scope.submit = function () {

      restService.login(sc.user)

        .then(function (res) {
          $window.localStorage.role = res.data.role;
          $window.localStorage.userId = res.data.id;
          $window.localStorage.token = res.data.loginToken;

          $location.path('/dashboard');


        }, function (res) {
          sc.showError("Invalid Credentials");
        })

      return false;
    }

  });
