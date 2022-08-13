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
    cmd.overload(['SendAction','qq','msg']);
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
            getBot(res.qq).sendGroupMsg(res.group,res.msg);
            break;
        //帮助
        case "help":
          out.success("§aGuild Bot Command");
          out.success("§a/gbot guild §e获取公会列表");
          out.success("§a/gbot channel <guild_id> §e获取公会频道列表");
          out.success("§a/gbot member <guild_id> §e获取公会成员列表");
          out.success("§a/gbot reload §e重载配置文件");
          break;
      }
    });
    cmd.setup();
  });