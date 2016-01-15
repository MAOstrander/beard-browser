angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicHistory, $state) {


  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  var menu = this;

  menu.tempTitle = "";
  menu.tempValue = "";
  menu.editMode = false;

  menu.refreshMenu = function () {
    menu.savedNotes = JSON.parse(localStorage.getItem("savedNotes"));
  };
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
    $state.go('app.playlists');
  };

  menu.editNote = function () {
    menu.tempValue = menu.loadedValue;
    menu.tempTitle = menu.loadedKey;
    menu.editMode = true;
  };

  menu.clear = function () {
      menu.loadedKey = "";
      menu.loadedValue = "";
  };

  menu.addNote = function () {
    // var savedNotes = JSON.parse(localStorage.getItem("savedNotes")) || {};
    // var titleToDelete = menu.tempTitle;
    delete menu.savedNotes[menu.tempTitle];
    localStorage.setItem('savedNotes', JSON.stringify(menu.savedNotes));
    menu.savedNotes = JSON.parse(localStorage.getItem("savedNotes"));
    var title = menu.loadedKey;
    var content = menu.loadedValue;
      if (menu.savedNotes.hasOwnProperty(title) === false) {
        menu.savedNotes[title] = content;
        localStorage.setItem('savedNotes', JSON.stringify(menu.savedNotes));
        menu.editMode = false;
        menu.clear();
        menu.refreshMenu();
        $ionicHistory.nextViewOptions({
          disableBack: true
        });
        $state.go('app.playlists');
        // menu.savedNotes = JSON.parse(localStorage.getItem("savedNotes"));
      } else {
        console.log("you already have a note by this title");
          // menu.tempValue = menu.loadedValue;
          // menu.tempTitle = menu.loadedKey;
          // menu.loadedValue = menu.tempValue;
          menu.loadedKey = menu.tempTitle;
          menu.savedNotes[menu.tempTitle] = menu.tempValue;
          localStorage.setItem('savedNotes', JSON.stringify(menu.savedNotes));
          menu.refreshMenu();

      }
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
