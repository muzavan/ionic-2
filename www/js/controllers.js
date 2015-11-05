var API_ROOT_URL = "http://api.pemiluapi.org/";
var API_KEY = "b88c59878a7538295c5315b3d9e73655";
var ID_KAB_DEFAULT = 9187;

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
    //console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('CalonCtrl',function($scope){
  if(window.localStorage.getItem("sp_lokasi")!=null){
    if(window.localStorage.getItem("calon")==null){
      ////console.log("Via Api");
      var ajaxUrl = API_ROOT_URL+"calonpilkada/api/candidates?apiKey="+API_KEY;
      // //console.log(ajaxUrl);
      $.get(ajaxUrl,{},function(data){
        ////console.log(data);
        var mData = data.data.results.candidates;
        // //console.log(mData);
        window.localStorage.setItem("calon",JSON.stringify(mData));
        for(i in mData){
          // //console.log(mData[i]);
          for (j in [0,1])
          {
            if (mData[i].daerah.id==JSON.parse(window.localStorage.getItem("sp_lokasi")).id)
            {
              var newItem = '<li class="item" style="white-space:normal;box-shadow: 1px 2px 1px #aaaaaa;margin-bottom:5px;text-align:center;"><h3 style="white-space:normal;font-weight:700;font-size:14pt;">'+mData[i].paslon[j].nama+'</h3><p style="white-space:normal;">'+toTitleCase(mData[i].paslon[j].alamat)+'</p><p style="margin-top:3px;"><b style="font-size:11pt;">Pekerjaan</b></p><p style="white-space:normal;">'+toTitleCase(mData[i].paslon[j].pekerjaan)+'</p><p style="margin-top:3px;"><b style="font-size:10pt;">Partai Pendukung</b></p><p style="white-space:normal;">'+mData[i].dukungan+'</p><p style="margin-top:3px;"><b style="font-size:10pt;">Tempat tanggal lahir</b></p><p style="white-space:normal;">'+toTitleCase(mData[i].paslon[j].pob)+' '+mData[i].paslon[j].dob+'</p></li>';
              $("#calons").append(newItem);                        
            }
          }
        }
      });
}
else{
  //    //console.log("Via Local");
      ////console.log(window.localStorage.getItem("partai"));
      var mData = JSON.parse(window.localStorage.getItem("calon"));
      for(i in mData){
          // //console.log(mData[i]);
          for (j in [0,1])
          {
            if (mData[i].daerah.id==JSON.parse(window.localStorage.getItem("sp_lokasi")).id)
            {
              var newItem = '<li class="item" style="white-space:normal;box-shadow: 1px 2px 1px #aaaaaa;margin-bottom:5px;text-align:center;"><h3 style="white-space:normal;font-weight:700;font-size:14pt;">'+mData[i].paslon[j].nama+'</h3><p style="white-space:normal;">'+toTitleCase(mData[i].paslon[j].alamat)+'</p><p style="margin-top:3px;"><b style="font-size:11pt;">Pekerjaan</b></p><p style="white-space:normal;">'+toTitleCase(mData[i].paslon[j].pekerjaan)+'</p><p style="margin-top:3px;"><b style="font-size:10pt;">Partai Pendukung</b></p><p style="white-space:normal;">'+mData[i].dukungan+'</p><p style="margin-top:3px;"><b style="font-size:10pt;">Tempat tanggal lahir</b></p><p style="white-space:normal;">'+toTitleCase(mData[i].paslon[j].pob)+' '+mData[i].paslon[j].dob+'</p></li>';
              $("#calons").append(newItem);                        
            }
          }
        }
      }  
    }
    else{
      $("#calons").append("Anda belum mengatur lokasi anda. Atur lokasi dengan pergi ke bagian Pengaturan >> Pilih Lokasi >> Simpan Lokasi");
    }
  })
.controller('PartaiCtrl',function($scope){
  if(window.localStorage.getItem("sp_lokasi")!=null){
    if(window.localStorage.getItem("partai")==null){
      ////console.log("Via Api");
      var ajaxUrl = API_ROOT_URL+"partai/api/parties?apiKey="+API_KEY;
      //console.log(ajaxUrl);
      $.get(ajaxUrl,{},function(data){
        ////console.log(data);
        var mData = data.data.results.parties;
        // //console.log(mData);
        window.localStorage.setItem("partai",JSON.stringify(mData));
        for(i in mData){
          // //console.log(mData[i]);
          var newItem = '<li class="item" style="white-space:normal;box-shadow: 1px 2px 1px #aaaaaa;margin-bottom:5px;text-align:center;"><h3 style="white-space:normal;font-weight:700;font-size:14pt;">'+mData[i].nama_lengkap+'</h3><img src="'+mData[i].url_logo_medium+'" height="60px" width="60px" /><p style="margin-top:3px;"><b style="font-size:11pt;">Visi</b></p><p style="white-space:normal;">'+mData[i].visi+'</p><p style="margin-top:3px;"><b style="font-size:10pt;">Misi</b></p><p style="white-space:normal;">'+mData[i].misi+'</p><p style="margin-top:3px;"><b style="font-size:10pt;">Program</b></p><p style="white-space:normal;">'+mData[i].program+'</p></li>';
          $("#partais").append(newItem);
        }
      });
    }
    else{
      //console.log("Via Local");
      ////console.log(window.localStorage.getItem("partai"));
      var mData = JSON.parse(window.localStorage.getItem("partai"));
      for(i in mData){
          // //console.log(mData[i]);
          var newItem = '<li class="item" style="white-space:normal;box-shadow: 1px 2px 1px #aaaaaa;margin-bottom:5px;text-align:center;"><h3 style="white-space:normal;font-weight:700;font-size:14pt;">'+mData[i].nama_lengkap+'</h3><img src="'+mData[i].url_logo_medium+'" height="60px" width="60px" /><p style="margin-top:3px;"><b style="font-size:11pt;">Visi</b></p><p style="white-space:normal;">'+mData[i].visi+'</p><p style="margin-top:3px;"><b style="font-size:10pt;">Misi</b></p><p style="white-space:normal;">'+mData[i].misi+'</p><p style="margin-top:3px;"><b style="font-size:10pt;">Program</b></p><p style="white-space:normal;">'+mData[i].program+'</p></li>';
          $("#partais").append(newItem);
        }
      }
    }
    else{
      $("#partais").append("Anda belum mengatur lokasi anda. Atur lokasi dengan pergi ke bagian Pengaturan >> Pilih Lokasi >> Simpan Lokasi");
    }
  })
.controller('SengketaCtrl',function($scope){
  if(window.localStorage.getItem("sp_lokasi")!=null){
    if(window.localStorage.getItem("sengketa")==null){
      ////console.log("Via Api");
      var ajaxUrl = API_ROOT_URL+"sengketa-pilkada/api/disputes?apiKey="+API_KEY;
      //console.log(ajaxUrl);
      $.get(ajaxUrl,{},function(data){
        ////console.log(data);
        var mData = data.data.results.disputes;
        // //console.log(mData);
        window.localStorage.setItem("sengketa",JSON.stringify(mData));
        for(i in mData){
          if(mData[i].region.id==JSON.parse(window.localStorage.getItem("sp_lokasi")).id){
            var newItem = '<li class="item" style="white-space:normal;box-shadow: 1px 2px 1px #aaaaaa;margin-bottom:5px;text-align:center;"><h3 style="white-space:normal;font-weight:700;font-size:14pt;">'+mData[i].region.constituency+'<p style="margin-top:3px;"><b style="font-size:10pt;">Dilaporkan oleh:</b>'+mData[i].applicant+'</p>'+'<p style="margin-top:3px;"><b style="font-size:10pt;">Dilaporkan kepada: </b>'+mData[i].respondent+'</p>'+'<p style="margin-top:3px;"><b style="font-size:10pt;">Putusan: </b>'+mData[i].decision_verdict+'</p></li>';
            $("#sengketas").append(newItem);
          }
        }
      });
    }
    else{
      ////console.log("Via Local");
      ////console.log(window.localStorage.getItem("partai"));
      var mData = JSON.parse(window.localStorage.getItem("sengketa"));
      window.localStorage.setItem("sengketa",JSON.stringify(mData));
        for(i in mData){
          if(mData[i].region.id==JSON.parse(window.localStorage.getItem("sp_lokasi")).id){
            var newItem = '<li class="item" style="white-space:normal;box-shadow: 1px 2px 1px #aaaaaa;margin-bottom:5px;text-align:center;"><h3 style="white-space:normal;font-weight:700;font-size:14pt;">'+mData[i].region.constituency+'<p style="margin-top:3px;"><b style="font-size:10pt;">Dilaporkan oleh:</b>'+mData[i].applicant+'</p>'+'<p style="margin-top:3px;"><b style="font-size:10pt;">Dilaporkan kepada: </b>'+mData[i].respondent+'</p>'+'<p style="margin-top:3px;"><b style="font-size:10pt;">Putusan: </b>'+mData[i].decision_verdict+'</p></li>';
            $("#sengketas").append(newItem);
          }
        }
    }
  }
  else{
    $("#sengketas").append("Anda belum mengatur lokasi anda. Atur lokasi dengan pergi ke bagian Pengaturan >> Pilih Lokasi >> Simpan Lokasi");
  }
})
.controller('AnggaranCtrl',function($scope){
  if(window.localStorage.getItem("sp_lokasi")!=null){
    if(window.localStorage.getItem("anggaran")==null){
      ////console.log("Via Api");
      var ajaxUrl = API_ROOT_URL+"anggaran-pilkada/api/anggaran?apiKey="+API_KEY;
      //console.log(ajaxUrl);
      $.get(ajaxUrl,{},function(data){
        ////console.log(data);
        var mData = data.data.results.anggaran;
        // //console.log(mData);
        window.localStorage.setItem("anggaran",JSON.stringify(mData));
        for(i in mData){
          // //console.log(mData[i]);
          if (JSON.parse(window.localStorage.getItem("sp_lokasi")).id==mData[i].wilayah.id)
          {
            var diajukan = "Rp "+mData[i].diajukan.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
            var disetujui = "Rp "+mData[i].disetujui.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
            var digunakan = "Rp "+mData[i].digunakan.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
            var newItem = '<li class="item" style="white-space:normal;box-shadow: 1px 2px 1px #aaaaaa;margin-bottom:5px;"><h3 style="white-space:normal;">'+mData[i].wilayah.nama+'</h3><p style="font-size:9pt;font-weight:700;white-space:normal;">Diajukan : '+diajukan+'</p><p style="white-space:normal;">Disetujui :'+disetujui+'</p><p style="white-space:normal;">Digunakan :'+digunakan+'</p></li>';
            $("#anggarans").append(newItem);            
            break;
          }
        }
      });
}
else{
      ////console.log("Via Local");
      ////console.log(window.localStorage.getItem("anggaran"));
      var mData = JSON.parse(window.localStorage["anggaran"]);
      for(i in mData){
        // //console.log(mData[i]);
        var diajukan = "Rp "+mData[i].diajukan.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
        var disetujui = "Rp "+mData[i].disetujui.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
        var digunakan = "Rp "+mData[i].digunakan.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
          //console.log(window.localStorage.getItem("sp_lokasi"));
          if (JSON.parse(window.localStorage.getItem("sp_lokasi")).id==mData[i].wilayah.id)
          {
            var diajukan = "Rp "+mData[i].diajukan.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
            var disetujui = "Rp "+mData[i].disetujui.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
            var digunakan = "Rp "+mData[i].digunakan.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
            var newItem = '<li class="item" style="white-space:normal;box-shadow: 1px 2px 1px #aaaaaa;margin-bottom:5px;"><h3 style="white-space:normal;">'+mData[i].wilayah.nama+'</h3><p style="font-size:9pt;font-weight:700;white-space:normal;">Diajukan : '+diajukan+'</p><p style="white-space:normal;">Disetujui :'+disetujui+'</p><p style="white-space:normal;">Digunakan :'+digunakan+'</p></li>';
            $("#anggarans").append(newItem);            
            break;
          }
      }
    }
  }
  else{
    $("#anggarans").append("Anda belum mengatur lokasi anda. Atur lokasi dengan pergi ke bagian Pengaturan >> Pilih Lokasi >> Simpan Lokasi");
  }
})
.controller('FaqCtrl',function($scope){
  if(window.localStorage.getItem("sp_lokasi")!=null){
    if(window.localStorage.getItem("faq")==null){
    ////console.log("Via Api");
    var ajaxUrl = API_ROOT_URL+"faqpilkada/api/faqs?apiKey="+API_KEY;
    $.get(ajaxUrl,{},function(data){
      ////console.log(data);
      var mData = data.data.results.faqs;
      window.localStorage.setItem('faq',JSON.stringify(mData));
      for(i in mData){
        // //console.log(mData[i]);
        var newItem = '<li class="item" style="white-space:normal;box-shadow: 1px 2px 1px #aaaaaa;margin-bottom:5px;"><h3 style="white-space:normal;">'+mData[i].question_text+'</h3><p style="font-size:9pt;font-weight:700;white-space:normal;">'+mData[i].relevant_laws_regulations+'</p><p style="white-space:normal;">'+mData[i].question_answer+'</p></li>';
        $("#faqs").append(newItem);
      }
    });
  }
  else{
      ////console.log("Via Local");
      ////console.log(window.localStorage["faq"]);
      var mData = JSON.parse(window.localStorage.getItem("faq"));
      for(i in mData){
          // //console.log(mData[i]);
          var newItem = '<li class="item" style="white-space:normal;box-shadow: 1px 2px 1px #aaaaaa;margin-bottom:5px;"><h3 style="white-space:normal;">'+mData[i].question_text+'</h3><p style="font-size:9pt;font-weight:700;white-space:normal;">'+mData[i].relevant_laws_regulations+'</p><p style="white-space:normal;">'+mData[i].question_answer+'</p></li>';
          $("#faqs").append(newItem);
        }
      }
    }
    else{
      $("#faqs").append("Anda belum mengatur lokasi anda. Atur lokasi dengan pergi ke bagian Pengaturan >> Pilih Lokasi >> Simpan Lokasi");
    } 
  })
.controller('PengaturanCtrl',function($scope){
  var regionsURL = "js/regions.json";
  var mData = null;
  $.get(regionsURL,{},function(data){
    mData = data;
    mData.sort(function(a, b) {
      return compareStrings(a.name, b.name);
    });
    for(i in mData){
      var newItem = '<option value="'+mData[i].id+'">'+mData[i].name+'</option>';
      $("#lokasis").append(newItem);
    }
  });

  $scope.ubahLokasi = function(_val){
    $scope.lokasi = _val;
  };

  $scope.simpanLokasi = function(){
    var val = $scope.lokasi;
    //console.log("Simpan Lokasi:",val);
    for(i in mData){
      if(mData[i].id == val){
          ////console.log(mData[i].id,mData[i].name);
          window.localStorage.setItem("sp_lokasi",JSON.stringify(mData[i]));
          $("#pesan").text("Berhasil disimpan.");
          break;
        }
      }
    };
})

.controller('Head2HeadCtrl',function($scope){

  if(window.localStorage.getItem("sp_lokasi")!=null){
    $("h2").hide();
    $scope.calons = JSON.parse(window.localStorage.getItem("calon")).filter(function (i,n){
          return i.daerah.id==JSON.parse(window.localStorage.getItem("sp_lokasi")).id;
    });

    $scope.showAll = function(){
      var alls = $(':checked');
      var cdts = []; //list of candidates needs to be shown
      $("h2").show();
      $("#visis").empty();
      $("#misis").empty();
      for(i=0;i<alls.length;i++){
        cdts.push(alls[i].value);
      }
      if(window.localStorage.getItem('visi_misi')==null){
        var ajaxUrl = API_ROOT_URL + 'calonpilkada/api/vision_missions?apiKey=' + API_KEY;
        $.get(ajaxUrl,{},function(data){
          //console.log(data);
          var mData = data.data.results.vision_missions;
          //console.log(mData);
          window.localStorage.setItem('visi_misi',JSON.stringify(mData));
          var newItem = "";
          for(i in mData){
            if(cdts.indexOf(mData[i].candidate_id) > -1){
              newItem += '<li class="item">'+mData[i].visi+' ('+mData[i].paslon[0].nama+' & '+mData[i].paslon[1].nama+')</li>';
            }
          }
          $("#visis").append(newItem);
          newItem = "";
          var newItem = "";
          for(i in mData){
            if(cdts.indexOf(mData[i].candidate_id) > -1){
              newItem += '<li class="item">'+mData[i].misi.replace(/\n/g, '<br/>')+' ('+mData[i].paslon[0].nama+' & '+mData[i].paslon[1].nama+')</li>';
            }
          }
          $("#misis").append(newItem);
          newItem = "";
        });
      }
      else{
        var mData = JSON.parse(window.localStorage.getItem('visi_misi'));
        //console.log(mData);
        var newItem = "";
        for(i in mData){
          if(cdts.indexOf(mData[i].candidate_id) > -1){
            newItem += '<li class="item" style="white-space:normal;">('+mData[i].paslon[0].nama+' & '+mData[i].paslon[1].nama+')<br/>'+mData[i].visi+'</li>';
          }
        }
        $("#visis").append(newItem);
        newItem = "";
        var newItem = "";
        for(i in mData){
          if(cdts.indexOf(mData[i].candidate_id) > -1){
            newItem += '<li class="item" style="white-space:normal;">('+mData[i].paslon[0].nama+' & '+mData[i].paslon[1].nama+')<p class="misi">'+mData[i].misi.replace(/\n/g, "</p><p class='misi'>")+'</p></li>';
          }
        }
        $("#misis").append(newItem);
        newItem = "";
      }
    };
  }
  else{
    $("#visi").hide();
    $("#misi").hide();
    $("h5").text("Anda belum mengatur lokasi anda. Atur lokasi dengan pergi ke bagian Pengaturan >> Pilih Lokasi >> Simpan Lokasi"); 
  }

});

function toTitleCase(str)
{
  if (str === str.toUpperCase())
  {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});      
  }
  else
    return str
}

function compareStrings(a, b) {
  // Assuming you want case-insensitive comparison
  a = a.toLowerCase();
  b = b.toLowerCase();

  return (a < b) ? -1 : (a > b) ? 1 : 0;
}
