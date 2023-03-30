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

  // const value = [
  //   { date: '2016/01/11', count: 2 },
  //   { date: '2016/01/12', count: 20 },
  //   { date: '2016/01/13', count: 10 },
  //   ...[...Array(17)].map((_, idx) => ({ date: `2016/02/${idx + 10}`, count: idx, content: '' })),
  //   { date: '2016/04/11', count: 2 },
  //   { date: '2016/05/01', count: 5 },
  //   { date: '2016/05/02', count: 5 },
  //   { date: '2016/05/04', count: 11 },
  // ];

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
    <p style={{"backgroundColor":"##D9D9D9"}}>{ guiter_json }</p>
    <p>{console.log(practice_array)}</p>
    <HeatMap
      style={{ 
        backgroundColor:'##d9d9d9',
        color: '#ad001d',
        position: 'absolute', 
        top: '300px', 
        left: '100px' }}
      value={practice_array}
      width={600}
      height ={1000}
      rectSize={14}
      startDate={new Date('2023/01/01')}
      panelColors={{
        0: '#f4decd',
        2: '#e4b293',
        4: '#d48462',
        10: '#c2533a',
        20: '#ad001d',
        30: '#000',
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
      width = {700}
      height = {300}
    />
    }
    </div>
  );
}

export default App;
