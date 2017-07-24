# 說明

改編自[https://github.com/aspnet/JavaScriptServices](https://github.com/aspnet/JavaScriptServices)


調整的部份有，捨棄typescript，並增加以下功能
- 單元測試：使用jest以及enzyme
- storybook：展示模組
- webpack auto mapping entry：放置在src第一層目錄下的jsx檔會自動視為entry點
- scss loader：使用scss
- es6 babel：使用es6新語法
- eslint：檢查語法錯語


## 初始化

首先安裝相關的node module

```
yarn install

```

載下來之後，在專案目錄下執行令


```
dotnet restore

dotnet build

dotnet publish

```



# 運行專案

```
npm run dev
```

# 運行前端單元測試

```
npm test
```

# 運行storybook展示模組

```
npm run storybook
```

以上 其他待補


