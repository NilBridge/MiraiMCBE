chcp 65001

if exist tmp (
    rd tmp /s
)


: set /p v=[%date% %time%] 请输入版本号：

md tmp
md "tmp/MiraiMCBE"

: 如果要复制.git文件夹就加上 /h 参数
xcopy src "tmp/MiraiMCBE" /s /e /exclude:%cd%\pack.config
: /exclude:%cd%\pack.config

cd 7z

7za.exe a ../tmp/MiraiMCBE.zip ../tmp/MiraiMCBE/*

cd ../tmp

REN MiraiMCBE.zip MiraiMCBE.llplugin