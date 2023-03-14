import './App.css';
import BarChart from './BarChart';
import { useState,useEffect } from 'react';
import SearchJson from'./SearchJson';


function App() {
  //useStateの初期値(空)を設定
  const [guiter_json, setJson] = useState('');
  const searchjson = new SearchJson();

  useEffect(() => {
    //fetchでバックエンドExpressのサーバーを指定
    fetch('/api')
      .then((res) => res.json())
      //生成したjsオブジェクトをdataに代入
      //取り出したデータをuseStateに保存
      .then((data) => {
        setJson(JSON.stringify(data));
        const practice_array = searchjson.jsonToDateArray(data);
        console.log(practice_array);
      });
  });

  console.log(practice_array);
  
  //returnの段階ではpractice_arrayはundefinedになっている
  return (
    <div className="App">
    <p>{ guiter_json }</p>
    <p>{console.log(practice_array)}</p> 
    </div>
  );
}

export default App;
