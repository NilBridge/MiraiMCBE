"use strict" //oicq需要开启严格模式
const { createClient,  Client } = require('oicq');
const logger = new NIL.Logger("QQManager");

if (NIL.IO.exists('./Data/QQ.json') == false) {
    NIL.IO.WriteTo('./Data/QQ.json', '[]');
}

const Clients = new Map();

function AddConfig(qq) {
    bots.push({
        "qq": qq,
        "pwd": "1234567",
        "platform": 2,
        "qrcode": true
    });
    NIL.IO.WriteTo('./Data/QQ.json', JSON.stringify(bots, null, '\t'));
}

function addClient(qq) {
    const client = createClient(qq, { platform: 2, kickoff: false, ignore_self: true, resend: true, brief: true });
    Clients.set(qq, client);
    client.on("system.login.qrcode", function (e) {
        process.stdin.once("data", (e) => {
            this.login();
        });
    }).login();
    addOnEvent(client, qq);
}

/**
 * 
 * @param {Client} client 
 * @param {*} qq 
 */
function addOnEvent(client, qq) {
    client.on("system.online", getOnRobotOnline(qq));
    client.on('message.group',getOnMessage(qq));
    client.on('notice.group.decrease', getOnMemeberLeft());
}

function autoLogin(qq, pwd, platform, qrcode = true) {
    const client = createClient(qq, { platform, kickoff: false, ignore_self: true, resend: true, brief: true });
    Clients.set(qq, client);
    addOnEvent(client, qq);
    client.on("system.login.slider", () => {
        logger.warn(qq, '触发设备锁');
        process.stdin.on("data", data => {
            client.submitSlider(data);
        })
    });
    if (qrcode) {
        client.on("system.login.qrcode", function (e) {
            process.stdin.once("data", (e) => {
                this.login();
            })
        }).login();
    } else {
        client.login(pwd);
    }
}

/**
 * 
 * @param {} qq 
 * @returns {Client}
 */
function getBot(qq) {
    return Clients.get(qq.toString());
}

function logout(qq) {
    Clients.get(qq).logout(false);
    Clients.delete(qq);
}

function logoutAll() {
    Clients.forEach((v, k) => { logout(k) });
}