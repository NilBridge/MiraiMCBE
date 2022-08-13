"use strict" //oicq需要开启严格模式
//LiteXLoader Dev Helper
/// <reference path="c:\Users\amsq\.vscode\extensions\moxicat.lxldevhelper-0.1.8/Library/JS/Api.js" /> 

const { createClient,  Client } = require('oicq');
const {readFrom,WriteTo,exists,createDir} = require('./file');
//const logger = new NIL.Logger("QQManager");

if (exists('./plugins/MiraiMCBE/Data/QQ.json') == false) {
    createDir('./plugins/MiraiMCBE');
    createDir('./plugins/MiraiMCBE/data');
    WriteTo('./plugins/MiraiMCBE/QQ.json', '[]');
}

const Clients = new Map();

function AddConfig(qq) {
    bots.push({
        "qq": qq,
        "pwd": "1234567",
        "platform": 2,
        "qrcode": true
    });
    WriteTo('./plugins/MiraiMCBE/Data/QQ.json', JSON.stringify(bots, null, '\t'));
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
    //client.on("system.online", getOnRobotOnline(qq));
    //client.on('message.group',getOnMessage(qq));
    //client.on('notice.group.decrease', getOnMemeberLeft());
}

function autoLogin(qq, pwd, platform, qrcode = true) {
    const client = createClient(qq, { platform, kickoff: false, ignore_self: true, resend: true, brief: true });
    Clients.set(qq, client);
    addOnEvent(client, qq);
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

module.exports = {autoLogin}