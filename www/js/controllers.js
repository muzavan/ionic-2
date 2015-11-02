var API_ROOT_URL = "http://api.pemiluapi.org/faqpilkada/api/";
var API_KEY = "b88c59878a7538295c5315b3d9e73655";

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})
.controller('CalonCtrl',function($scope){
  
})
.controller('PartaiCtrl',function($scope){
  
})
.controller('SengketaCtrl',function($scope){
  
})
.controller('AnggaranCtrl',function($scope){
  
})
.controller('FaqCtrl',function($scope){
  var ajaxUrl = API_ROOT_URL+"faqs?apiKey="+API_KEY;
  console.log(ajaxUrl);
  $.get(ajaxUrl,{},function(data){
    //console.log(data);
    var mData = data.data.results.faqs;

    for(i in mData){
      // console.log(mData[i]);
      var newItem = '<li class="item" style="white-space:normal;box-shadow: 1px 2px 1px #aaaaaa;margin-bottom:5px;"><h3 style="white-space:normal;">'+mData[i].question_text+'</h3><p style="font-size:9pt;font-weight:700;white-space:normal;">'+mData[i].relevant_laws_regulations+'</p><p style="white-space:normal;">'+mData[i].question_answer+'</p></li>';
      $("#faqs").append(newItem);
    }
  });
});