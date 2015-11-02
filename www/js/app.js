// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','ionic-material'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.calon', {
    url: '/calon',
    views: {
      'menuContent': {
        templateUrl: 'templates/calon.html',
        controller: 'CalonCtrl'
      }
    }
  })

  .state('app.partai', {
      url: '/partai',
      views: {
        'menuContent': {
          templateUrl: 'templates/partai.html',
          controller: 'PartaiCtrl'
        }
      }
    })
    .state('app.sengketa', {
      url: '/sengketa',
      views: {
        'menuContent': {
          templateUrl: 'templates/sengketa.html',
          controller: 'SengketaCtrl'
        }
      }
    })
    .state('app.anggaran', {
      url: '/anggaran',
      views: {
        'menuContent': {
          templateUrl: 'templates/anggaran.html',
          controller: 'AnggaranCtrl'
        }
      }
    })
    .state('app.faq', {
      url: '/faq',
      views: {
        'menuContent': {
          templateUrl: 'templates/faq.html',
          controller: 'FaqCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/calon');
});
