

class SearchJson{

    //Jsonから[日付,練習時間[分]]の配列にして返す
    jsonToDateArray(data){
        var last_time;
        var last_status;
        let array = [[]];

        data.forEach(obj =>  {
            const status = obj.practice_status;
            const strtime = obj.time;
            const time = new Date(strtime);
            if(last_status == "START" && status == "END"){
                //時間の差分を出す
                var diff = time.getTime() - last_time.getTime();
                //秒に直す
                var diff_minutes = Math.abs(diff) / (1000);
                var dates = time.getFullYear()
                + '/' + ('0' + (time.getMonth() + 1)).slice(-2)
                + '/' + ('0' + time.getDate()).slice(-2);
                //ここまではいけてそう

                
                array.forEach(function(value,index){

                    if(dates == value[0]){ //日付が一緒なら練習時間を加算
                        value[1] = value[1] + diff_minutes;
                    }else{
                        //日付が違えば配列に追加
                        array.push([dates,diff_minutes]);
                        console.log(array);
                    }
                })

                last_time = time;
                last_status = status;

            }else{
                last_time = time;
                last_status = status;
            }
        });
        return array;
    }

}

export default SearchJson;
