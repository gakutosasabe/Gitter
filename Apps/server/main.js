var express = require('express');
const net = require("net");
const fs = require("fs");

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

//JSONファイルを読み込み
const data = fs.readFileSync('guiter_detect.json');
const json_detect_file = JSON.parse(data); 

//3002ポートでTCP/IPサーバーを立ち上げ
const server= net.createServer(socket => {
    socket.on('data', data => {
        console.log(data + 'from' + socket.remoteAddress + ':' + socket.remotePort);
        socket.write('server -> Repeating' + data);
        const message = data.toString(); 
        const splitarray = message.split(':');

        if (splitarray.length === 2) {
            const guitter_detect = splitarray[0];
            const time_stamp = splitarray[1];
            let detect_info = {guiter_detect : guitter_detect, time : time_stamp}; //object型でJSONの内容を定義
            let json_detect_info = JSON.stringify(detect_info); //jsonに変換
            json_detect_file.unshift(json_detect_info); //guiter_detect.jsonの先頭に追加
            fs.writeFileSync('guiter_detect.json', JSON.stringify(json_detect_file));//書き込み
            
          } else {
            console.log("Symbol not found or not in expected format");
          }
    });

    socket.on('close', () =>{
        console.log('client closed connection');
    });
}).listen(3002);

console.log('TCP/IP server listening on port 3002');
