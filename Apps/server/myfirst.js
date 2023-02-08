var express = require('express');

//expressのインスタンスを作成
const app = express();

//ポート番号を指定
const port = 3000;

//'/'パスにget要求があった際に実行する処理
app.get('/',(req, res) => {
    res.send('Hello World!');
});

//3000ポートでlisten
app.listen(port, () => {
    console.log(`listening on *:${port}`);
})