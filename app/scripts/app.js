'use strict';

/**
 * @ngdoc overview
 * @name yapp
 * @description
 * # yapp
 *
 * Main module of the application.
 */
angular
  .module('yapp', [
    'ngAnimate',
    'ui.router',
    'ui.bootstrap',
    'oc.lazyLoad',
  ])
  .run(

  function ($rootScope, $state, $window, $location) {

  }

  )
  .config(function ($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider, $httpProvider, $qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
    $httpProvider.interceptors.push('authInterceptor');
    $urlMatcherFactoryProvider.strictMode(false);

    $urlRouterProvider.when('/dashboard', '/dashboard/tasks');
    $urlRouterProvider.otherwise('/login');


    $stateProvider
      .state('base', {
        abstract: true,
        url: '',
        templateUrl: 'views/base.html'
      })
      .state('login', {
        url: '/login',
        parent: 'base',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .state('dashboard', {
        url: '/dashboard',

        resolve: {
          "check": function ($location, $window) {
            var token = $window.localStorage.getItem('token');
            console.log(token);
            if (!!!token) {
              $location.path("/login");
              $window.location.reload();
            }
            else
              templateUrl: 'views/dashboard.html';

          }
        },
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl'
      })
      .state('users', {
        url: '/users',
        parent: 'dashboard',
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              files: ['views/modal/user.modal.js', 'views/modal/delete.modal.js']
            });
          }]
        },
        templateUrl: 'views/dashboard/user.html'
      })
      .state('tasks', {
        url: '/tasks',
        parent: 'dashboard',
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              files: ['views/modal/task.modal.js', 'views/modal/delete.modal.js']
            });
          }]
        },
        templateUrl: 'views/dashboard/task.html'
      })
      .state('mytasks', {
        url: '/mytasks',
        parent: 'dashboard',

        templateUrl: 'views/dashboard/myTask.html'
      })
      .state('viewTask', {
        url: '/viewTask',
        parent: 'dashboard',

        templateUrl: 'views/dashboard/viewTask.html'
      });



  });
