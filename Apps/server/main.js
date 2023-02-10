// ---- ReactのためのExpressサーバー
var express = require('express');

//expressのインスタンスを作成
const app = express();

//ポート番号を指定
const port = 3001;

//'/api'パスにget要求があった際に実行する処理
app.get('/',(req, res) => {
    res.send('Node Server');
});

//'/api'パスにGET要求があった際に実行する処理
app.get('/api', (req, res) => {
    res.json({message: "From Node.js Message"});
  });

//3000ポートでlisten
app.listen(port, () => {
    console.log(`Express server listening on *:${port}`);
})

// ---- M5 stickのためのTCPサーバー
const net = require("net")

const server= net.createServer(socket => {
    socket.on('data', data => {
        console.log(data + 'from' + socket.remoteAddress + ':' + socket.remotePort);
        socket.write('server -> Repeating' + data);
    });

    socket.on('close', () =>{
        console.log('client closed connection');
    });
}).listen(3002);

console.log('TCP/IP server listening on port 3002');
