import React, { useEffect, useState, useRef } from 'react'
import * as d3 from 'd3';



export default function AnalyticsFgsm(props) {
    
    console.log(props.original_json_filePath);

    const [originalData, setOriginalData] = useState(null);
    const [adversarialData, setAdversarialData] = useState(null);
    const OriginalhistogramRef = useRef(null);
    const AdversarialhistogramRef = useRef(null);

    useEffect(() => {
        fetch(props.original_json_filePath)
          .then(response => response.json())
          .then(jsonData => {
            setOriginalData(jsonData)
            console.log('Original Data:', jsonData); 
            console.log('In here');
        })
          .catch(error => console.error('Error fetching data:', error));
      }, []);


      useEffect(() => {
        fetch(props.adversarial_json_filePath)
          .then(response => response.json())
          .then(jsonData => {
            setAdversarialData(jsonData)
            console.log('Adversarial Data:', jsonData);
        })
          .catch(error => console.error('Error fetching data:', error));
      }, []);

      useEffect(() => {
        if (originalData) {
            // Clear the previous chart
            d3.select(OriginalhistogramRef.current).selectAll("*").remove();
            drawHistogram(originalData,OriginalhistogramRef);
        }
    }, [originalData]);

    useEffect(() => {
        if (adversarialData) {
            // Clear the previous chart
            d3.select(AdversarialhistogramRef.current).selectAll("*").remove();
            drawHistogram(adversarialData,AdversarialhistogramRef);
        }
    }, [originalData]);

    const drawHistogram = (data,  histogramRef) => {
        const margin = { top: 20, right: 30, bottom: 40, left: 40 };
        const width = 500 - margin.left - margin.right;
        const height = 300 - margin.top - margin.bottom;

        // Clear any existing SVG content before re-rendering
        d3.select(histogramRef.current).select("svg").remove();

        // Create the SVG element
        const svg = d3.select(histogramRef.current)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // X-axis scale (class names)
        const x = d3.scaleBand()
            .domain(data.map(d => d.class_name))
            .range([0, width])
            .padding(0.1);

        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "rotate(-10)")
            .style("text-anchor", "center");

        // Y-axis scale (confidence)
        const y = d3.scaleLinear()
            // .domain([0, d3.max(data, d => d.confidence)])
            .domain([0,1])
            .range([height, 0]);

        svg.append("g")
            .call(d3.axisLeft(y));

        // Create bars for the histogram
        svg.selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", d => x(d.class_name))
            .attr("y", d => y(d.confidence))
            .attr("width", x.bandwidth())
            .attr("height", d => height - y(d.confidence))
            .attr("fill", "steelblue");
    };

  return (
    <>
        <div ref={OriginalhistogramRef}></div>
        <div ref={AdversarialhistogramRef}></div>
    </>
  )
}
