

class JsonSearch{

    //Jsonから[日付,練習時間[分]]の配列にして返す
    jsonToDateArray(data){
        var last_time;
        var last_status;
        let array = [[]];

        json.forEach(obj =>  {
            const status = obj.practice_status;
            const strtime = obj.time;
            const time = newDate(strtime);
            if(last_status == "START" && status == "END"){
                //時間の差分を出す
                var diff = time.getTime() - last_time.getTime();
                //分に直す
                var diff_minutes = Math.abs(diff) / (60 * 1000);
                var date = time.getFullYear()
                + '/' + ('0' + (time.getMonth() + 1)).slice(-2)
                + '/' + ('0' + time.getDate()).slice(-2);

                //配列にPush
                array.push([date,diff_minutes]);


            }else{
                last_time = time;
                last_status = status;
            }
        });



    
        
        return array;
    }

}