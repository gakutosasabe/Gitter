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
        console.log(dataset);
        console.log(width);
        console.log(height);
        var bar_width = 20;
        var bar_padding = 1;
        var W_padding = 25;
        var H_padding = 10;
        var H = 100;

        var scale = d3.scaleLinear()
                        .domain([0, 60])
                        .range([0,H]);

        var yscale = d3.scaleLinear()
                        .domain([0, 60])
                        .range([H,0]);
        
        
        //SVG領域の追加と移動
        var svg = d3.select("body")
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height)
                    .attr("transform","translate(100,200)")//SVG自体の場所を移動
                    .style("background-color","#D9D9D9");

        //バーの追加
        svg.selectAll("rect")
            .data(dataset)
            .enter()
            .append("rect")
            .attr("x", function(d,i){
                //dがdatasetの中身，iが入れるのインデックス
                //棒グラフの開始点をずらす
                return i * (bar_width + 1) + W_padding;
            })
            .attr("y", function(d,i){
                return H - scale(d[1]) + H_padding;
            }) //y座標
            .attr("width", bar_width)
            .attr("height", function(d){
                return scale(d[1]); //datasetの中の一番目の要素(練習時間) * 10倍を高さとする
            })
            .attr("style","fill:red");
        
        //テキストの追加
        svg.selectAll("text")
            .data(dataset)
            .enter()
            .append("text")
            .text(function(d){
                return d[1];
            })
            .attr("text-anchor","middle")
            .attr("x", function(d,i){
                return i*(20 + 1) + 10 + W_padding;
            })
            .attr("y", function(d){
                return H - scale(d[1]) + 15 + H_padding;
            })
            .attr("font-size","10px")
            .attr("fill", "white");
        
        // y軸の追加
        var axis = d3.axisLeft()
                    .scale(yscale)
                    .ticks(3);

        svg.append("g")
            .attr("transform", "translate(" + W_padding +"," + H_padding +")")
            .attr("class","axis")
            .call(axis);


        
    }

    render(){
        return <div id ={"#" + this.props.id}></div>
    }
}

export default BarChart;