 // let ip = "192.168.43.215:8080";
let ip = "125.217.34.51:8080";
let host = "http://" + ip;
$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
$(function () {
    $.ajaxSetup({
        timeout: 10000
    });
});

function publish() {
    var o = $('#form1').serializeObject();
    $.ajax({
        type: "POST",
        url: host + "/topic/publish",
        data: JSON.stringify(o),
        headers: {
            Authorization: "shimei " + localStorage.getItem("userkey")
        },
        contentType: "application/json",
        success: function (msg) {
            if (msg.status == 200) {
                alert("发布成功")
                window.location = "../home.html"
            } else {
                alert("发布失败")
            }
        },
        error: function (msg) {
            alert("无法连接到服务器，请重新尝试")
        }
    })
}

function loginAAA() {
    var key = localStorage.getItem("userkey");
    if (key != null) {
        $.ajax({
            type: "POST",
            url: host + "/user/loginKey",
            data: key,
            headers: {
                Authorization: "shimei " + localStorage.getItem("userkey")
            },
            contentType: "application/json",
            success: function (msg) {
                if (msg.status == 200) {
                    localStorage.setItem("userkey", msg.msg);
                    window.location = "home.html"
                } else {
                    localStorage.setItem("userkey", null);
                    alert("凭据过期，请重新输入账号密码登录")
                }
            },
            error: function (msg) {
                localStorage.setItem("userkey", null);
                alert("无法连接到服务器，请重新尝试")
            }
        })
    }
}