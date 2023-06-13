import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import glucose from "../../tidepool_loader/cbg.json";

interface TimeSeriesData {
  date: Date;
  value: number;
}

export const Chart = () => {
  const chartRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = d3.select(chartRef.current);

    const margin = { top: 20, right: 20, bottom: 40, left: 40 };
    const width = chartRef.current?.parentElement?.clientWidth || 0;
    const height = chartRef.current?.parentElement?.clientHeight || 0;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const data = glucose.map((d) => ({
      date: new Date(d.time),
      value: d.value,
    }));
    // const data = [
    //   { date: new Date("2023-01-01"), value: 5 },
    //   { date: new Date("2023-02-01"), value: 6 },
    //   { date: new Date("2023-03-01"), value: 6.5 },
    //   { date: new Date("2023-04-01"), value: 7 },
    //   { date: new Date("2023-05-01"), value: 5.5 },
    //   { date: new Date("2023-06-01"), value: 5 },
    // ];

    const xScale = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.date) as [Date, Date])
      .range([0, innerWidth]);

    const yScale = d3.scaleLinear().domain([0, 16]).range([innerHeight, 0]);

    const line = d3
      .line<{ date: Date; value: number }>()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.value));

    svg.attr("width", width).attr("height", height);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    g.append("rect")
      .attr("class", "range-background")
      .attr("x", 0)
      .attr("y", yScale(10))
      .attr("width", innerWidth)
      .attr("height", yScale(4) - yScale(10))
      .classed("green-200 opacity-30", true)
      .style("fill-opacity", 0.3);

    // g.append("path").datum(data).attr("d", line);
    g.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d.date))
      .attr("cy", (d) => yScale(d.value))
      .attr("r", 3)
      .classed("dotted", true)
      .style("fill", (d) => d.value >= 4 && d.value <= 10 && "black")
      .style("fill", (d) => d.value > 10 && d.value <= 13 && "goldenrod")
      .style("fill", (d) => d.value > 13 && "red")
      .style("fill", (d) => d.value < 4 && "red");

    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-0.8em")
      .attr("dy", "0.15em")
      .attr("transform", "rotate(-45)");

    g.append("g").call(d3.axisLeft(yScale));

    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -innerHeight / 2)
      .attr("y", -margin.left + 15)
      .attr("text-anchor", "middle")
      .text("Blood Glucose (mmol)");
  }, []);

  return (
    <div className="w-auto h-96 m-10">
      <h3 className="text-2xl font-semibold leading-6 text-gray-900 text-center">
        Todays Blood Glucose Data
      </h3>
      <svg ref={chartRef} className="w-full h-full"></svg>
    </div>
  );
};
