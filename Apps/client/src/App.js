import './App.css';
import BarChart from './BarChart';
import { useState,useEffect } from 'react';
import SearchJson from'./SearchJson';


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
      SearchJson.jsonToDateArray(data);
  });
  
  
  return (
    <div className="App">
    <p>{ guiter_json }</p>
    <BarChart //BarChart関数を実行
      data= {[12,5,6,6,9,10]}
      width = {700}
      height = {300}/>  
    </div>
  );
}

export default App;
