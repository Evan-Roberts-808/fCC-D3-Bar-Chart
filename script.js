import * as d3 from "https://cdn.jsdelivr.net/npm/d3@5/+esm";

let gdpData = []
const width = 800
const height = 600
const padding = 40
let heightScale
let xScale
let xAxisScale
let yAxisScale

const container = document.getElementById('visual-container')
let svg = d3.select(container)
            .append('svg')

// User Story 1
svg.append("text")
    .attr("id", "title")
    .attr("text-anchor", "middle")
    .attr("transform", `translate(${width / 2}, ${padding})`)
    .text("United States GDP")

const drawCanvas = () => {
    svg.attr('width', width)
    svg.attr('height', height)
}

const generateScales = () => {
    heightScale = d3.scaleLinear()
                        .domain([0, d3.max(gdpData, d => d[1])])
                        .range([0, height - (2 * padding)])
    
    xScale = d3.scaleLinear()
                    .domain([0, gdpData.length - 1])
                    .range([padding, width - padding])
                    
    let dates = gdpData.map((date) => new Date(date[0]))

    xAxisScale = d3.scaleTime()
                        .domain([d3.min(dates), d3.max(dates)])
                        .range([padding, width - padding])

    yAxisScale = d3.scaleLinear()
                        .domain([0, d3.max(gdpData, d => d[1])])
                        .range([height - padding, padding])
}

const drawBars = () => {

    let tooltip = d3.select('body')
                    .append('div')
                    .attr('id', 'tooltip')
                    .style('visibility', 'hidden')
                    .style('width', 'auto')
                    .style('height', 'auto')

    svg.selectAll('rect')
        .data(gdpData)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('width', (width - (2 * padding)) / gdpData.length)
        .attr('data-date', (item) => {
            return item[0]
        })
        .attr('data-gdp', (item) => {
            return item[1]
        })
        .attr('height', (item) => {
            return heightScale(item[1])
        })
        .attr('x', (item, index) => {
            return xScale(index)
        })
        .attr('y', (item) => {
            return (height - padding) - heightScale(item[1])
        })
        .on('mouseover', (item) => {
            tooltip.transition()
                .style('visibility', 'visible')

            tooltip.text(`${item[0]}\n$${item[1]} Billion`)

            document.querySelector('#tooltip').setAttribute('data-date', item[0])
        })
        .on('mouseout', (item) => {
            tooltip.transition()
                .style('visibility', 'hidden')
        })   
}

const generateAxis = () => {
    let xAxis = d3.axisBottom(xAxisScale)

    svg.append("g")
        .call(xAxis)
        .attr('id', 'x-axis')
        .attr('transform', 'translate(0,' + (height  - padding) + ')')
    
    let yAxis = d3.axisLeft(yAxisScale)

    svg.append("g")
        .call(yAxis)
        .attr('id', 'y-axis')
        .attr('transform', 'translate(' + padding + ', 0)')
}

let req = new XMLHttpRequest()
let url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json'
req.open('GET', url, true)
req.onload = () => {
    const data = JSON.parse(req.responseText)
    gdpData = data.data
    drawCanvas()
    generateScales()
    drawBars()
    generateAxis()
}
req.send()
