import './App.css';
import BarChart from './BarChart';
import { useState,useEffect } from 'react';
import SearchJson from'./SearchJson';
import HeatMap from '@uiw/react-heat-map';


function App() {
  //useStateの初期値(空)を設定
  const [guiter_json, setJson] = useState('');
  const [practice_array,setPracticeArray] = useState();
  const searchjson = new SearchJson();

  const value = [
    { date: '2016/01/11', count: 2 },
    { date: '2016/01/12', count: 20 },
    { date: '2016/01/13', count: 10 },
    ...[...Array(17)].map((_, idx) => ({ date: `2016/02/${idx + 10}`, count: idx, content: '' })),
    { date: '2016/04/11', count: 2 },
    { date: '2016/05/01', count: 5 },
    { date: '2016/05/02', count: 5 },
    { date: '2016/05/04', count: 11 },
  ];

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
    <HeatMap value={value} startDate={new Date('2016/01/01')} />
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
