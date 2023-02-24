import './App.css';
import { useState,useEffect } from 'react';


function App() {
  //useStateの初期値(空)を設定
  const [message, setMessage] = useState('');

  useEffect(() => {
    //fetchでバックエンドExpressのサーバーを指定
    fetch('/api')
      .then((res) => res.json())
      //生成したjsオブジェクトをdataに代入
      //data.messageで取り出したデータをuseStateに保存
      .then((data) => setMessage(data.message));
  })
  
  
  return (
    <div className="App">
      <h1>Gitter</h1>
      <p>{ message }</p>
    </div>
  );
}

export default App;
