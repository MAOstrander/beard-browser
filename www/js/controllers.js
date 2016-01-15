angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicHistory, $state) {


  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  var menu = this;
  menu.tempKey = '';
  menu.tempValue = '';
  menu.editMode = false;

  menu.refreshMenu = function () {
    menu.savedNotes = JSON.parse(localStorage.getItem("savedNotes"));
  }
  menu.refreshMenu();

  menu.loadNote = function (key, value)  {
    menu.editMode = false;
    menu.loadedKey = key;
    menu.loadedValue = value;
    console.log("menu.loadedValue", menu.loadedValue);
  }

  menu.deleteNote = function (key) {
    console.log("key", key);
    console.log("pre delete menu.savedNotes", menu.savedNotes);
    delete menu.savedNotes[key];
    console.log("post delete menu.savedNotes", menu.savedNotes);
    localStorage.setItem('savedNotes', JSON.stringify(menu.savedNotes));
    menu.refreshMenu();

    $ionicHistory.nextViewOptions({
      disableBack: true
    });
    $state.go('app.playlists');;
  };

  menu.editNote = function () {
    menu.tempKey = menu.loadedKey;
    menu.tempValue = menu.loadedValue;
    console.log("hey", menu.loadedKey);
    console.log("hey again", menu.loadedValue);
    menu.editMode = true;
  }

  menu.clear2 = function () {
    console.log("Should this cancel the edit? Or clear the fields?");
  }

  menu.addNote2 = function () {
    console.log("STORED DATA", menu.savedNotes);
    console.log("menu.tempKey", menu.tempKey);
    delete menu.savedNotes[menu.tempKey];

    var title = menu.loadedKey;
    var content = menu.loadedValue;

    delete menu.savedNotes[title];
    menu.savedNotes[title] = content;
    localStorage.setItem('savedNotes', JSON.stringify(menu.savedNotes));
    menu.refreshMenu();

    // if (menu.savedNotes.hasOwnProperty(title) === false) {
    //   menu.savedNotes[title] = content;
    //   localStorage.setItem('savedNotes', JSON.stringify(menu.savedNotes));
    //   menu.refreshMenu();
    // } else {
    //   console.log("you already have a note by this title");
    //   // delete menu.savedNotes[title];
    // }
    menu.editMode = false;
  };

})


.controller('PlaylistsCtrl', function($scope) {
    var notes = this;

    notes.clear = function () {
      notes.titleInput = "";
      notes.contentInput = "";
    };

    notes.addNote = function () {
      var savedNotes = JSON.parse(localStorage.getItem("savedNotes")) || {};
        console.log("history", history);
      var title = notes.titleInput;
      var content = notes.contentInput;
        if (savedNotes.hasOwnProperty(title) === false) {
          savedNotes[title] = content;
          localStorage.setItem('savedNotes', JSON.stringify(savedNotes));
          notes.clear();
          $scope.$parent.menu.refreshMenu();
          // menu.savedNotes = JSON.parse(localStorage.getItem("savedNotes"));
        } else {
          console.log("you already have a note by this title");
        }
    };
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
