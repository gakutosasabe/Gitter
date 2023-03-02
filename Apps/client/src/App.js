import './App.css';
import { useState,useEffect } from 'react';


function App() {
  //useStateの初期値(空)を設定
  const [guiter_json, setJson] = useState('');

  useEffect(() => {
    //fetchでバックエンドExpressのサーバーを指定
    fetch('/api')
      .then((res) => res.json())
      //生成したjsオブジェクトをdataに代入
      //取り出したデータをuseStateに保存
      .then((data) => setJson(JSON.stringify(data)));
  });
  
  
  return (
    <div className="App">
      <h1>Gitter</h1>
      <p>{ guiter_json }</p>
    </div>
  );
}

export default App;
