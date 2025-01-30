## Kikka Hirado - 後端設置

## 專案目的
本專案的後端部分使用 Express 搭配 Firebase，負責處理用戶的註冊、登入、密碼重置等身份驗證功能，並確保資料能夠有效儲存在 Firebase 的資料庫中。專案的主要目的是學習如何在 Node.js 環境中整合 Firebase 並構建一個可靠的後端服務，同時強化對 CORS 配置、環境變數管理以及伺服器運行監控（使用 nodemon）的理解。

## 功能說明
- 用戶註冊：用戶通過電子郵件和密碼進行註冊，並且信息會儲存到 Firebase 中。
- 用戶登入：用戶可以使用電子郵件和密碼登錄系統，進行身份驗證。
- 密碼重置：用戶可以通過電子郵件發送密碼重置請求。
- Google 登入：提供 Google 帳號登入，支援 OAuth 2.0 認證流程。
- CORS 配置：設置 CORS 以確保前端與後端之間的跨域請求能夠順利進行。

## 使用技術
- Express.js：Node.js 的 Web 應用框架，用於搭建 RESTful API，處理用戶請求和響應。
- Firebase：提供身份驗證和資料儲存的服務。
- Firebase Authentication：處理用戶註冊、登入、密碼重置等。
- Firebase Admin SDK：管理 Firebase 用戶和資料，與 Firebase 服務進行交互。
- CORS：處理跨來源請求問題，確保前端和後端之間的順利通信。
- dotenv：加載環境變數，確保敏感信息（如 API 密鑰）不會被直接暴露在程式碼中。
- Zod：用於資料驗證，確保用戶輸入符合預期格式。

## 安裝與設置
1. 安裝依賴項
```sh
npm install
```
2. 配置環境變數
- 在專案根目錄下創建 .env 檔案，並設置變數
4. 啟動伺服器
```sh
nodemon index.js
```
或者使用：
```sh
node index.js
```
