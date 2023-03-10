import './App.css';
import BarChart from './BarChart';
import { useState,useEffect } from 'react';
import SearchJson from'./SearchJson';

var data;

function App() {
  //useStateの初期値(空)を設定
  const [guiter_json, setJson] = useState('');
  const [practice_array, setData] = useState('');

  useEffect(() => {
    //fetchでバックエンドExpressのサーバーを指定
    fetch('/api')
      .then((res) => res.json())
      //生成したjsオブジェクトをdataに代入
      //取り出したデータをuseStateに保存
      .then((data) => {
        setJson(JSON.stringify(data));
        setData(data);
      });
  });

  useEffect(() => {
    if (practice_array) {
      const searchjson = new SearchJson();
      searchjson.jsonToDateArray(practice_array);
    }
  }, [practice_array]);
  
  
  return (
    <div className="App">
    <p>{ guiter_json }</p>
  
    <BarChart //BarChart関数を実行
      data= {[70,60,30,40,60]}
      width = {700}
      height = {300}/>  
    </div>
  );
}

export default App;
