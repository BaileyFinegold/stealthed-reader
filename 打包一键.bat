\
@echo off
:: Stealthed Reader 一键打包脚本
echo ================================================
echo  Stealthed Reader - 一键打包 (.exe)
echo  将自动执行：npm install -> npm run dist
echo ================================================
echo.
cd /d %~dp0

:: 使用国内镜像加速（可选）
echo 正在设置 npm 镜像为 npmmirror...
npm config set registry https://registry.npmmirror.com

echo.
echo 正在安装依赖，请稍候...
call npm install
if errorlevel 1 (
  echo ********************************************************
  echo 依赖安装失败，请检查网络或 Node.js 环境后重试。
  echo ********************************************************
  pause
  exit /b 1
)

echo.
echo 开始打包 Windows 安装包...
call npm run dist
if errorlevel 1 (
  echo ********************************************************
  echo 打包失败！请检查上方日志信息。
  echo ********************************************************
  pause
  exit /b 1
)

echo.
echo 打包完成！正在打开 dist 目录...
if exist dist (
  start "" dist
  echo 安装包已生成：dist\Stealthed Reader Setup.exe
) else (
  echo dist 目录未找到，请检查打包日志。
)

pause
