

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
                
                var detect = false;

                for(let i=0; i<array.length; i++){
                    if(array[i][0] == dates){
                        array[i][1] += diff_minutes;
                        detect = true;
                        break;
                    }
                }

                if(detect == false){//追加先の日付が見つからなかったら
                    if(array.length == 1){
                        array[0] = [dates,diff_minutes];
                    }else{
                    array.push([dates,diff_minutes]);
                    }
                }

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
