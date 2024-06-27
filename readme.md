# AttackOnGame API

## 項目概述

AttackOnGame API是桌遊揪團網站【聚人】使用的後端API項目，目前是由Express框架構建，並通過Mongoose與MongoDB數據庫交互，支持跨域請求處理。

## 如何安装

Node.js 版本建議為：`v18.20.2`

### 取得專案

```bash
git clone https://github.com/KamiiLiu/attack_on_game_api.git
```

### 移動到專案內

```bash
cd attackongame_api
```

### 安裝套件

```bash
npm install
```

### 資料夾說明

```txt
attack_on_game_api
├─ dist               // TypeScript編譯後的JS檔
├─ node_modules       // 相關套件
├─ src
│  ├─ config          // 參數配置
│  ├─ controller      // 控制器
│  ├─ data            // 測試資料
│  ├─ dto             // Data Transfer Object
│  ├─ models          // 資料庫模型
│  ├─ routers         // 路由
│  ├─ utils           // 工具
│  ├─ validators      // 資料驗證
├─ .env.example       // 環境變數範例
├─ .eslintrc.js       // eslint設定檔
├─ .gitignore         // Git 忽略檔案
├─ .prettierrc.json   // Prettier 設定檔
├─ package-lock.json
├─ package.json
└─ tsconfig.json

```

## 專案技術

- node.js v18.20.2
- express v4.16.1
- mongoose v7.6.13
- jsonwebtoken v9.0.2

## 如何運行

### 開發期指令

```bash
npm run dev
```

開啟開發模式，伺服器運行在 http://localhost:3000/

### 編譯 TypeScript

```bash
npm run build
```

將 TypeScript 代碼編譯成 JavaScript

### 直接執行 TypeScript 代碼

```bash
npm start
```

直接運行 TypeScript 代碼

### 格式化 TypeScript 代碼

```bash
npm run format
```

使用 Prettier 工具格式化所有 TypeScript 文件。
