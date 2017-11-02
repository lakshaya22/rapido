angular.module('yapp')
    .controller('UserCtrl', function ($scope, $http, $state, restService, $uibModalInstance, userData, $uibModal) {

        var sc = $scope;
        sc.userData={}
        sc.userData = userData;
        sc.state = "new";
        if (!!userData.id)
            sc.state = "edit";
        else
            sc.userData.role = "USER";
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

        $scope.save = function save(userData) {
            if (sc.state == 'new') {
                if (!!userData.password) {
                    if (userData.password.length < 5) {
                        sc.showError("Password is too weak")
                    }
                    else if (userData.password != userData.confirmPassword) {
                        sc.showError("Password and Confirm Password Do Not Match")

                    }
                    else {
                        restService.createUser(sc.userData)
                            .then(function (res) {
                                $uibModalInstance.close("success");

                            }, function (res) {
                                sc.showError("Not Able to Create User");
                            })
                    }
                }

                else {
                    sc.showError("Please Enter a Password")
                }
            }
            else {
                var temp = { 'username': userData.username, 'email': userData.email, 'role': userData.role };
                restService.editUser(temp, userData.id)
                    .then(function (res) {
                        $uibModalInstance.close("success");

                    }, function (res) {
                        sc.showError("Not Able to Create User");
                    })
            }
        }

        $scope.cancel = function cancel() {
            $uibModalInstance.dismiss();
        }
    });