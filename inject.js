
!function(){
  if(localStorage.betSetting == undefined){
    localStorage.betSetting = JSON.stringify({
      roomid:74960,
      minOdds:5,
      oppoMaxOdds:1,
      robustMinOdds:0.5,
      robustOppoMaxOdds:5,
      noRobustMinute:2,
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
var a;
var userInfo;
$.ajax({
        type: "GET",
        url: "https://www.douyu.com/member/guess/get_token?roomid="+betSetting.roomid,
        dataType: "json",
        async:false,
        success: function(t) {
            console.log(t);
            login(t.data.split("token=")[1]);
        },
        error: function(t) {
            console.log("error:"+t);
        }
    });
function login(token){
    $.ajax({
      type: "GET",
      url: "https://huojianjingcai.com/user/login?token=" + token,
      dataType: "json",
      success: function(t) {
        console.log("login",t);
        userInfo = t.data;
        get_games();
        a = setInterval(get_games,6e4);
      },
      error: function(t) {
        console.log("login error!");
      }
    })
  };

function get_games(){
  $.ajax({
    type: "GET",
    url: "https://huojianjingcai.com/game/get_room_games?room=" + userInfo.room_id,
    dataType: "json",
    success: function(i) {
      if (0 != userInfo.balance && 0 != i.data.length) {
        clearInterval(a);
        doConnect();
      }
    },
    error: function(t) {
      console.log("get games error!");
    }
  });
};

var c = function(){};
var n = function(){};
var d = function(){};

var s = "";
function doConnect(){
  var t = userInfo;
  var r = io.connect("https://huojianjingcai.com", {
      rejectUnauthorized: !1,
      query: {
        uid: t.uid,
        room_id: t.room_id
      },
      transports: ["polling"]
  });
  r.emit("join", {
      uid: t.uid,
      room_id: t.room_id
  }),
  r.on("join_resp", function(t) {
    console.log("join_resp",new Date(),t);
      t.data && 0 === t.data.length ? d() : t.data && t.data.length > 0 && (o = t.data,
      c())
  }),
  r.on("message", function(e) {
      e.data && e.data.game_info_list ? (o = e.data.game_info_list,
      c()) : e.end_game_notify ? (console.log("end_game_notify", e.end_game_notify),
      s = "",
      o = e.end_game_notify,
      c(),
      n(r, t.uid, function(e) {
          t = e,
          console.log("userInfo", t)
      })) : e.guess_notify ? (print(e,"guess_notify"),//console.log("guess_notify", e.guess_notify),
      o = e.guess_notify,
      "" == s && c(),isDoGuess(e)) : e.bet_notify && (//print(e,"bet_notify"),//console.log("bet_notify", e.bet_notify),
      o = e.bet_notify,
      "" == s && c())//,
      //console.log("message",new Date(),e)
  }),
  lastData = undefined;
  print = function(e,type){
    return;
    console.count();
    for(var i in e[type]){
      var notify = e[type][i];
      console.log((type == "guess_notify"?"guess  ":"  bet  ")  +
      '%c'+zfill(notify.gameunit_list[0].bet_odds.toFixed(1),3) +
      '%c'+zfill(notify.gameunit_list[1].bet_odds.toFixed(1),5) +
      "竞猜金额:"+
      '%c'+zfill(notify.gameunit_list[0].bet_max_amount,8) +
      '%c'+zfill(notify.gameunit_list[1].bet_max_amount,8) +
      "  " +
      notify.game_name,
      (lastData||e[type])[i].gameunit_list[0].bet_odds == notify.gameunit_list[0].bet_odds?"":"color:red",
      (lastData||e[type])[i].gameunit_list[1].bet_odds == notify.gameunit_list[1].bet_odds?"":"color:red",
      (lastData||e[type])[i].gameunit_list[0].bet_max_amount == notify.gameunit_list[0].bet_max_amount?"":"color:red",
      (lastData||e[type])[i].gameunit_list[1].bet_max_amount == notify.gameunit_list[1].bet_max_amount?"":"color:red",
      );
    }

    console.log("----------");
    lastData = e[type];
  }
  zfill = function(num, size) {
    var s = "        " + num;
    return s.substr(s.length-size);
  }

   isDoGuess = function(e){
     //console.log("isDoGuess",e,);
     return;
     if(t.balance == 0){return};
     if(guessLog.waitResp){console.log("wait Resp");return};
     for(var i = 0;i < e.guess_notify.length;i++){
       var guess_notify = e.guess_notify[i];
       if(guessLog[guess_notify.game_id] == undefined){
         guessLog[guess_notify.game_id] = {};
         guessLog[guess_notify.game_id].startTime = new Date().getTime();
saveLog();
         console.log("start:",new Date());
       }
       //console.log(guess_notify.game_name,guess_notify.bettitle0,guess_notify.bettitle1);

       if(guess_notify.gameunit_list[betSetting.guessUnit].bet_odds == 0){continue};

       //风险型
       if((guessLog[guess_notify.game_id] == undefined
        ||  guessLog[guess_notify.game_id].is_guessed == undefined
        || !guessLog[guess_notify.game_id].is_guessed)
         && guess_notify.gameunit_list[betSetting.guessUnit].bet_odds >= betSetting.minOdds
       && guess_notify.gameunit_list[Number(!betSetting.guessUnit)].bet_odds >= betSetting.oppoMaxOdds){
         //剩余金额占比小于10%
         //if(guess_notify.gameunit_list[1].bet_max_amount/guess_notify.gameunit_list[1].total_amount < 0.1){
           doGuess(guess_notify);
         //}
       }
       //稳健性
       //开始几分钟内，不低保
       if(new Date().getTime() - guessLog[guess_notify.game_id].startTime < betSetting.noRobustMinute*60*1000){continue};
       if((guessLog[guess_notify.game_id] == undefined
        ||  guessLog[guess_notify.game_id].is_guessed == undefined
        || !guessLog[guess_notify.game_id].is_guessed)
        && guess_notify.gameunit_list[betSetting.guessUnit].bet_odds <= betSetting.robustMinOdds
        && guess_notify.gameunit_list[Number(!betSetting.guessUnit)].bet_odds >=betSetting.robustOppoMaxOdds){
          console.log("稳健 now:",new Date(),"start:",new Date(guessLog[guess_notify.game_id].startTime));
         doGuess(guess_notify);
       }
     }

  },

   doGuess = function(guess_notify){
     var guessUnit = guess_notify.gameunit_list[betSetting.guessUnit];
     var thisGuessMax = guessUnit.bet_max_amount;
     var guessedAmout = guessLog[guess_notify.game_id].guessedAmount || 0;
     var guessMax;
     if(guessLog[guess_notify.game_id].guessMax == undefined){
        guessMax = t.balance/betSetting.guessPercent;
     }else{
        guessMax = guessLog[guess_notify.game_id].guessMax;
     }
     var thisGuess = guessMax > thisGuessMax + guessedAmout? thisGuessMax :guessMax - guessedAmout;
    var content = {
                  content: JSON.stringify({
                      uid: t.uid,
                      gameunit_id: guessUnit.gameunit_id,
                      bet_amount: thisGuess.toFixed(0),
                      bet_odds: Number(guessUnit.bet_odds).toFixed(1)
                  })
              };
    r.emit("guess", content);
    guessLog.waitResp = true;
    guessLog.lastGameId = guess_notify.game_id;
    guessLog.lastGuessAmount = thisGuess;
    //guessLog[guessLog.lastGameId] = {};
    //guessLog[guessLog.lastGameId].is_guessed = true;
    guessLog[guessLog.lastGameId].guessMax = Number(guessMax.toFixed(0));
    guessLog[guessLog.lastGameId].guessedAmount = (guessLog[guessLog.lastGameId].guessedAmount||0) + thisGuess;
    if(Math.abs(guessLog[guessLog.lastGameId].guessedAmount - guessLog[guessLog.lastGameId].guessMax) <= 2){
      guessLog[guessLog.lastGameId].is_guessed = true;
    }else{
      guessLog[guessLog.lastGameId].is_guessed = false;
    }
    saveLog();
    t.balance -= thisGuess;
    console.log("doGuess",content)
},
  r.on("bet_resp", function(e) {
      console.log("bet_resp",new Date(),e);

      e.data && 0 != e.data.ret_code ? a(e.data.ret_msg) : e.data && 0 == e.data.ret_code && (t.balance = parseInt(e.data.balance, 10),
      isNaN(t.balance) || $("#balance").text(t.balance > 1e4 ? (t.balance / 1e4).toFixed(2) + "万" : t.balance + "个"))
  }),
  r.on("guess_resp", function(e) {
      guessLog.waitResp = false;
      console.log("guess_resp",new Date(),e);
      //可能会失败
      if(e.data.ret_msg != "OK"){
        console.log("ret_msg",e);
        //guessLog[guessLog.lastGameId] = {};
        guessLog[guessLog.lastGameId].is_guessed = false;
        guessLog[guessLog.lastGameId].guessedAmount -= guessLog.lastGuessAmount;
      }
      saveLog();
      e.data && 0 != e.data.ret_code ? a(e.data.ret_msg) : e.data && 0 == e.data.ret_code && (t.balance = parseInt(e.data.balance, 10),
      isNaN(t.balance) || $("#balance").text(t.balance > 1e4 ? (t.balance / 1e4).toFixed(2) + "万" : t.balance + "个"))
  })
}
