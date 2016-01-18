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
    console.log("menu.loadedValue", menu.loadedValue, "menu.loadedKey", menu.loadedKey);
  }

  menu.deleteNote = function (key) {
    menu.loadedKey = "";
    menu.loadedValue = "";
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
    if (menu.savedNotes.hasOwnProperty(title) === false && title !== "") {
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
      console.log("menu.addNote. you already have a note by this title");
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


.controller('PlaylistsCtrl', function($scope, $ionicPopup) {
    var notes = this;

    notes.clear = function () {
      notes.titleInput = "";
      notes.contentInput = "";
      console.log("you clicked clear");
    };

    notes.addNote = function () {
      notes.savedNotes = JSON.parse(localStorage.getItem("savedNotes")) || {};
      // var title = notes.titleInput;
      // var content = notes.contentInput;
      console.log("true", notes.savedNotes.hasOwnProperty(notes.titleInput) );
        if (notes.savedNotes.hasOwnProperty(notes.titleInput) === false && notes.titleInput !== ""  && notes.contentInput !== "") {
        // if (notes.savedNotes.hasOwnProperty(notes.titleInput) === false) {
          notes.savedNotes[notes.titleInput] = notes.contentInput;
          localStorage.setItem('savedNotes', JSON.stringify(notes.savedNotes));
          // notes.savedNotes = JSON.parse(localStorage.getItem("savedNotes"));
          // notes.clear();
          notes.titleInput = "";
          notes.contentInput = "";
          $scope.$parent.menu.refreshMenu();
          $ionicPopup.alert({title: "Note saved"});
        } else {
          console.log("notes.addNote. you already have a note by this title");
          console.log("title", notes.titleInput);
          $ionicPopup.alert({title: "Your note needs an original title and content"});
          // $scope.$parent.menu.refreshMenu();
        }
    };
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
