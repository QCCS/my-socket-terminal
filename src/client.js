/**
 * Created by zhouli on 2018/12/12
 * node.js中ws模块创建客户端
 */
var ws = require("ws");
var times = 0;
// url ws://127.0.0.1:6080
// 创建了一个客户端的socket,然后让这个客户端去连接服务器的socket
var sock = new ws("ws://47.100.13.168:6080");
//链接本地的服务
var sockLocal = new ws("ws://127.0.0.1:6080");
sock.on("open", function () {
    console.log("connect success !!!!");
    sock.send("HelloWorld1");
    // setInterval(function () {
    //     times++;
    //     sock.send("HelloWorld4" + times);
    // }, 2000)
    // sock.send(Buffer.alloc(10));
});

sock.on("error", function (err) {
    console.log("error: ", err);
});

sock.on("close", function () {
    console.log("close");
});

sock.on("message", function (data) {
    console.log("本地客户端收到远程服务：");
    console.log(data);
});


sockLocal.on("open", function () {
    console.log("connect success sockLocal !!!!");
    sockLocal.send("HelloWorld1 sockLocal");
    setInterval(function () {
        times++;
        sockLocal.send("HelloWorld4-local" + times);
    }, 2000)
    sockLocal.send(Buffer.alloc(10));
});

sockLocal.on("error", function (err) {
    console.log("error: ", err);
});

sockLocal.on("close", function () {
    console.log("close");
});

sockLocal.on("message", function (data) {
    console.log("本地客户端收到本地服务：");
    console.log(data);
    if(sock.readyState===1){
        sock.send("本地客户端发送本地服务端的数据："+times);
        sock.send(data);
    }
});
