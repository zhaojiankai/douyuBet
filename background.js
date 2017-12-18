$(function() {
    checkLogin(function(t) {
        console.log(t);
        guessConfig.domain;
        var e = guessConfig.urls
          , n = (t.uid,
        t.tick,
        function(e, n, a) {
            if (!e)
                return t.balance = 0,
                a(t);
            e.emit("balance", {
                content: JSON.stringify({
                    uid: t.uid
                })
            }),
            e.once("balance_resp", function(e) {
                e.data && 0 != e.data.ret_code ? console.error(e.data.ret_msg) : e.data && 0 == e.data.ret_code && e.data.uid === t.uid && (t.balance = parseInt(e.data.balance, 10),
                isNaN(t.balance) || $("#balance").text(t.balance > 1e4 ? (t.balance / 1e4).toFixed(2) + "万" : t.balance + "个"),
                a(t))
            })
        }
        );
        $(document.body).on("userInfoChanged", function(e, n) {
            (t = n).balance = parseInt(t.balance, 10),
            isNaN(t.balance) || $("#balance").text(t.balance > 1e4 ? (t.balance / 1e4).toFixed(2) + "万" : t.balance + "个")
        }),
        t.balance = parseInt(t.balance, 10),
        isNaN(t.balance) || $("#balance").text(t.balance > 1e4 ? (t.balance / 1e4).toFixed(2) + "万" : t.balance + "个"),
        $("#balance").click(function() {
            window.open("user.html")
        }),
        $("#recharge").click(function() {
            window.open("recharge.html")
        }),
        $("#shopping").click(function() {
            window.open("shopping.html")
        }),
        $("#user").click(function() {
            window.open("user.html")
        }),
        $("#closearea").click(function() {
            window.parent != window && window.parent.postMessage('{"closeGuess":1}', "*")
        });
        var a = function(t) {
            $(".set-bg.set-error .text").text(t),
            $(".set-bg.set-error").show(),
            $(".set-bg.set-error .btn.blue").unbind("click").bind("click", function() {
                $(".set-bg.set-error").hide()
            })
        }
          , i = function() {
            var i = []
              , o = function() {
                $(".prompt-box.anchor").show(),
                $(".prompt-box.anchor .text-single").show(),
                $(".prompt-box.anchor .text-video").hide(),
                $(".prompt-box.anchor .text-btn").hide()
            }
              , s = function() {
                $(".prompt-box.anchor").show(),
                $(".prompt-box.anchor .text-single").hide(),
                $(".prompt-box.anchor .text-video").show(),
                $(".prompt-box.anchor .text-btn").hide()
            }
              , d = function() {
                $(".prompt-box.anchor").show(),
                $(".prompt-box.anchor .text-single").hide(),
                $(".prompt-box.anchor .text-video").hide(),
                $(".prompt-box.anchor .text-btn").show().unbind("click").bind("click", function() {
                    $(".prompt-box.anchor").hide(),
                    $(".opereat-box.anchor").show(),
                    c()
                })
            }
              , c = function() {
                var e = template("tpl-set-guess", {});
                $(".opereat-box.anchor").html(e),
                l();
                var n = $(".opereat-box.anchor ul.info li")
                  , i = $(".opereat-box.anchor .submit.btn-all");
                $(".opereat-box.anchor input").unbind("input propertychange").bind("input propertychange", function() {
                    o()
                }),
                $(".opereat-box.anchor select").unbind("change").bind("change", function() {
                    o()
                });
                var o = function() {
                    var t = [{
                        status: !1
                    }, {
                        status: !1
                    }, {
                        status: !1
                    }];
                    n.each(function(e, n) {
                        var a = (n = $(n)).find('input[name="title"]')
                          , i = n.find('input[name="left"]')
                          , o = n.find('input[name="right"]')
                          , l = n.find(".btn")
                          , d = parseInt(n.find(".end_bet_time").val() || "0", 10)
                          , c = "请填写主题" == $.trim(a.val()) ? void 0 : $.trim(a.val())
                          , r = "请填写选项" == $.trim(i.val()) ? void 0 : $.trim(i.val())
                          , u = "请填写选项" == $.trim(o.val()) ? void 0 : $.trim(o.val());
                        console.log("GUESS_TITLE_LENGTH", GUESS_TITLE_LENGTH),
                        c && r && u ? (t[e].title = c,
                        t[e].left = r,
                        t[e].right = u,
                        t[e].status = !0,
                        t[e].li_index = l.attr("id"),
                        t[e].end_bet_time = d,
                        l.removeClass("gray").addClass("blue").unbind("click").bind("click", function() {
                            s(c, r, u, $(this).attr("id"), d)
                        })) : (t[e].status = !1,
                        l.removeClass("blue").addClass("gray").unbind("click"))
                    }),
                    t.filter(function(t) {
                        return !0 === t.status
                    }) ? i.removeClass("gray").addClass("blue").unbind("click").bind("click", function() {
                        d(t)
                    }) : i.removeClass("blue").addClass("gray").unbind("click")
                }
                  , s = function(e, n, a, i, o) {
                    console.log("start game");
                    var l = [{
                        anchor_uid: t.uid,
                        room_id: t.room_id,
                        game_name: e,
                        li_index: i,
                        end_bet_time: o,
                        gameunit_list: [{
                            gameunit_name: n
                        }, {
                            gameunit_name: a
                        }]
                    }];
                    $("#setbtn1,#setbtn2,#setbtn3,#setbtnAll").unbind("click"),
                    b.emit("start_game", {
                        content: JSON.stringify({
                            game_info_list: l
                        })
                    })
                }
                  , d = function(e) {
                    var n = []
                      , i = []
                      , o = !0;
                    e.forEach(function(e, a) {
                        e.title && e.left && e.right && (-1 == $.inArray(e.title, i) ? (i.push(e.title),
                        n.push({
                            anchor_uid: t.uid,
                            room_id: t.room_id,
                            game_name: e.title,
                            end_bet_time: e.end_bet_time,
                            li_index: e.li_index,
                            gameunit_list: [{
                                gameunit_name: e.left
                            }, {
                                gameunit_name: e.right
                            }]
                        })) : o = !1)
                    }),
                    o ? ($(".area-show").css("top", "22px"),
                    $("#setbtn1,#setbtn2,#setbtn3,#setbtnAll").unbind("click"),
                    b.emit("start_game", {
                        content: JSON.stringify({
                            game_info_list: n
                        })
                    })) : a("请不要选择相同主题")
                }
            }
              , r = function() {
                $(".area-show").css("top", "22px"),
                $(".opereat-box.anchor").show();
                var e = !0
                  , n = i.map(function(n, a) {
                    if (1 === n.game_status) {
                        var i = n.gameunit_list.filter(function(t, e) {
                            return 1 === t.gameunit_winflag
                        });
                        n.winname = i.length ? i[0].gameunit_name : "",
                        n.winamount = void 0 == n.anchor_win ? 0 : n.anchor_win,
                        cacheWinamount = window.localStorage.getItem("winamount-" + n.game_id + "-" + t.uid),
                        //console.log("cacheWinamount", cacheWinamount),
                        0 != n.winamount ? window.localStorage.setItem("winamount-" + n.game_id + "-" + t.uid, n.winamount) : n.winamount = null != cacheWinamount && void 0 != cacheWinamount ? cacheWinamount : 0
                    } else {
                        if (e = !1,
                        null == n.gameunit_list[0].bet_odds || 0 == n.gameunit_list[0].bet_odds ? n.bettitle0 = "等待开猜" : n.bettitle0 = "赔率 1:" + n.gameunit_list[0].bet_odds,
                        null == n.gameunit_list[1].bet_odds || 0 == n.gameunit_list[1].bet_odds ? n.bettitle1 = "等待开猜" : n.bettitle1 = "赔率 1:" + n.gameunit_list[1].bet_odds,
                        n.end_bet_time_flag = "",
                        n.end_bet_time) {
                            var o = new Date(n.end_bet_time)
                              , l = (new Date).getTime();
                            if (n.end_bet_time < l)
                                n.end_bet_time_display = "",
                                n.end_bet_time_flag = "已封盘";
                            else {
                                var s = ~~((o.getTime() - l) / 1e3)
                                  , d = Math.floor(s / 60);
                                s %= 60,
                                n.end_bet_time_display = (d < 10 ? "0" + d : d) + ":" + (s < 10 ? "0" + s : s) + "后封盘"
                            }
                        } else
                            n.end_bet_time_display = "";
                        if (n.gameunit_list[0].total_amount) {
                            var c = n.gameunit_list[0].total_amount / (n.gameunit_list[0].total_amount + n.gameunit_list[1].total_amount);
                            n.leftView = c < .04 && c > 0 ? .04 : c > .96 && c < 1 ? .96 : c
                        }
                        if (n.gameunit_list[1].total_amount) {
                            var r = n.gameunit_list[1].total_amount / (n.gameunit_list[0].total_amount + n.gameunit_list[1].total_amount);
                            n.rightView = r < .04 && r > 0 ? .04 : r > .96 && r < 1 ? .96 : r
                        }
                    }
                    return n
                });
                $(".prompt-box.anchor").hide(),
                $(".opereat-box.anchor").show();
                var a = template("tpl-set-guess", {});
                $(".opereat-box.anchor").html(a),
                $(".setbtn1").hide(),
                $(".setbtn2").hide(),
                $(".setbtn3").hide(),
                $("#setbtnAll").hide(),
                $(".prompt-box.anchor").hide(),
                $(".opereat-box.anchor").show();
                for (var o in n) {
                    var s = [];
                    n[o].idx = Number(o),
                    console.log("tpl-start-guess", s),
                    s.push(n[o]);
                    var d = template("tpl-start-guess", {
                        rows: s
                    });
                    $(".setbtn" + (parseInt(o) + 1)).show(),
                    $(".setbtn" + (parseInt(o) + 1)).html(d),
                    $(".setbtn" + (parseInt(o) + 1)).attr("id", "li_" + n[o].game_id)
                }
                $(".opereat-box.anchor ul.info li .title-status").unbind("click").bind("click", function() {
                    u(this.id.replace("overguess_", ""))
                }),
                e && ($(".area-show").removeAttr("style"),
                $("#startGuessBtn").removeClass("gray").addClass("blue").show().unbind("click").bind("click", function() {
                    $(".prompt-box.anchor").hide(),
                    $(".opereat-box.anchor").show(),
                    c(),
                    $("#startGuessBtn").removeClass("blue").addClass("gray").hide().unbind("click")
                })),
                l()
            }
              , u = function(t) {
                b.anchorPaused = !0,
                console.log("gameId", i);
                var e = [];
                for (var n in i)
                    if (t == i[n].game_id) {
                        e.push(i[n]);
                        break
                    }
                var a = template("tpl-over-guess", {
                    rows: e
                });
                $("#li_" + t).html(a);
                var o = $("#li_" + t)
                  , l = $(".opereat-box.anchor .submit.btn-all");
                o.each(function(t, n) {
                    var a = (n = $(n)).find("label");
                    a.click(function() {
                        a.removeClass("checked");
                        var t = $(this);
                        t.find("input:radio").prop("checked", !0),
                        t.addClass("checked"),
                        i.removeClass("gray").addClass("blue")
                    });
                    var i = n.find(".bottom.submit");
                    i.unbind("click").bind("click", function() {
                        var a = n.find("input:radio:checked").val();
                        if (void 0 != a) {
                            $("#btnceg").data("data-gameid", e[t].game_id).data("data-value", a),
                            $("#ceg-result").html($.grep(e[t].gameunit_list, function(t) {
                                return t.gameunit_id == a
                            })[0].gameunit_name);
                            var i = o.find(".num");
                            $("#ceg-num").html(i.html()),
                            $("#ceg-name").html(i.nextAll("span").html()),
                            $("#ceg").show(),
                            $(".opereat-box.anchor").hide()
                        }
                    }),
                    n.find("input:radio").unbind("click").bind("click", function() {
                        i.removeClass("gray").addClass("blue")
                    }),
                    n.find(".title-status").unbind("click").bind("click", function() {
                        b.anchorPaused = !1,
                        r()
                    })
                }),
                l.unbind("click").bind("click", function() {})
            }
              , m = function(e, n) {
                var a = [{
                    game_id: e,
                    gameunit_id: n
                }];
                console.log(a),
                $("#end_game_prompt").show(),
                b.anchorPaused = !1,
                b.emit("end_game", {
                    content: JSON.stringify({
                        anchor_uid: t.anchor_uid,
                        game_info_list: a
                    })
                }),
                b.once("end_game_resp", function() {
                    $("#end_game_prompt").hide()
                })
            }
              , b = io.connect(e.socketurl, {
                rejectUnauthorized: !1
            });
            b.emit("join", {
                uid: t.uid,
                room_id: t.room_id
            }),
            b.on("end_game_resp", function(e) {
                if (console.log("end_game_resp", e),
                0 != e.data.ret_code)
                    return a(e.data.ret_msg),
                    void window.location.reload();
                1 == t.is_anchor && (i = e.data.data.game_info_list,
                r())
            }),
            b.on("start_game_resp", function(t) {
                if (console.log("start_game_resp", t),
                0 != t.data.ret_code)
                    return a("存在违禁字符"),
                    void $(".area-show").removeAttr("style")
            }),
            b.on("join_resp", function(t) {
                t.data.ret_code && -1 === t.data.ret_code ? o() : t.data.ret_code && -2 === t.data.ret_code ? s() : t.data && 0 === t.data.length ? d() : t.data && t.data.length > 0 && (i = t.data,
                r())
            }),
            b.on("message", function(e) {
                e.data && e.data.game_info_list ? (console.log("game_info_list"),
                i = e.data.game_info_list,
                b.anchorPaused || r()) : e.end_game_notify && 1 != t.is_anchor ? (console.log("end_game_notify"),
                console.log(i),
                i = e.end_game_notify,
                b.anchorPaused || r(),
                n(b, t.uid, function(e) {
                    t = e,
                    console.log("userInfo", t)
                })) : e.guess_notify ? (console.log("guess_notify"),
                i = e.guess_notify,
                b.anchorPaused || r()) : e.bet_notify && (i = e.bet_notify,
                b.anchorPaused || r()),
                console.log("message", e)
            }),
            $("#cancelceg").click(function() {
                $("#ceg").hide(),
                $(".opereat-box.anchor").show()
            }),
            $("#btnceg").click(function() {
                var t = $(this)
                  , e = t.data("data-gameid")
                  , n = t.data("data-value");
                e && (t.data("data-gameid", ""),
                $("#ceg").hide(),
                m(e, n))
            })
        }
          , o = function(i) {
            var o = []
              , s = ""
              , d = function() {
                $(".prompt-box.user").show(),
                $(".opereat-box.user").hide()
            }
              , c = function() {
                var e = o.map(function(e, n) {
                    if (1 === e.game_status) {
                        var a = e.gameunit_list.filter(function(t, e) {
                            return 1 === t.gameunit_winflag
                        });
                        e.winname = a.length ? a[0].gameunit_name : "",
                        e.winamount = void 0 == e.winamount ? 0 : e.winamount,
                        cacheWinamount = window.localStorage.getItem("winamount-" + e.game_id + "-" + t.uid),
                        //console.log("cacheWinamount", cacheWinamount),
                        0 != e.winamount ? window.localStorage.setItem("winamount-" + e.game_id + "-" + t.uid, e.winamount) : e.winamount = null != cacheWinamount && void 0 != cacheWinamount ? cacheWinamount : 0
                    } else {
                        if (null == e.gameunit_list[0].bet_odds || 0 == e.gameunit_list[0].bet_odds ? e.bettitle0 = "等待开猜" : e.bettitle0 = "赔率 1:" + e.gameunit_list[0].bet_odds,
                        null == e.gameunit_list[1].bet_odds || 0 == e.gameunit_list[1].bet_odds ? e.bettitle1 = "等待开猜" : e.bettitle1 = "赔率 1:" + e.gameunit_list[1].bet_odds,
                        e.end_bet_time_flag = "",
                        e.end_bet_time) {
                            var i = new Date(e.end_bet_time)
                              , o = (new Date).getTime();
                            if (e.end_bet_time < o)
                                e.end_bet_time_display = "",
                                e.end_bet_time_flag = "已封盘";
                            else {
                                var l = ~~((i.getTime() - o) / 1e3)
                                  , s = Math.floor(l / 60);
                                l %= 60,
                                e.end_bet_time_display = (s < 10 ? "0" + s : s) + ":" + (l < 10 ? "0" + l : l) + "后封盘"
                            }
                        } else
                            e.end_bet_time_display = "";
                        if (e.gameunit_list[0].total_amount) {
                            var d = e.gameunit_list[0].total_amount / (e.gameunit_list[0].total_amount + e.gameunit_list[1].total_amount);
                            e.leftView = d < .04 && d > 0 ? .04 : d > .96 && d < 1 ? .96 : d
                        }
                        if (e.gameunit_list[1].total_amount) {
                            var c = e.gameunit_list[1].total_amount / (e.gameunit_list[0].total_amount + e.gameunit_list[1].total_amount);
                            e.rightView = c < .04 && c > 0 ? .04 : c > .96 && c < 1 ? .96 : c
                        }
                    }
                    return e
                });
                $(".prompt-box.user").hide(),
                $(".opereat-box.user").show();
              //render html
              //  var i = template("tpl-user-start-guess", {
              //      rows: e
              //  });
                $(".opereat-box.user").html(i),
                l(),
                $(".opereat-box.user ul.info li").each(function(e, i) {
                    var l = (i = $(i)).find(".cont.stake")
                      , m = i.find(".cont.start")
                      , b = i.find(".title-status")
                      , _ = i.find(".right")
                      , g = l.find('input[name="bet_odds"]')
                      , f = l.find('input[name="bet_amount"]')
                      , h = l.find(".btn")
                      , p = l.find(".stake-btn")
                      , v = m.find(".text")
                      , w = m.find(".btn.left")
                      , x = m.find(".btn.right");
                    p.unbind("click").bind("click", function() {
                        p.removeClass("current"),
                        $(this).addClass("current"),
                        k()
                    });
                    var k = function() {
                        var t = g.val()
                          , e = f.val()
                          , n = l.find(".stake-btn.current");
                        t >= .1 && t <= 9.9 && e >= 3e3 ? h.attr("id", "btnCurSubmitGuess").removeClass("gray").addClass("blue").unbind("click").bind("click", function() {
                            d(n.data("id"), t, e)
                        }) : h.removeClass("blue").addClass("gray").unbind("click")
                    };
                    b.unbind("click").bind("click", function() {
                        $(this).is(".disabled") || ("kaicai" != s ? "xiazhu" != s ? (s = "kaicai",
                        m.hide(),
                        l.show()) : a("请您优先完成当前下注操作") : a("请您优先完成当前开猜操作"))
                    }),
                    _.unbind("click").bind("click", function() {
                        s = "",
                        m.show(),
                        l.hide(),
                        c()
                    }),
                    l.find("input").unbind("input propertychange").bind("input propertychange", function() {
                        k()
                    });
                    var y = o[e];
                    "已封盘" !== y.end_bet_time_flag && (y.gameunit_list[0].bet_max_amount > 0 && (v.show(),
                    w.removeClass("gray").addClass("blue").unbind("click").bind("click", function() {
                        "kaicai" != s ? "xiazhu" != s ? (s = "xiazhu",
                        n(r, t.uid, function(e) {
                            t = e,
                            console.log("userInfo", t),
                            u(m, y.gameunit_list[0])
                        })) : a("请您优先完成当前下注操作") : a("请您优先完成当前开猜操作")
                    })),
                    y.gameunit_list[1].bet_max_amount > 0 && (v.show(),
                    x.removeClass("gray").addClass("blue").unbind("click").bind("click", function() {
                        "kaicai" != s ? "xiazhu" != s ? (s = "xiazhu",
                        n(r, t.uid, function(e) {
                            t = e,
                            console.log("userInfo", t),
                            u(m, y.gameunit_list[1])
                        })) : a("请您优先完成当前下注操作") : a("请您优先完成当前开猜操作")
                    })))
                });
                var d = function(e, i, o) {
                    var l = $("#btnCurSubmitGuess");
                    "1" != l.attr("loading") && (n(r, t.uid, function(n) {
                        l.attr("loading", "0"),
                        t = n,
                        console.log("userInfo", t),
                        Number(o) <= Number(t.balance) ? (s = "",
                        l.unbind("click"),
                        r.emit("bet", {
                            content: JSON.stringify({
                                uid: t.uid,
                                gameunit_id: e,
                                bet_amount: Number(o),
                                bet_odds: Number(i).toFixed(1)
                            })
                        })) : a("余额不足")
                    }),
                    l.attr("loading", "1"))
                }
                  , u = function(e, i) {
                    var o = e.find(".set-bg.set-betting")
                      , l = o.find(".btn")
                      , d = o.find("input");
                    d.val("输入投注数"),
                    o.show(),
                    o.find(".close").unbind("click").bind("click", function() {
                        s = "",
                        o.hide()
                    });
                    var u = o.find(".betting-input .num")
                      , m = Number(i.bet_max_amount)
                      , b = t.balance
                      , _ = b > m ? m : b
                      , g = Number(i.bet_odds);
                    console.log("bet_odds", g),
                    l.attr("id", "btnSubmitBet").removeClass("blue").addClass("gray").unbind("click"),
                    u.removeClass("yellow"),
                    u.last().addClass("yellow"),
                    u.unbind("click").bind("click", function() {
                        var t = $(this).data("value")
                          , e = "all" === t ? _ : Number(t);
                        m > 0 && e > 0 && (e <= m || e <= b) && (d.val(e),
                        u.removeClass("yellow"),
                        $(this).addClass("yellow"),
                        f(e),
                        l.removeClass("gray").addClass("blue").unbind("click").bind("click", function() {
                            h(e)
                        })),
                        "all" === t && d.val(_)
                    }),
                    d.unbind("input propertychange").bind("input propertychange", function() {
                        var t = "输入投注数" == $(this).val() ? void 0 : $(this).val();
                        if (t) {
                            u.removeClass("yellow"),
                            l.removeClass("blue").addClass("gray").unbind("click");
                            var e = Number(t)
                              , n = t.split(".").length < 2 ? 0 : t.split(".")[1].length;
                            !isNaN(e) && e > 0 && 0 == n && m > 0 && e <= 99999999 && e <= m && e <= b ? (f(e),
                            l.removeClass("gray").addClass("blue").unbind("click").bind("click", function() {
                                h(e)
                            })) : l.removeClass("blue").addClass("gray").unbind("click")
                        } else
                            u.removeClass("yellow"),
                            l.removeClass("blue").addClass("gray").unbind("click"),
                            f(0)
                    });
                    var f = function(t) {
                        o.find("span.overplus").text(m),
                        o.find("span.mine").text(b);
                        var e = b > m ? m : b;
                        t <= e ? o.find("span.win").text(Math.floor(t * g * .95)) : o.find("span.win").text(Math.floor(e * g * .95))
                    };
                    f(b);
                    var h = function(e) {
                        var o = $("#btnSubmitBet");
                        console.log('$btn.attr("loading")', o.attr("loading")),
                        "1" != o.attr("loading") && (n(r, t.uid, function(n) {
                            o.attr("loading", "0"),
                            t = n,
                            Number(e) > Number(t.balance) ? a("余额不足") : (s = "",
                            o.unbind("click"),
                            r.emit("guess", {
                                content: JSON.stringify({
                                    uid: t.uid,
                                    gameunit_id: i.gameunit_id,
                                    bet_amount: Number(e),
                                    bet_odds: Number(g).toFixed(1)
                                })
                            }),
                            c())
                        }),
                        o.attr("loading", "1"))
                    }
                }
            };
            if (i && i.length ? (o = i,
            c()) : d(),
            0 != t.balance && 0 != o.length) {
                var r = io.connect(e.socketurl, {
                    rejectUnauthorized: !1
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
                  guessLog.waitResp = true;
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
        };
        !function() {
            if (t.is_anchor)
                i();
            else {
                $(".prompt-box.user").show();
                var e = function() {
                    $.get(guessConfig.domain + guessConfig.urls.roomgames + "room=" + t.room_id, {}, function(e) {
                        (e.data || []).length && $(".prompt-box.user").hide(),
                        o(e.data || []),
                        0 != t.balance && (e.data || []).length > 0 && clearInterval(n)
                    }, "json")
                }
                  , n = setInterval(e, 6e4);
                e()
            }
            setInterval(function() {
                $(".end_bet_time_display").each(function() {
                    var e = $(this)
                      , n = e.attr("data-end-time")
                      , a = (new Date).getTime();
                    if ("0" !== n) {
                        var i = ~~(((n = new Date(parseInt(n, 10))).getTime() - (new Date).getTime()) / 1e3)
                          , o = Math.floor(i / 60);
                        i %= 60;
                        var l = e.parents("li")
                          , s = l.find(".betended")
                          , d = n.getTime() > a;
                        e.html(d ? (o < 10 ? "0" + o : o) + ":" + (i < 10 ? "0" + i : i) + "后封盘" : ""),
                        s[d ? "hide" : "show"]().html(d ? "" : "已封盘"),
                        t.is_anchor || (l.find(".title-status")[d ? "removeClass" : "addClass"]("disabled"),
                        d || l.find(".two-submit .left,.two-submit .right").removeClass("blue").addClass("gray").unbind("click"))
                    }
                })
            }, 1e3)
        }();
        var l = function() {
            var e = $(window).width()
              , n = $(".box-info ul.info li")
              , a = e - 200
              , i = 355 * (n = n.filter(function(t, e) {
                return "none" != $(e).css("display")
            })).length;
            e - 200 < 355 * n.length ? ($(".box-info").addClass("min-screen"),
            $(".box-info .liwarp ul.info").css({
                width: 355 * n.length + "px",
                left: "0px"
            }),
            n.css("width", "355px"),
            $(".box-info .switch.next").unbind("click").bind("click", function() {
                var e = i - a;
                t.is_anchor || (e += 20);
                var n = parseInt($(".box-info .liwarp ul.info").css("left"));
                (n -= 355) < -e && (n = -e),
                $(".box-info .liwarp ul.info").animate({
                    left: n
                }),
                $(document.body).data("_screen_left", n)
            }),
            $(".box-info .switch.pre").unbind("click").bind("click", function() {
                var t = parseInt($(".box-info .liwarp ul.info").css("left"));
                (t += 355) > 0 && (t = 0),
                $(".box-info .liwarp ul.info").animate({
                    left: t
                }),
                $(document.body).data("_screen_left", t)
            })) : ($(".box-info").removeClass("min-screen"),
            $(".box-info ul.info").css("width", 355 * n.length + "px"),
            n.css("width", "355px")),
            $(".box-info .liwarp ul.info").css({
                left: parseInt($(document.body).data("_screen_left"), 0) || 0
            })
        };
        $(window).resize(function() {
            $(document.body).data("_screen_left", 0),
            l()
        })
    })
});
