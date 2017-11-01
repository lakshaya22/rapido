'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('DashboardCtrl', function ($scope, $state, $uibModal, $location, $window, restService) {
    var sc = $scope;
    sc.users = [];
    sc.tasks = [];
    sc.mytasks = [];
    sc.viewTaskData = {};
    sc.$state = $state;
    sc.role = $window.localStorage.getItem('role');
    sc.userid = $window.localStorage.getItem('userId');
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
    sc.getUsers = function () {
      restService.getUsers()
        .then(function (res) {
          sc.users = res.data;
        }, function (res) {
          sc.showError("Not Able to Fetch Data");
        })
    }

    sc.getTasks = function () {
      restService.getTasks()
        .then(function (res) {
          sc.tasks = res.data;
        }, function (res) {
          sc.showError("Not Able to Fetch Data");
        })
    }

    sc.getMyTasks = function () {
      restService.getMyTasks(sc.userid)
        .then(function (res) {
          sc.mytasks = res.data.tasks;
        }, function (res) {
          sc.showError("Not Able to Fetch Data");
        })
    }


    if (sc.role == "ADMIN") {
      sc.getUsers();
    }

    sc.getTasks();
    sc.getMyTasks();

    sc.showSuccess = function () {
      var successmodal = $uibModal.open({
        template: '<div class="modal-body"><h3 class="modal-title" style="text-align:center;">Success</h3></div>',
        size: 'sm'
      });

    }


    sc.addUser = function () {
      var temp = {};

      var addLogModal = $uibModal.open({
        templateUrl: '../../views/modal/user.modal.html',
        controller: 'UserCtrl',
        size: 'md',
        backdrop: 'static',
        resolve: {
          userData: function () {
            return temp;

          }
        }
      });

      addLogModal.result.then(function (data) {
        sc.showSuccess();
        sc.getUsers();

      });
    }

    sc.editUser = function (data) {
      var temp = {};
      temp = data;
      var addLogModal = $uibModal.open({
        templateUrl: '../../views/modal/user.modal.html',
        controller: 'UserCtrl',
        size: 'md',
        backdrop: 'static',
        resolve: {
          userData: function () {
            return temp;

          }
        }
      });

      addLogModal.result.then(function (data) {
        sc.showSuccess();
        sc.getUsers();

      });
    }

    sc.deleteUser = function (data) {
      var temp = {};
      temp = data;
      temp.type = 'user';
      var addLogModal = $uibModal.open({
        templateUrl: '../../views/modal/delete.modal.html',
        controller: 'DeleteUserCtrl',
        size: 'md',
        backdrop: 'static',
        resolve: {
          userData: function () {
            return temp;

          }
        }
      });

      addLogModal.result.then(function (data) {
        sc.showSuccess();
        sc.getUsers();

      });
    }



    sc.addTask = function () {
      var temp = {};

      var addLogModal = $uibModal.open({
        templateUrl: '../../views/modal/task.modal.html',
        controller: 'TaskCtrl',
        size: 'md',
        backdrop: 'static',
        resolve: {
          taskData: function () {
            return temp;

          }
        }
      });

      addLogModal.result.then(function (data) {
        sc.showSuccess();
        sc.getTasks();
        sc.getMyTasks();

      });
    }

    sc.viewTask = function (data) {
      restService.getTaskById(data.id)
        .then(function (res) {
          sc.viewTaskData = res.data;
          console.log(res.data);
          $location.path("/dashboard/viewTask");
          // $window.location.reload();
        }, function (res) {
          sc.showError("Not Able to Fetch Data");
        })
    }

    sc.editTask = function (data) {
      var temp = {};
      temp = data;
      var addLogModal = $uibModal.open({
        templateUrl: '../../views/modal/task.modal.html',
        controller: 'TaskCtrl',
        size: 'md',
        backdrop: 'static',
        resolve: {
          taskData: function () {
            return temp;

          }
        }
      });

      addLogModal.result.then(function (data) {
        sc.showSuccess();
        sc.getTasks();
        sc.getMyTasks();

      });
    }

    sc.deleteTask = function (data) {
      var temp = {};
      temp = data;
      temp.type = 'task';
      var addLogModal = $uibModal.open({
        templateUrl: '../../views/modal/delete.modal.html',
        controller: 'DeleteUserCtrl',
        size: 'md',
        backdrop: 'static',
        resolve: {
          userData: function () {
            return temp;

          }
        }
      });

      addLogModal.result.then(function (data) {
        sc.showSuccess();
        sc.getTasks();
        sc.getMyTasks();

      });
    }

    sc.logout = function () {
      $location.path("/login");
      $window.location.reload();
      $window.localStorage.removeItem("token");
      $window.localStorage.removeItem("role");
      $window.localStorage.removeItem("roleId");

    }

  });
