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
    res.json(practice_info_array);//ローカルのJSONファイルを読み込んでそのまま送信する
  });

//3000ポートでlisten
app.listen(port, () => {
    console.log(`Express server listening on *:${port}`);
})

let practice_info_array = [];

try {
  practice_info_array = JSON.parse(fs.readFileSync('practice_info.json', 'utf8'));
} catch (err) {
  console.error(err);
}

//3002ポートでTCP/IPサーバーを立ち上げ
const server= net.createServer(socket => {
    socket.on('data', data => {
        console.log(data + 'from' + socket.remoteAddress + ':' + socket.remotePort);
        socket.write('server -> Repeating' + data);
        const message = data.toString(); 
        const status = message.replace("\u0000","");

        let practice_info = {practice_status : status, time : getTime()}; //object型でJSONの内容を定義
        console.log(JSON.stringify(practice_info));
        practice_info_array.push(practice_info); //practice_info.jsonの先頭に追加
        
        fs.writeFile('practice_info.json', JSON.stringify(practice_info_array, null, '    '), (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
            });
        
    
    });

    socket.on('close', () =>{
        //console.log('client closed connection');
    });

    socket.on('error', ()=>{
        //console.log('something error');
    })

}).listen(3002);

console.log('TCP/IP server listening on port 3002');

function getTime(){
    var date = new Date();
    let time_now = date.getFullYear()  //現在時刻
        + '/' + ('0' + (date.getMonth() + 1)).slice(-2) 
        + '/' +('0' + date.getDate()).slice(-2) 
        + ' ' +  ('0' + date.getHours()).slice(-2) 
        + ':' + ('0' + date.getMinutes()).slice(-2) 
        + ':' + ('0' + date.getSeconds()).slice(-2) 
        + '.' + date.getMilliseconds();
    return time_now;
}
