
angular.module('yapp')
    .factory('authInterceptor', function ($location, $q, $window, $rootScope) {
        return {
            // var interceptor = {
            request: function (config) {
                var check = config.url.match("login");
                console.log(config);
                if (!!!check) {
                    // if (config.url != "https://maps.googleapis.com/maps/api/geocode/json") {

                    config.headers = config.headers || {};

                    var token = $window.localStorage.getItem('token');
                    var userId = $window.localStorage.getItem('userId');

                    config.headers['X-LoginToken'] = token;
                    config.headers['X-UserId'] = userId;

                    console.log(config);

                }

                return config;
            },

            responseError: function (res) {
                console.log(res.status)
                console.log(res.status == 500)
                if (res.status == 401) {
                    // if (auth.ref)
                    $window.location.href = 'logout';
                    // console.log(res.statusText)
                }
                // if (res.status == 502) {

                //     $rootScope.$emit('error::502', '');
                //     return;

                // }
                if (res.status == 404) {
                    // console.log(res.statusText)
                }
                return $q.reject(res)
            }
        };
        // return interceptor;
    })