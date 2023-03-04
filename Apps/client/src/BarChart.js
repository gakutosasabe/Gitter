import React, {Component} from 'react';
import * as d3 from "d3";

class BarChart extends Component{

    componentDidMount(){
        this.drawChart();
    }

    drawChart(){

        const data = this.props.data; //props = App.jsで入力したdata

        const svg = d3.select("body").append("svg")
            .attr("width", this.props.width)
            .attr("height", this.props.height);

        svg.selectAll("rect") //現状あるrectタグを全選択する
            .data(data)
            .enter()//要素を作る
            .append("rect")
            .attr("x",(d, i) => i*70) //要素の位置をiに70を乗算したものとしている
            .attr("y", (d,i) => 300 - 10 *d)
            .attr("width", 65)
            .attr("height", (d,i) => d * 10)
            .attr("fill","green");
        

    }
    render(){
        return <div id ={"#" + this.props.id}></div>
    }


}

export default BarChart;