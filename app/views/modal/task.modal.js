angular.module('yapp')
    .controller('TaskCtrl', function ($scope, $http, $state, restService, $uibModalInstance, taskData, $uibModal) {

        var sc = $scope;
        sc.taskData={};
        sc.taskData = taskData;
        sc.state = "new";
        console.log(taskData);
        if (!!taskData.id) {
            sc.state = "edit";

            restService.getTaskById(taskData.id)
                .then(function (res) {
                    sc.taskData = res.data;
                    var mydate = moment(taskData.due_date, 'YYYY-MM-DD');
                    sc.taskData.due_date = moment(mydate).format('DD/MM/YYYY');
                    sc.taskData.user_id = { id: sc.taskData.user_id, username: sc.taskData.username };
                    sc.taskData.stage_id = { id: sc.taskData.stage_id, stage: sc.taskData.stage };
                    console.log(sc.taskData);
                }, function (res) {
                    sc.showError("Not Able to Fetch Data");
                })


        }

        sc.users = [];
        sc.stages = [];

        restService.getUsers()
            .then(function (res) {
                for (var i = 0; i < res.data.length; i++) {
                    sc.users.push({ id: res.data[i].id, username: res.data[i].username });
                }
            }, function (res) {
                sc.showError("Not Able to Fetch Data");
            })

        restService.getStages()
            .then(function (res) {
                for (var i = 0; i < res.data.length; i++) {
                    sc.stages.push({ id: res.data[i].id, stage: res.data[i].stage });
                }
            }, function (res) {
                sc.showError("Not Able to Fetch Data");
            })
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

        $scope.save = function save(taskData) {
            var mydate = moment($('#dueDate').val(), 'DD/MM/YYYY');
            sc.taskData.due_date = moment(mydate).format('YYYY-MM-DD');
            sc.taskData.stage_id = sc.taskData.stage_id.id;
            sc.taskData.user_id = sc.taskData.user_id.id;

            if (sc.state == 'new') {

                restService.createTask(taskData)
                    .then(function (res) {
                        $uibModalInstance.close("success");

                    }, function (res) {
                        sc.showError("Not Able to Create Task");
                    })

            }
            else {
                // var temp={'username':userData.username,'email':userData.email,'role':userData.role};
                restService.editTask(sc.taskData, sc.taskData.id)
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