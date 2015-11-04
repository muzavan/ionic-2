var API_ROOT_URL = "http://api.pemiluapi.org/";
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
  if(window.localStorage.getItem("partai")==null){
    //console.log("Via Api");
    var ajaxUrl = API_ROOT_URL+"partai/api/parties?apiKey="+API_KEY;
    console.log(ajaxUrl);
    $.get(ajaxUrl,{},function(data){
      //console.log(data);
      var mData = data.data.results.parties;
      console.log(mData);
      window.localStorage.setItem("partai",JSON.stringify(mData));
      for(i in mData){
        // console.log(mData[i]);
        var newItem = '<li class="item" style="white-space:normal;box-shadow: 1px 2px 1px #aaaaaa;margin-bottom:5px;text-align:center;"><h3 style="white-space:normal;font-weight:700;font-size:14pt;">'+mData[i].nama_lengkap+'</h3><img src="'+mData[i].url_logo_medium+'" height="60px" width="60px" /><p style="margin-top:3px;"><b style="font-size:11pt;">Visi</b></p><p style="white-space:normal;">'+mData[i].visi+'</p><p style="margin-top:3px;"><b style="font-size:10pt;">Misi</b></p><p style="white-space:normal;">'+mData[i].misi+'</p><p style="margin-top:3px;"><b style="font-size:10pt;">Program</b></p><p style="white-space:normal;">'+mData[i].program+'</p></li>';
        $("#partais").append(newItem);
      }
    });
  }
  else{
    console.log("Via Local");
    //console.log(window.localStorage.getItem("partai"));
    var mData = JSON.parse(window.localStorage.getItem("partai"));
    for(i in mData){
        // console.log(mData[i]);
        var newItem = '<li class="item" style="white-space:normal;box-shadow: 1px 2px 1px #aaaaaa;margin-bottom:5px;text-align:center;"><h3 style="white-space:normal;font-weight:700;font-size:14pt;">'+mData[i].nama_lengkap+'</h3><img src="'+mData[i].url_logo_medium+'" height="60px" width="60px" /><p style="margin-top:3px;"><b style="font-size:11pt;">Visi</b></p><p style="white-space:normal;">'+mData[i].visi+'</p><p style="margin-top:3px;"><b style="font-size:10pt;">Misi</b></p><p style="white-space:normal;">'+mData[i].misi+'</p><p style="margin-top:3px;"><b style="font-size:10pt;">Program</b></p><p style="white-space:normal;">'+mData[i].program+'</p></li>';
        $("#partais").append(newItem);
    }
  }
})
.controller('SengketaCtrl',function($scope){
  
})
.controller('AnggaranCtrl',function($scope){
  if(window.localStorage.getItem("anggaran")==null){
    //console.log("Via Api");
    var ajaxUrl = API_ROOT_URL+"anggaran-pilkada/api/anggaran?apiKey="+API_KEY;
    console.log(ajaxUrl);
    $.get(ajaxUrl,{},function(data){
      //console.log(data);
      var mData = data.data.results.anggaran;
      console.log(mData);
      window.localStorage.setItem("anggaran",JSON.stringify(mData));
      for(i in mData){
        // console.log(mData[i]);
        var newItem = '<li class="item" style="white-space:normal;box-shadow: 1px 2px 1px #aaaaaa;margin-bottom:5px;"><h3 style="white-space:normal;">'+mData[i].wilayah.nama+'</h3><p style="font-size:9pt;font-weight:700;white-space:normal;">Diajukan : '+mData[i].diajukan+'</p><p style="white-space:normal;">Disetujui :'+mData[i].disetujui+'</p><p style="white-space:normal;">Digunakan :'+mData[i].digunakan+'</p></li>';
        $("#anggarans").append(newItem);
      }
    });
  }
  else{
    //console.log("Via Local");
    //console.log(window.localStorage.getItem("anggaran"));
    var mData = JSON.parse(window.localStorage["anggaran"]);
    for(i in mData){
        // console.log(mData[i]);
        var diajukan = "Rp "+mData[i].diajukan.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
        var disetujui = "Rp "+mData[i].disetujui.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
        var digunakan = "Rp "+mData[i].digunakan.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
        var newItem = '<li class="item" style="white-space:normal;box-shadow: 1px 2px 1px #aaaaaa;margin-bottom:5px;"><h3 style="white-space:normal;">'+mData[i].wilayah.nama+'</h3><p style="font-size:9pt;font-weight:700;white-space:normal;">Diajukan : '+diajukan+'</p><p style="white-space:normal;">Disetujui :'+disetujui+'</p><p style="white-space:normal;">Digunakan :'+digunakan+'</p></li>';
        $("#anggarans").append(newItem);
    }
  }
})
.controller('FaqCtrl',function($scope){
  if(window.localStorage.getItem("faq")==null){
    //console.log("Via Api");
    var ajaxUrl = API_ROOT_URL+"faqpilkada/api/faqs?apiKey="+API_KEY;
    $.get(ajaxUrl,{},function(data){
      //console.log(data);
      var mData = data.data.results.faqs;
      window.localStorage.setItem('faq',JSON.stringify(mData));
      for(i in mData){
        // console.log(mData[i]);
        var newItem = '<li class="item" style="white-space:normal;box-shadow: 1px 2px 1px #aaaaaa;margin-bottom:5px;"><h3 style="white-space:normal;">'+mData[i].question_text+'</h3><p style="font-size:9pt;font-weight:700;white-space:normal;">'+mData[i].relevant_laws_regulations+'</p><p style="white-space:normal;">'+mData[i].question_answer+'</p></li>';
        $("#faqs").append(newItem);
      }
    });
  }
  else{
    //console.log("Via Local");
    //console.log(window.localStorage["faq"]);
    var mData = JSON.parse(window.localStorage.getItem("faq"));
    for(i in mData){
        // console.log(mData[i]);
        var newItem = '<li class="item" style="white-space:normal;box-shadow: 1px 2px 1px #aaaaaa;margin-bottom:5px;"><h3 style="white-space:normal;">'+mData[i].question_text+'</h3><p style="font-size:9pt;font-weight:700;white-space:normal;">'+mData[i].relevant_laws_regulations+'</p><p style="white-space:normal;">'+mData[i].question_answer+'</p></li>';
        $("#faqs").append(newItem);
    }
  }
});