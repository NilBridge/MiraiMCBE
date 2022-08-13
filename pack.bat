chcp 65001

if exist tmp (
    rd tmp /s
)


md tmp
md "tmp/MiraiMCBE"

xcopy src "tmp/MiraiMCBE" /s /e /exclude:%cd%\pack.config

cd 7z

7za.exe a ../tmp/MiraiMCBE.zip ../tmp/MiraiMCBE/*

cd ../tmp

REN MiraiMCBE.zip MiraiMCBE.llplugin