import React, { useEffect, useRef} from "react";
import * as d3 from "d3";

const Pie = props =>{
    const ref = useRef(null);
    const cache = useRef(props.data);
    const creatPie = d3
        .pie() //オプションを設定？
        .value(d => d.value)
        .sort(null);
}