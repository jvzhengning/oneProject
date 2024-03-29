var usCountryArray = ["USA"];
var canCountryArray = ["CAN"];
Array.prototype.contains = function(b) {
    var a = this.length;
    while (a--) {
        if (this[a] === b) {
            return true
        }
    }
    return false
};
function loadUseAjax(c, b, a) {
    $.ajax({
        url: c,
        cache: a,
        success: function(d) {
            $(b).html(d);
            $(window).scrollTop(0)
        }
    })
}
function loadPageWidget(c, b, a) {
    loadUseAjax(c, b, a)
}
function loadPageWithHashChange(a, d, c) {
    var b = a.replace("#!/", "");
    if (c != undefined) {
        b = b + c
    }
    if (d) {
        if (location.hash = a) {
            loadPage(b);
            return false
        }
        location.hash = a
    }
    $(window).hashchange({
        hash: a,
        onSet: function() {
            loadPage(b)
        },
        onRemove: function() {}
    })
}
function loadPage(a) {
    $.ajax({
        type: "GET",
        url: a,
        success: function(b) {
            $("#wg_center").html(b);
            $(window).scrollTop(0)
        }
    })
}
function loadAppPageWithHashChange(a, d, c) {
    if (d) {
        location.hash = a
    }
    var b = a.replace("#!/", "");
    $(window).hashchange({
        hash: a,
        onSet: function() {
            loadAppPage(b, c)
        },
        onRemove: function() {}
    })
}
function loadAppPage(b, a) {
    layer.load(0, {
        shade: [0.2, "#000"]
    });
    $.ajax({
        type: "GET",
        url: b,
        data: {
            neeaAppId: a
        },
        success: function(c) {
            layer.closeAll();
            $("#wg_center").html(c);
            $(window).scrollTop(0)
        }
    })
}
function initCaptcha() {
    $("#divCaptcha").hide();
    $("#verifyCode").val("");
    $("#verifyCode").focus(function() {
        if ($("#divCaptcha").is(":hidden")) {
            showCaptcha()
        }
    });
    $("#chkImg").click(function() {
        getCaptcha()
    })
}
function showCaptcha() {
    $("#divCaptcha").show();
    getCaptcha();
    $("#verifyCode").unbind("click")
}
function getIV() {
    $.getJSON("/passwordIV",
    function(a) {
        if (a == null) {
            return
        }
        if (a.iv == "") {
            return
        }
        $("#ivstr").val(a.iv)
    })
}
function getCaptcha() {
    $("#chkImg").attr("src", "/static/toefl/images/loading.gif");
    $.getJSON("/captcha",
    function(b) {
        if (b == null) {
            return
        }
        var a = new Image();
        a.src = b.url;
        a.onload = function() {
            $("#chkImg").attr("src", b.url)
        };
        a = null
    })
}
function isCapsLock(f) {
    var c = f.which;
    var d = (c >= 65 && c <= 90) ? true: false;
    var b = (c >= 97 && c <= 122) ? true: false;
    var a = (f.shiftKey) ? f.shiftKey: ((c == 16) ? true: false);
    return (d && !a) || (b && a)
}
function login(b) {
    if (!validateLoginForm(b)) {
        return false
    }
    var a = encryptPassword($("#textPassword").val(), $("#verifyCode").val(), $("#ivstr").val());
    $("#userPassword").val(a);
    $("#loginForm").submit();
    $("#btnLogin").attr("disabled", "disabled")
}
function encryptPassword(c, e, g) {
    var d = CryptoJS.enc.Utf8.parse("0123456789AB" + e.toUpperCase());
    var b = CryptoJS.enc.Utf8.parse(g);
    var a = {
        iv: b,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    };
    var f = CryptoJS.AES.encrypt(CryptoJS.MD5(c).toString(), d, a);
    return f.ciphertext.toString(CryptoJS.enc.Hex)
}
function getMsgObj(a) {
    if (a == null) {
        return msg_cn
    }
    return a == "cn" ? msg_cn: msg_en
}
function validateLoginForm(c) {
    var b = getMsgObj(c);
    if ($("#userName").val().trim() == "") {
        layer.msg(b.error.format.userNameRequired, {
            time: 2000,
            icon: 0,
            shift: 0
        });
        $("#userName").focus();
        return false
    }
    if ($("#textPassword").val().trim() == "") {
        layer.msg(b.error.format.userPasswordRequired, {
            time: 2000,
            icon: 0,
            shift: 0
        });
        $("#textPassword").focus();
        return false
    }
    if ($("#verifyCode").val().length != 4) {
        layer.msg(b.error.format.captchaCodeRequired, {
            time: 2000,
            icon: 0,
            shift: 0
        });
        $("#verifyCode").focus();
        return false
    }
    var a = /[ 　\u4e00-\u9fa5\uf900-\ufa2d\uff00-\uffff]+/;
    if (a.test($("#textPassword").val())) {
        layer.msg(b.error.login.userPasswordInvalid, {
            time: 2000,
            icon: 0,
            shift: 0
        });
        $("#textPassword").focus();
        return false
    }
    return true
}
function appendErrorMsg(b, a) {
    $("#" + b + "ErrorMsg").empty().append(a)
}
function isEmail(a) {
    if (a.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1) {
        return true
    } else {
        return false
    }
}
function formatCurrency(b, a) {
    $("#" + b).text(a / 100);
    $("#" + b).formatCurrency({
        region: "zh-CN"
    })
}
function formatCurrencyVal(b, a) {
    $("#" + b).val(a / 100);
    $("#" + b).formatCurrency({
        region: "zh-CN"
    })
}
function formatTestFee(a) {
    return "RMB￥" + a.toFixed(2)
}
function showTipMsg() {
    $(".inputStyle").smallipop({
        preferredPosition: "right",
        theme: "black",
        popupOffset: 5,
        hideDelay: 500,
        invertAnimation: true,
        popupAnimationSpeed: 60,
        triggerOnClick: true
    })
}
var timeout;
function setCountdown(a, d, c, b) {
    clearTimeout(timeout);
    if (b == 0) {
        a.removeAttribute("disabled");
        a.value = d;
        return
    } else {
        a.setAttribute("disabled", "disabled");
        a.value = b + c;
        b--
    }
    timeout = setTimeout(function() {
        setCountdown(a, d, c, b)
    },
    1000)
}
function setTime(b, d, a, c) {
    if (a == 0) {
        b.removeAttribute("disabled");
        if (d.indexOf("VerifyCode") != -1) {
            if (c == "cn") {
                b.value = "获取验证码"
            } else {
                b.value = ""
            }
        } else {
            if (c == "cn") {
                b.value = "发送电子邮箱验证邮件"
            } else {
                b.value = ""
            }
        }
        a = 60;
        $("#returnMsg").hide();
        return
    } else {
        b.setAttribute("disabled", true);
        if (d.indexOf("VerifyCode") != -1) {
            if (c == "cn") {
                b.value = "重新获取验证码(" + a + ")"
            } else {
                b.value = ""
            }
        } else {
            if (c == "cn") {
                b.value = "重新发送电子邮箱验证邮件(" + a + ")"
            } else {
                b.value = ""
            }
        }
        a--
    }
    setTimeout(function() {
        setTime(b, d, a, c)
    },
    1000)
}
function getAlertDialog(c, b, a) {
    layer.open({
        title: c,
        btn: [a],
        icon: 3,
        content: b,
        btn1: function() {
            layer.closeAll()
        }
    })
}
function initDateOfBirth(a, b) {
    $("#" + a).datetimepicker({
        format: "yyyy-mm-dd",
        language: b,
        minView: "month",
        startView: 3,
        startDate: "1900-01-01",
        forceParse: false,
        endDate: new Date(),
        initialDate: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 365 * 35),
        autoclose: true
    }).on("changeDate",
    function(c) {
        $("#" + a + "ErrorMsg").empty()
    });
    $("#datetimeIcon").click(function() {
        $("#" + a).datetimepicker("show")
    });
    $("#" + a).click(function() {
        $("#" + a).datetimepicker("show")
    })
}
function bindAutoComplete() {
    $("#lastName").typeahead({
        minLength: 0,
        source: function(b, c) {
            if ($("#xing").val() != "" && $("#citizenCountryCode").val() == "CHN" && $("#permanentResident").val() == "CHN") {
                var a = "convertPinyin?chi=" + encodeURIComponent($("#xing").val());
                $.getJSON(a,
                function(d) {
                    c(d)
                })
            }
        }
    });
    $("#firstName").typeahead({
        minLength: 0,
        source: function(b, c) {
            if ($("#ming").val() != "" && $("#citizenCountryCode").val() == "CHN" && $("#permanentResident").val() == "CHN") {
                var a = "convertPinyin?chi=" + encodeURIComponent($("#ming").val());
                $.getJSON(a,
                function(d) {
                    c(d)
                })
            }
        }
    })
}
function showTestCenterInfo(b, a) {
    layer.open({
        type: 2,
        title: b,
        shade: 0.3,
        area: ["50%", "380px"],
        content: "/queryTestCenter?centerCode=" + a
    })
}
function PPCCascade(c, b, a, d) {
    var e = '<option value="">- 请选择省份 -</option>';
    if (d == "en") {
        e = '<option value="">- Province -</option>'
    }
    $.each(obj_province,
    function(f, g) {
        e += '<option value="' + g[0] + '">' + g[1] + "</option>"
    });
    $("#" + c).empty();
    $("#" + c).html(e);
    $("#" + c).change(function() {
        changeCity(c, b, d);
        changeDistrict(b, a, d)
    });
    $("#" + b).change(function() {
        changeDistrict(b, a, d)
    })
}
function changeCity(d, a, e) {
    var f = $("#" + d + " option:selected").val();
    var c = obj_city[f];
    var b = '<option value="">- 请选择城市 -</option>';
    if (e == "en") {
        b = '<option value="">- City -</option>'
    }
    if (!$.isEmptyObject(c)) {
        $.each(c,
        function(g, h) {
            b += '<option value="' + h.cityCode + '">' + h.cityNameCn + "</option>"
        })
    }
    $("#" + a).empty();
    $("#" + a).html(b)
}
function changeDistrict(b, a, e) {
    var d = $("#" + b + " option:selected").val();
    var f = obj_county[d];
    var c = '<option value="">- 请选择区县 -</option>';
    if (e == "en") {
        c = '<option value="">- Dirstrict -</option>'
    }
    if (!$.isEmptyObject(f)) {
        $.each(f,
        function(g, h) {
            c += '<option value="' + h.cityCode + '">' + h.cityNameCn + "</option>"
        })
    }
    c += '<option value="999"> - </option>';
    $("#" + a).empty();
    $("#" + a).html(c)
}
function getEtsId() {
    $.ajax({
        type: "GET",
        url: "profile/refreshEtsId",
        success: function(a) {
            if (a != "") {
                $("#etsIdRefreshSpan").text(a);
                loadPageWidget("homepage", "#wg_center", false)
            } else {
                setTimeout(function() {
                    getEtsId()
                },
                30000)
            }
        }
    })
}
function getBalance() {
    $.ajax({
        type: "GET",
        url: "profile/refreshBalance",
        success: function(a) {
            formatCurrency("balanceRefreshField", a)
        }
    })
}
function setElementSelected(a, b) {
    if (b == "") {
        $("select[name=" + a + "] option[value='']").prop("selected", true)
    } else {
        $("select[name=" + a + "] option[value=" + b + "]").prop("selected", true)
    }
}
function setElementsChecked(a, b) {
    $('input[name="+name+"][value=' + b + "]").attr("checked", "checked")
}
function buildMailBolber(h, f, k, j, d) {
    var a = $("#postProvince option:selected").text().replace("-", "");
    var b = $("#postCity option:selected").text().replace("-", "");
    var l = $("#postDistrict option:selected").text().replace("-", "");
    var g = $("#postProvince option:selected").val();
    var e = "";
    if (g == "11" || g == "12" || g == "31" || g == "50") {} else {
        e += a
    }
    if (b == "省直辖县级行政区划") {
        b = ""
    }
    e += b + l + d;
    $("#mailerBlob").val(e.trim());
    var c = h + " " + f;
    var i = k + " " + (j == "-" ? "": j);
    e += "  " + c + "(" + i + ") 收";
    $("#mailerBlobConfirm").text(e.trim());
    $("#postAddressShowContent").text(e.trim())
}
function buildMailBolb(f) {
    var a = $("#postProvince option:selected").text().replace("-", "");
    var e = $("#postCity option:selected").text().replace("-", "");
    var d = $("#postDistrict option:selected").text().replace("-", "");
    var c = $("#postProvince option:selected").val();
    var b = "";
    if (c == "11" || c == "12" || c == "31" || c == "50") {} else {
        b += a
    }
    if (e == "省直辖县级行政区划") {
        e = ""
    }
    b += e + d + f;
    $("#mailerBlob").val(b.trim())
}
function showScoreRecipientPage(c, g, e, b, a, f) {
    if (g) {
        location.hash = c
    }
    var d = c.replace("#!/", "");
    $(window).hashchange({
        hash: c,
        onSet: function() {
            layer.load(0, {
                shade: [0.2, "#000"]
            });
            $.ajax({
                type: "GET",
                url: d,
                data: {
                    neeaAppId: e,
                    appType: b,
                    optType: a,
                    errorMsg: f
                },
                success: function(h) {
                    layer.closeAll();
                    $("#wg_center").html(h);
                    $(window).scrollTop(0)
                }
            })
        },
        onRemove: function() {}
    })
}
function showScoreRecipientCreate(b, f, d, a, e) {
    if (f) {
        location.hash = b
    }
    var c = b.replace("#!/", "");
    $(window).hashchange({
        hash: b,
        onSet: function() {
            layer.load(0, {
                shade: [0.2, "#000"]
            });
            $.ajax({
                type: "GET",
                url: c,
                data: {
                    neeaAppId: d,
                    appType: a,
                    receiptType: e
                },
                success: function(g) {
                    layer.closeAll();
                    $("#wg_center").html(g);
                    $(window).scrollTop(0)
                }
            })
        },
        onRemove: function() {}
    })
}
function showScoreRecipientUpdate(b, g, d, e, f, a) {
    if (g) {
        location.hash = b
    }
    var c = b.replace("#!/", "");
    $(window).hashchange({
        hash: b,
        onSet: function() {
            layer.load(0, {
                shade: [0.2, "#000"]
            });
            $.ajax({
                type: "GET",
                url: c,
                data: {
                    neeaAppId: d,
                    receiptId: e,
                    appType: a,
                    receiptType: f
                },
                success: function(h) {
                    layer.closeAll();
                    $("#wg_center").html(h);
                    $(window).scrollTop(0)
                }
            })
        },
        onRemove: function() {}
    })
}
function showUpdateScorePsr(b, e, d, a) {
    if (e) {
        location.hash = b
    }
    var c = b.replace("#!/", "");
    $(window).hashchange({
        hash: b,
        onSet: function() {
            layer.load(0, {
                shade: [0.2, "#000"]
            });
            $.ajax({
                type: "GET",
                url: c,
                data: {
                    neeaAppId: d,
                    appType: a
                },
                success: function(f) {
                    layer.closeAll();
                    $("#wg_center").html(f);
                    $(window).scrollTop(0)
                }
            })
        },
        onRemove: function() {}
    })
}
function showResendScore(a, e, c, d) {
    if (e) {
        location.hash = a
    }
    var b = a.replace("#!/", "");
    $(window).hashchange({
        hash: a,
        onSet: function() {
            layer.load(0, {
                shade: [0.2, "#000"]
            });
            $.ajax({
                type: "GET",
                url: b,
                data: {
                    neeaAppId: c,
                    type: d
                },
                success: function(f) {
                    layer.closeAll();
                    $("#wg_center").html(f);
                    $(window).scrollTop(0)
                }
            })
        },
        onRemove: function() {}
    })
}
function initItemValue(c, a) {
    var b = c.split(",");
    $.each(b,
    function(d, e) {
        $("input[name=" + a + "]").each(function() {
            if ($(this).val() == e) {
                $(this).attr("checked", true)
            }
        })
    })
}
function showErrorTip(a) {
    layer.msg(a, {
        time: 2000,
        icon: 0,
        shift: 0
    })
}
function cancelOthers(b, a) {
    if (b.is(":checked") == true) {
        $("[name = " + a + "]:checkbox").prop("checked", false);
        b.prop("checked", true)
    }
}
function cancelUndecided(a, b) {
    if (a.is(":checked") == true) {
        $("#" + b).prop("checked", false)
    }
}
function isContained(f, e) {
    if (! (f instanceof Array) || !(e instanceof Array)) {
        return false
    }
    if (f.length < e.length - 1) {
        return false
    }
    var d = f.toString();
    for (var g = 0,
    c = e.length; g < c; g++) {
        if (d.indexOf(e[g]) == -1) {
            return false
        }
    }
    return true
}
function checkMobileVerify(b) {
    if (b == "") {
        return false
    } else {
        if (b.length != 6) {
            return false
        } else {
            var a = /^[0-9]+$/;
            return a.test(b)
        }
    }
    return true
}
function showMbsHist(a) {
    layer.open({
        type: 2,
        title: '<span style="font-style: italic;font-size:20px;"><strong>' + a + "</strong></span>",
        shade: 0.3,
        area: ["80%", "580px"],
        content: "mbs/showMbsHist"
    })
}
function showMbs(a) {
    $.ajax({
        type: "GET",
        url: "mbs/showMbs",
        data: {
            source: a
        },
        success: function(b) {
            $("#mbsDiv").html(b)
        }
    })
}
function getLastestMbs(a) {
    $.ajax({
        type: "POST",
        data: $("#frmMbsRequest").serialize(),
        url: "mbs/sendMbsRequest",
        success: function(b) {
            if (b == "OK") {
                showMbs(a)
            } else {
                $("#errorMsgDiv").show();
                $("#errorMsg").html(b)
            }
        }
    })
}
function refreshMbs(a) {
    $.ajax({
        type: "GET",
        url: "mbs/refreshMbs",
        success: function(b) {
            if (b != "") {
                showMbs(a)
            } else {
                setTimeout(function() {
                    refreshMbs(a)
                },
                120000)
            }
        }
    })
};