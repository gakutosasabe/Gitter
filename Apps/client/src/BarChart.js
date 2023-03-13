import React, {Component} from 'react';
import * as d3 from "d3";

class BarChart extends Component{

    componentDidMount(){
        this.drawChart();
    }

    drawChart(){

        var width = this.props.width;
        var height = this.props.height;
        const dataset = this.props.dataset;
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
                return i * (bar_width + 1);
            })
            .attr("y", function(d,i){
                return 100 - d[1] * 10;
            }) //y座標
            .attr("width", bar_width)
            .attr("height", function(d){
                return d[1] * 10; //datasetの中の一番目の要素(練習時間) * 10倍を高さとする
            })
            .attr("style","fill:red");

        
    }

    render(){
        return <div id ={"#" + this.props.id}></div>
    }
}

export default BarChart;