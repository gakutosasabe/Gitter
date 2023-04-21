import './App.css';
import BarChart from './BarChart';
import { useState,useEffect } from 'react';
import SearchJson from'./SearchJson';
import HeatMap from '@uiw/react-heat-map';
import Tooltip from '@uiw/react-tooltip';



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
    <div className="App" style={{ position: 'relative' }}>
    {/* <p>{ guiter_json }</p> */}
    <p>{console.log(practice_array)}</p>
    <HeatMap
      style={{ 
        backgroundColor:'##d9d9d9',
        color: '#ad001d',
        position: 'absolute', 
        top: '185px', 
        left: '60px' }}
      value={practice_array}
      width={1200}
      height ={300}
      rectSize={20}
      startDate={new Date('2023/01/01')}
      panelColors={{
        0: '#f4decd',
        1: '#e4b293',
        10: '#d48462',
        30: '#c2533a',
        80: '#ad001d',
        120: '#000',
      }}
      rectRender={(props, data) => {
        // if (!data.count) return <rect {...props} />;
        return (
          <Tooltip key={props.key} placement="top" content={`practicetime: ${data.count || 0}minute`}>
            <rect {...props} />
          </Tooltip>
        );
      }}
    ></HeatMap>
    {practice_array &&
    <BarChart //BarChart関数を実行
      dataset = {practice_array}
      width = {600}
      height = {280}
    />
    }
    </div>
  );
}

export default App;
