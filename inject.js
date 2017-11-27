
!function(){
  if(localStorage.betSetting == undefined){
    localStorage.betSetting = JSON.stringify({
      roomid:74960,
      tokenUrl:"",
      lastGameId:""
    });
  }
}();
var betSetting = JSON.parse(localStorage.betSetting);

var saveBetSetting = function(){
  localStorage.betSetting = JSON.stringify(betSetting);
}

$.ajax({
        type: "GET",
        url: "https://www.douyu.com/member/guess/get_token?roomid="+betSetting.roomid,
        dataType: "json",
        async:false,
        success: function(t) {
            console.log(t);
            betSetting.tokenUrl = t.data;
        },
        error: function(t) {
            console.log("error:"+t);
        }
    })
//override getUrlParam in common.js
getUrlParam = function(e) {
  if(e == "tick"){//seems no use when "tick"
    return ""
  }
    var t = new RegExp("(^|&)" + e + "=([^&]*)(&|$)")
      , n = betSetting.tokenUrl.split('?')[1].match(t);
    return n ? decodeURIComponent(n[2]) : ""
};
