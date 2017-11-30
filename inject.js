
!function(){
  if(localStorage.betSetting == undefined){
    localStorage.betSetting = JSON.stringify({
      roomid:74960,
      tokenUrl:"",
      minOdds:5,
      oppoMaxOdds:1,
      robustMinOdds:0.5,
      robustOppoMaxOdds:5,
      guessPercent:10,
      guessUnit:1
    });
  }
  if(localStorage.guessLog == undefined){
    localStorage.guessLog = JSON.stringify({lastGameId:""});
  }
}();

var guessLog = JSON.parse(localStorage.guessLog);
var betSetting = JSON.parse(localStorage.betSetting);

var saveLog = function(){
  localStorage.guessLog = JSON.stringify(guessLog);
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
