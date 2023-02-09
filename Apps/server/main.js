var express = require('express');

//expressのインスタンスを作成
const app = express();

//ポート番号を指定
const port = 3001;

//'/api'パスにget要求があった際に実行する処理
app.get('/api',(req, res) => {
    res.send('From Node.js Call');
});

//3000ポートでlisten
app.listen(port, () => {
    console.log(`listening on *:${port}`);
})