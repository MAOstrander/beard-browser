// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform, $rootScope, $state) {
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

  $rootScope.$on( '$stateChangeStart', function(e, toState  , toParams
                                                   , fromState, fromParams) {
    console.log("Hello from the .run");
        // var toNote = toState.name === "app.single";
        // if(toNote){
        //   console.log("You're looking at a note");
        //    return; // no need to redirect
        // }

        console.log("STATE CHANGE EVENT:", e);
        console.log("STATE toState:", toState);
        console.log("STATE toParams:", toParams);
        console.log("STATE fromState:", fromState);
        console.log("STATE fromParams:", fromParams);
        // // now, redirect only not authenticated

        if ($rootScope.test === 'deleted') {
          // console.log("$rootScope.testKey = ", $rootScope.testKey);
          // console.log("$rootScope.testValue = ", $rootScope.testValue);
          console.log("NOPE!!!!!");
          e.preventDefault(); // stop current execution
          $rootScope.test = 'release';
          $state.go('app.playlists'); // go to playlist
          return
        }

        // var noteThere = menu.loadedKey;
        // console.log("noteThere", noteThere);
        // if(userInfo.authenticated === false) {
        //     e.preventDefault(); // stop current execution
        //     $state.go('login'); // go to login
        // }
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

    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/playlist',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/playlists');
});
