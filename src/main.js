import * as d3 from "d3";
import * as d3_array from "d3-array";

// Margin convention.
const margin = { top: 10, right: 40, bottom: 5, left: 80 };
const width = 1200 - margin.right - margin.left;
const height = 700 - margin.top - margin.bottom;

let colorMap = new Map();
colorMap.set('s', '#3EC1D3');
colorMap.set('e', '#FF9A00');
colorMap.set('h', '#FF165D');
colorMap.set('p','#FFFFFF');

const cl = console.log;

const svg = d3
  .select('.chart-container')
  .append('svg')
  .attr('width', width + margin.right + margin.left)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

function ready(data){
  let dataSet = new Set();
  data.map( dat => dataSet.add(dat.a));

  let bBya = d3_array.group(data, d => d.a );

  let bOrd = [];
  for (let entry of bBya){
    let ord = 0;
    for (let e of entry[1] ){
      bOrd = [...bOrd, {b:e.b,ord:ord}]
      ord = ord + 1;
    }
  }

  function getOrd(b){
    let found = bOrd.find(element => element.b == b)
    return found.ord;
  }

  const yScale = d3
    .scaleBand()
    .domain(Array.from(dataSet.keys()))
    .rangeRound([0, height])
    .paddingInner(0.3);

  svg
    .append('g')
    .attr('class', 'dots')
    .selectAll('.dot')
    .data(Array.from(data))
    .join(
      enter => {
        enter
          .append('circle')
          .attr('class', 'dot-outer')
          .attr('cx', d => getOrd(d.b) * 15)
          .attr('cy',d => yScale(d.a))
          .attr('r',7)
          .attr('fill', d => colorMap.get(d.c));

          enter
          .append('circle')
          .attr('class', 'dot-inner')
          .attr('cx', d => getOrd(d.b) * 15 )
          .attr('cy', d => yScale(d.a))
          .attr('r', 4.5)
          .attr('fill', d => colorMap.get(d.d));
      }
    );

}


const parseNA = string => (string === 'NA' ? undefined : string);
// Type conversion.
function type(d) {
  return {
    a: parseNA(d.A),
    b: parseNA(d.B),
    c: parseNA(d.C),
    d: parseNA(d.D)
  };
}

  // Load data
d3.csv('data/simple.csv', type).then(res => {
  ready(res);
});