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
    res.json(guiter_detect_array);//ローカルのJSONファイルを読み込んでそのまま送信する
  });

//3000ポートでlisten
app.listen(port, () => {
    console.log(`Express server listening on *:${port}`);
})

let guiter_detect_array = [];

try {
  guiter_detect_array = JSON.parse(fs.readFileSync('guiter_detect.json', 'utf8'));
} catch (err) {
  console.error(err);
}

//3002ポートでTCP/IPサーバーを立ち上げ
const server= net.createServer(socket => {
    socket.on('data', data => {
        console.log(data + 'from' + socket.remoteAddress + ':' + socket.remotePort);
        socket.write('server -> Repeating' + data);
        const message = data.toString(); 
        const splitarray = message.split('-');
        console.log(splitarray);

        if (splitarray.length === 2) {
            const guitter_detect = splitarray[0];
            console.log(guitter_detect);
            const time_stamp = splitarray[1];
            time_stamp = time_stamp.replace("\u0000","");//不要部分を削除
            console.log(time_stamp);
            let detect_info = {guiter_detect : guitter_detect, time : time_stamp}; //object型でJSONの内容を定義
            console.log(JSON.stringify(detect_info));
            guiter_detect_array.push(detect_info); //guiter_detect.jsonの先頭に追加
            console.log(guiter_detect_array);
            
            fs.writeFile('guiter_detect.json', JSON.stringify(guiter_detect_array, null, '    '), (err) => {
                if (err) throw err;
                console.log('The file has been saved!');
              });
        //    fs.writeFileSync('guiter_detect.json', JSON.stringify(json_detect_file));//書き込み
            
        //  } else {
        //    console.log("Symbol not found or not in expected format");
        }
    
    });

    socket.on('close', () =>{
        //console.log('client closed connection');
    });

    socket.on('error', ()=>{
        //console.log('something error');
    })

}).listen(3002);

console.log('TCP/IP server listening on port 3002');
