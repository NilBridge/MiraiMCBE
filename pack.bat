chcp 65001

rd tmp /s

: set /p v=[%date% %time%] 请输入版本号：

md tmp
md "tmp/MiraiMCBE"

: 如果要复制.git文件夹就加上 /h 参数
xcopy src "tmp/MiraiMCBE" /s /e /exclude:%cd%\pack.config
: /exclude:%cd%\pack.config

7z a tmp/MiraiMCBE.llplugin tmp/MiraiMCBE

pause