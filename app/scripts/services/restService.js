/**
 * Created by muhammadsadiqali on 23/08/16.
 */

angular.module('yapp')
    .service('restService', ['$http', function ($http) {

        var baseUrl = "http://taskmanapp.herokuapp.com"
        return {
            login: function (data) {
                console.log(data);
                return $http.post(baseUrl + '/users/login', data);
            },


            getUsers: function (data) {
                return $http.get(baseUrl + '/users')
            },

            getStages: function (data) {
                return $http.get(baseUrl + '/stages')
            },

            getTasks: function (data) {
                return $http.get(baseUrl + '/tasks')
            },

            getMyTasks: function (data) {
                return $http.get(baseUrl + '/users/' + data)
            },

            createUser: function (data) {
                return $http.post(baseUrl + '/users/create', data)
            },

            editUser: function (data, userId) {
                return $http.post(baseUrl + '/users/' + userId, data)
            },

            deleteUser: function (data) {
                return $http.delete(baseUrl + '/users/' + data.id)
            },

            createTask: function (data) {
                return $http.post(baseUrl + '/tasks/create', data)
            },

            editTask: function (data, userId) {
                return $http.post(baseUrl + '/tasks/' + userId, data)
            },

            deleteTask: function (data) {
                return $http.delete(baseUrl + '/tasks/' + data.id)
            },

            getTaskById: function (data) {
                return $http.get(baseUrl + '/tasks/' + data)
            },






        };

    }]);