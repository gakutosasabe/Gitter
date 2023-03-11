import React, {Component} from 'react';
import * as d3 from "d3";

class BarChart extends Component{

    componentDidMount(){
        this.drawChart();
    }

    drawChartWeekly(dataset){

        var width = 700;
        var height = 100;
        var bar_width = 20;
        var bar_padding = 1;
        
        var svg = d3.select("body")
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height);

        svg.selectAll("rect")
            .data(dataset)
            .enter()
            .append("rect")
            .attr("x", function(d,i){
                //dがdatasetの中身，iが入れるのインデックス
                //棒グラフの開始点をずらす
                return i * 20;
            })
            .attr("y", 0) //y座標
            .attr("width", 20)
            .attr("height", function(d){
                return d[1]; //datasetの中の一番目の要素(練習時間)
            });

        
        

        
    }

    render(){
        return <div id ={"#" + this.props.id}></div>
    }
}