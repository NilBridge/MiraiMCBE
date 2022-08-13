//LiteXLoader Dev Helper
/// <reference path="c:\Users\amsq\.vscode\extensions\moxicat.lxldevhelper-0.1.8/Library/JS/Api.js" /> 

const { addClient, autoLogin,getBot } = require('./utils/qq');

require('./utils/qq');

//注册指令
mc.listen("onServerStarted", () => {
    let cmd = mc.newCommand("mirai", "mirai Bot Command", PermType.GameMasters);
    cmd.setAlias("mbot");
  
    cmd.setEnum("ListAction", ["login","help",'gui']);
    cmd.setEnum("LoginAction", ["login", "logout"]);
    cmd.setEnum('SendAction',['send']);
    //cmd.setEnum('AutoLoginAtion',['autologin']);
  
    //注册参数
    cmd.mandatory("action", ParamType.Enum, "ListAction", 1);
    cmd.mandatory("action", ParamType.Enum, "LoginAction", 1);
    cmd.mandatory("action", ParamType.Enum, "SendAction", 1);
    //cmd.mandatory('action', ParamType.Enum, 'AutoLoginAction',1);
    cmd.mandatory("qq", ParamType.String);
    cmd.mandatory("group", ParamType.String);
    cmd.mandatory("msg", ParamType.String);
  
    //注册指令
    cmd.overload(["ListAction"]);
    cmd.overload(['SendAction','qq','group','msg']);
    cmd.overload(["LoginAction", "qq"]);
    //cmd.overload(['AutoLoginAction','qq']);

    //回调函数
    cmd.setCallback((_cmd, _ori, out, res) => {
      switch (res.action) {
        case "login":
            out.success(`§a正在登录：§6${res.qq}`);
            autoLogin(res.qq,null,true);
            break;
        case "logout":
            out.success(`§a正在下线：§6${res.qq}`);
            break;
        case "send":
            out.success(`§a正在向：§6${res.group}§a 发送 §e ${res.msg}`);
            getBot(res.qq).sendGroupMsg(res.group,res.msg);
            break;
        //帮助
        case "help":
          out.success("§aMiariMCBE Command");
          out.success("§a/mirai login <qq> §e登录一个QQ");
          out.success("§a/mirai logout <qq> §e下线一个QQ");
          out.success("§a/mirai send <qq> <group> <msg> §e发送一条群消息");
          break;
      }
    });
    cmd.setup();
  });


process.on('unhandledRejection', (err) => {
    console.log(err);
});
