

class SearchJson{

    //Jsonから[日付,練習時間[分]]の配列にして返す
    jsonToDateArray(data){
        var last_time;
        var last_status;
        var last_dates;
        let array = [];

        data.forEach(obj =>  {
            const status = obj.practice_status;
            const strtime = obj.time;
            const time = new Date(strtime);

            var dates = time.getFullYear()
                + '/' + ('0' + (time.getMonth() + 1)).slice(-2)
                + '/' + ('0' + time.getDate()).slice(-2);
            
            if(last_status == "START" && status == "END" && last_dates == dates){
                //時間の差分を出す
                var diff = time.getTime() - last_time.getTime();
                //分に直す
                var diff_minutes = Math.abs(diff) / (1000 * 60);
                //ここまではいけてそう
                
                var detect = false;

                //日付が被れば分数を加算
                for(let i=0; i<array.length; i++){
                    if(array[i].date == dates){
                        console.log(diff_minutes);
                        array[i].count += diff_minutes;
                        array[i].count = array[i].count; //ゴミが残るのでもう一度切り捨て
                        console.log(array[i].count);
                        detect = true;
                        break;
                    }
                }

                if(detect == false){//追加先の日付が見つからなかったら
                    if(array.length == 1){
                        array.push({date: dates, count :diff_minutes});
                    }else{
                    array.push({date: dates,count: diff_minutes});
                    }
                }

                last_time = time;
                last_status = status;
                last_dates = dates;

            }else{
                last_time = time;
                last_status = status;
                last_dates = dates;
            }
        });
        console.log(array);
        return array;
    }

}

export default SearchJson;
