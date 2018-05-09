### 簡介
這是一個簡單的 log 檔搜尋工具
只要幾個步驟就可以從檔案中找出想要的關鍵訊息

### 步驟
- 把要查詢的 log 檔放到 /log 底下
- 修改 arg.js 設定分隔字串和要查詢的關鍵字
- 執行 `node --max_old_space_size=4096 traceLog.js` 參數 max_old_space_size 為每次 memory 的 mb 最大值, 請酌量調整避免 log 檔過大而無法執行
- 搜尋出來的結果會輸出到 /output 底下