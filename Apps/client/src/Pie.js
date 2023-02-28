import React, { useEffect, useRef} from "react";
import * as d3 from "d3";

const Pie = props =>{
    const ref = useRef(null);
    const cache = useRef(props.data);
    const creatPie = d3
        .pie() //オプションを設定？
        .value(d => d.value)
        .sort(null);
    const createArc = d3
        .arc()
        .innerRadius(props.innerRadius)
        .outerRadius(props.outerRadius);
    const colors = d3.scaleOrdinal(d3.schemeCategory10);//適当に10色選ぶ？
    const format = d3.format(".2f");

    useEffect(
        () => {
            const data = createPie(props.data);//????よくわからんぞ
            const prevData = createPie(cache.current);
            const group = d3.select(ref.current);
            const groupWithData = group.selectAll("g.arc").data(data);

            groupWithData.exit().remove();

            const groupWithUpdate = groupWithData
                .enter()
                .append("g") //g要素を追加する
                .attr("class", "arc"); //新しいg要素にarcクラスを設定する
            
            const path = groupWithUpdate
                .append("path")
                .merge(groupWithData.select("path.arc"));
            
            const arcTween = (d, i) => {
                const interpolator = d3.interpolate(prevData[i], d);
                return t => createArc(interpolator(t));
            }

            
            
        }
    )
}