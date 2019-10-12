# Expense Tracker
 > 用Express, MySQL 打造的記帳軟體

## Features
- 使用者可以瀏覽消費明細
- 提供`搜尋功能`(可依`月份`或`類別`交叉查詢)
- 使用者可新增、刪除、修改消費記錄
- 使用者註冊功能（facebook)

## Quick view

![login page](https://raw.githubusercontent.com/YunYuLo/expense-tracker-sequelize/master/public/img/login.png)
![register page](https://raw.githubusercontent.com/YunYuLo/expense-tracker-sequelize/master/public/img/register.png)
![main page](https://raw.githubusercontent.com/YunYuLo/expense-tracker-sequelize/master/public/img/main.png)



## Environment set up
```json
"dependencies": {
    "bcryptjs": "^2.4.3",
    "connect-flash": "^0.1.1",
    "dotenv": "^8.1.0",
    "express": "^4.17.1",
    "express-handlebars": "^3.1.0",
    "express-session": "^1.16.2",
    "method-override": "^3.0.0",
    "passport": "^0.4.0",
    "passport-facebook": "^3.0.0",
    "passport-local": "^1.0.0",
    "mysql2": "^1.7.0",
    "sequelize": "^5.19.4",
    "sequelize-cli": "^5.5.1"
  },
  }
```

### Installation.
1. Clone 此專案至電腦

```
git clone https://github.com/YunYuLo/expense-tracker-sequelize.git
```

2. 開啟終端機(Terminal)，進入存放此專案的資料夾

```
$ [~] cd expense-tracker-sequelize
```

3. 安裝 npm 套件

```
$ [~/expense-tracker-sequelize] npm install <套件名稱>
```

4. 設定config/config.json如下
```
"development": {
  "username": "root",
  "password": "<YOUR_WORKBENCH_PASSWORD>",
  "database": "record_sequelize",
  "host": "127.0.0.1",
  "dialect": "mysql",
  "operatorsAliases": false
}
```

5. 新增資料庫，並加入models
```
//MySQL Workbench
drop database if exists expense_tracker_sequelize;
create database expense_tracker_sequelize;
use expense_tracker_sequelize;

//Terminal
[~/expense-tracker-sequelize] $ npx sequelize db:migrate
```

6. 加入seeder
```
//新增
[~/expense-tracker-sequelize] $ npx sequelize-cli db:seed:all

//刪除
[~/expense-tracker-sequelize] $ npx sequelize-cli db:seed:undo:all
```

6. 導入.env至根目錄
```
FACEBOOK_ID=xxxxxxxx
FACEBOOK_SECRET=xxxxxxxx
FACEBOOK_CALLBACK=http://localhost:3000/auth/facebook/callback
```

7. 啟動伺服器，執行 app.js 檔案

```
$ [~/expense-tracker-sequelize] npm run dev
```

現在，在瀏覽器輸入 [http://localhost:3000](http://localhost:3000) 你可透過預設使用者，開始使用囉！

預設使用者帳號密碼
```json
{
  "name": "kiki",
  "email": "kiki@gmail.com",
  "password": "123456"
},

```

