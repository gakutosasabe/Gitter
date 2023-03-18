import './App.css';
import BarChart from './BarChart';
import { useState,useEffect } from 'react';
import SearchJson from'./SearchJson';


function App() {
  //useStateの初期値(空)を設定
  const [guiter_json, setJson] = useState('');
  const [practice_array,setPracticeArray] = useState();
  const searchjson = new SearchJson();

  useEffect(() => {
    //fetchでバックエンドExpressのサーバーを指定
    fetch('/api')
      .then((res) => res.json())
      //生成したjsオブジェクトをdataに代入
      //取り出したデータをuseStateに保存
      .then((data) => {
        setJson(JSON.stringify(data));
        var practice = searchjson.jsonToDateArray(data);
        console.log(practice);
        setPracticeArray(practice);
      });
  },[]);
  
  //returnの段階ではpractice_arrayはundefinedになっている
  return (
    <div className="App">
    <p style={{"background-color":"##D9D9D9"}}>{ guiter_json }</p>
    <p>{console.log(practice_array)}</p>
    {practice_array &&
    <BarChart //BarChart関数を実行
      dataset = {practice_array}
      width = {700}
      height = {300}
    />
    }
    </div>
  );
}

export default App;
