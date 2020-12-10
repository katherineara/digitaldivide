/* global d3 */

const colors = ['#4daf4a', '#377eb8', '#ff7f00', '#984ea3', '#FFD700', '#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56'];

// Graph #1a
d3.csv('visual1a.csv', d3.autoType).then((dataset) => {
  d3.csv('visualincome2016.csv', d3.autoType).then((dataset2) => {
    const svg3 = d3.select('#graph1a')
      .attr('width', 900)
      .attr('height', 700);

    const margin = 90;
    const width = svg3.attr('width') - (margin * 2);
    const height = svg3.attr('height') - (margin * 2);

    const svg = svg3.append('g')
      .attr('transform', `translate(${margin * 1.5}, ${margin})`);

    const yScale = d3.scaleLinear()
      .range([height, 0])
      .domain([0, 50]);

    svg.append('g')
      .call(d3.axisLeft(yScale));

    const xScale = d3.scaleBand()
      .range([0, width])
      .domain(dataset.map((d) => d.income))
      .padding(0.2);

    svg.append('g')
      .attr('class', 'xaxis')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));

    d3.select('button.change1').style('visibility', 'hidden');
    d3.select('button.change2').style('visibility', 'hidden');

    svg.selectAll()
      .data(dataset)
      .enter()
      .append('rect')
      .attr('class', 'C')
      .attr('x', (d) => xScale(d.income) + 5)
      .attr('y', (d) => yScale(d.percentC))
      .attr('height', (d) => height - yScale(d.percentC))
      .attr('width', 30)
      .attr('fill', '#6b486b')
      .attr('rx', 5)
      .attr('ry', 5)
      .on('mouseover', function f1(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('opacity', '0.5');
        const xPosition = parseFloat(d.x) - 185;
        const yPosition = parseFloat(d.y) - 200;
        const f = d3.format('.1f');
        svg.append('text')
          .attr('id', 'tooltip')
          .attr('x', xPosition)
          .attr('y', yPosition)
          .attr('text-anchor', 'middle')
          .attr('font-size', '15px')
          .attr('fill', 'white')
          .text(`${f(i.percentC)}%`);
      })
      .on('mouseout', function f2(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('opacity', '1');
        d3.select('#tooltip').remove();
      });

    svg.selectAll()
      .data(dataset)
      .enter()
      .append('rect')
      .attr('class', 'I')
      .attr('x', (d) => xScale(d.income) + 35)
      .attr('y', (d) => yScale(d.percentI))
      .attr('height', (d) => height - yScale(d.percentI))
      .attr('width', 30)
      .attr('fill', '#FFD700')
      .attr('rx', 5)
      .attr('ry', 5)
      .on('mouseover', function f1(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('opacity', '0.5');
        const xPosition = parseFloat(d.x) - 185;
        const yPosition = parseFloat(d.y) - 200;
        const f = d3.format('.1f');
        svg.append('text')
          .attr('id', 'tooltip')
          .attr('x', xPosition)
          .attr('y', yPosition)
          .attr('text-anchor', 'middle')
          .attr('font-size', '15px')
          .attr('fill', 'white')
          .text(`${f(i.percentI)}%`);
      })
      .on('mouseout', function f2(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('opacity', '1');
        d3.select('#tooltip').remove();
      });

    // Legend
    svg.append('circle').attr('cx', 530).attr('cy', 50).attr('r', 6)
      .style('fill', '#6b486b');
    svg.append('circle').attr('cx', 530).attr('cy', 80).attr('r', 6)
      .style('fill', '#FFD700');
    svg.append('text').attr('x', 550).attr('y', 50).text('No Computer Access')
      .style('font-size', '15px')
      .attr('fill', 'white')
      .attr('alignment-baseline', 'middle');
    svg.append('text').attr('x', 550).attr('y', 80).text('No Internet Access')
      .style('font-size', '15px')
      .attr('fill', 'white')
      .attr('alignment-baseline', 'middle');

    // Axis Labels
    // Title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', -40)
      .attr('text-anchor', 'middle')
      .attr('font-weight', '400')
      .attr('fill', 'white')
      .text('Students with No Internet or Computer Access (Income)');

    // X Axis
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', height + 50)
      .attr('font-size', '15px')
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .text('Household Income');

    // Y Axis
    svg.append('text')
      .attr('x', -height / 2)
      .attr('y', -60)
      .attr('transform', 'rotate(-90)')
      .attr('font-size', '15px')
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .text('Percentage of Students in the US');

    // Change #2016
    d3.select('button.change2016')
      .on('click', () => {
        d3.select('button.change1').style('visibility', 'visible');
        d3.select('button.change2').style('visibility', 'visible');

        d3.selectAll('rect.C').remove();
        d3.selectAll('rect.I').remove();

        xScale.domain(dataset2.map((d) => d.income));

        svg.selectAll('g.xaxis')
          .transition().duration(2000)
          .call(d3.axisBottom(xScale));

        svg.selectAll('rect.C')
          .data(dataset2)
          .enter()
          .append('rect')
          .attr('class', 'C')
          .attr('x', (d) => xScale(d.income) + 25)
          .attr('y', (d) => yScale(d.percentC))
          .attr('height', (d) => height - yScale(d.percentC))
          .attr('width', 30)
          .attr('fill', '#6b486b')
          .attr('rx', 5)
          .attr('ry', 5);

        svg.selectAll('rect.I')
          .data(dataset2)
          .enter()
          .append('rect')
          .attr('class', 'I')
          .attr('x', (d) => xScale(d.income) + 50)
          .attr('y', (d) => yScale(d.percentI))
          .attr('height', (d) => height - yScale(d.percentI))
          .attr('width', 30)
          .attr('fill', '#FFD700')
          .attr('rx', 5)
          .attr('ry', 5);
      });

    // Change #1
    d3.select('button.change1')
      .on('click', () => {
        dataset2.sort((a, b) => d3.descending(a.order, b.order));
        xScale.domain(dataset2.map((d) => d.income));

        svg.selectAll('g.xaxis')
          .transition().duration(2000)
          .call(d3.axisBottom(xScale));

        svg.selectAll('rect.C')
          .data(dataset2)
          .transition()
          .duration(2000)
          .attr('x', (d) => xScale(d.income) + 25)
          .attr('y', (d) => yScale(d.percentC))
          .attr('height', (d) => height - yScale(d.percentC))
          .attr('width', 30)
          .attr('fill', '#6b486b')
          .attr('rx', 5)
          .attr('ry', 5);

        svg.selectAll('rect.I')
          .data(dataset2)
          .transition()
          .duration(2000)
          .attr('x', (d) => xScale(d.income) + 50)
          .attr('y', (d) => yScale(d.percentI))
          .attr('height', (d) => height - yScale(d.percentI))
          .attr('width', 30)
          .attr('fill', '#FFD700')
          .attr('rx', 5)
          .attr('ry', 5);
      });

    // Change #2
    d3.select('button.change2')
      .on('click', () => {
        dataset2.sort((a, b) => d3.ascending(a.order, b.order));
        xScale.domain(dataset2.map((d) => d.income));

        d3.select('button.change3').style('visibility', 'hidden');

        svg.selectAll('g.xaxis')
          .transition().duration(2000)
          .call(d3.axisBottom(xScale));

        svg.selectAll('rect.C')
          .data(dataset2)
          .transition()
          .duration(2000)
          .attr('x', (d) => xScale(d.income) + 25)
          .attr('y', (d) => yScale(d.percentC))
          .attr('height', (d) => height - yScale(d.percentC))
          .attr('width', 30)
          .attr('fill', '#6b486b')
          .attr('rx', 5)
          .attr('ry', 5);

        svg.selectAll('rect.I')
          .data(dataset2)
          .transition()
          .duration(2000)
          .attr('x', (d) => xScale(d.income) + 50)
          .attr('y', (d) => yScale(d.percentI))
          .attr('height', (d) => height - yScale(d.percentI))
          .attr('width', 30)
          .attr('fill', '#FFD700')
          .attr('rx', 5)
          .attr('ry', 5);
      });

    // Change #2020
    d3.select('button.change2020')
      .on('click', () => {
        d3.select('button.change1').style('visibility', 'hidden');
        d3.select('button.change2').style('visibility', 'hidden');

        d3.selectAll('rect.C').remove();
        d3.selectAll('rect.I').remove();

        xScale.domain(dataset.map((d) => d.income));

        svg.selectAll('g.xaxis')
          .transition().duration(2000)
          .call(d3.axisBottom(xScale));

        svg.selectAll('rect.C')
          .data(dataset)
          .enter()
          .append('rect')
          .attr('class', 'C')
          .attr('x', (d) => xScale(d.income) + 5)
          .attr('y', (d) => yScale(d.percentC))
          .attr('height', (d) => height - yScale(d.percentC))
          .attr('width', 30)
          .attr('fill', '#6b486b')
          .attr('rx', 5)
          .attr('ry', 5);

        svg.selectAll('rect.I')
          .data(dataset)
          .enter()
          .append('rect')
          .attr('class', 'I')
          .attr('x', (d) => xScale(d.income) + 35)
          .attr('y', (d) => yScale(d.percentI))
          .attr('height', (d) => height - yScale(d.percentI))
          .attr('width', 30)
          .attr('fill', '#FFD700')
          .attr('rx', 5)
          .attr('ry', 5);
      });
  });
});

// Graph #1b
d3.csv('visual2a.csv', d3.autoType).then((dataset) => {
  d3.csv('visualrace2016.csv', d3.autoType).then((dataset2) => {
    const svg3 = d3.select('#graph1b')
      .attr('width', 800)
      .attr('height', 700);

    const margin = 100;
    const width = svg3.attr('width') - (margin * 2);
    const height = svg3.attr('height') - (margin * 2);

    const svg = svg3.append('g')
      .attr('transform', `translate(${margin * 1.5}, ${margin})`);

    const yScale = d3.scaleLinear()
      .range([height, 0])
      .domain([0, 40]);

    svg.append('g')
      .call(d3.axisLeft(yScale));

    const xScale = d3.scaleBand()
      .range([0, width])
      .domain(dataset.map((d) => d.race))
      .padding(0.2);

    svg.append('g')
      .attr('class', 'xaxis')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));

    d3.select('button.change3').style('visibility', 'hidden');
    d3.select('button.change4').style('visibility', 'hidden');
    d3.select('button.change5').style('visibility', 'hidden');

    svg.selectAll()
      .data(dataset)
      .enter()
      .append('rect')
      .attr('class', 'computer')
      .attr('x', (d) => xScale(d.race) + 10)
      .attr('y', (d) => yScale(d.percentC))
      .attr('height', (d) => height - yScale(d.percentC))
      .attr('width', 30)
      .attr('fill', '#ff8c00')
      .attr('rx', 5)
      .attr('ry', 5)
      .on('mouseover', function f1(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('opacity', '0.5');
        const xPosition = parseFloat(d.x) - 185;
        const yPosition = parseFloat(d.y) - 200;
        const f = d3.format('.1f');
        svg.append('text')
          .attr('id', 'tooltip')
          .attr('x', xPosition)
          .attr('y', yPosition)
          .attr('text-anchor', 'middle')
          .attr('font-size', '15px')
          .attr('fill', 'white')
          .text(`${f(i.percentC)}%`);
      })
      .on('mouseout', function f2(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('opacity', '1');
        d3.select('#tooltip').remove();
      });

    svg.selectAll()
      .data(dataset)
      .enter()
      .append('rect')
      .attr('class', 'internet')
      .attr('x', (d) => xScale(d.race) + 40)
      .attr('y', (d) => yScale(d.percentI))
      .attr('height', (d) => height - yScale(d.percentI))
      .attr('width', 30)
      .attr('fill', '#a05d56')
      .attr('rx', 5)
      .attr('ry', 5)
      .on('mouseover', function f1(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('opacity', '0.5');
        const xPosition = parseFloat(d.x) - 185;
        const yPosition = parseFloat(d.y) - 200;
        const f = d3.format('.1f');
        svg.append('text')
          .attr('id', 'tooltip')
          .attr('x', xPosition)
          .attr('y', yPosition)
          .attr('text-anchor', 'middle')
          .attr('font-size', '15px')
          .attr('fill', 'white')
          .text(`${f(i.percentI)}%`);
      })
      .on('mouseout', function f2(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('opacity', '1');
        d3.select('#tooltip').remove();
      });

    // Legend
    svg.append('circle').attr('cx', 370).attr('cy', 80).attr('r', 6)
      .style('fill', '#ff8c00');
    svg.append('circle').attr('cx', 370).attr('cy', 110).attr('r', 6)
      .style('fill', '#a05d56');
    svg.append('text').attr('x', 390).attr('y', 80).text('No Computer Access')
      .style('font-size', '15px')
      .attr('fill', 'white')
      .attr('alignment-baseline', 'middle');
    svg.append('text').attr('x', 390).attr('y', 110).text('No Internet Access')
      .style('font-size', '15px')
      .attr('fill', 'white')
      .attr('alignment-baseline', 'middle');

    // Axis Labels
    // Title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', -40)
      .attr('text-anchor', 'middle')
      .attr('font-weight', '400')
      .attr('fill', 'white')
      .text('Students with No Internet or Computer Access (Race)');

    // X Axis
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', height + 50)
      .attr('font-size', '15px')
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .text('Race');

    // Y Axis
    svg.append('text')
      .attr('x', -height / 2)
      .attr('y', -60)
      .attr('transform', 'rotate(-90)')
      .attr('font-size', '15px')
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .text('Percentage of Students in the US');

    // Change #2016
    d3.select('button.c2016')
      .on('click', () => {
        d3.select('button.change3').style('visibility', 'visible');
        d3.select('button.change4').style('visibility', 'visible');
        d3.select('button.change5').style('visibility', 'visible');

        d3.selectAll('rect.computer').remove();
        d3.selectAll('rect.internet').remove();

        xScale.domain(dataset2.map((d) => d.race));

        svg.selectAll('g.xaxis')
          .transition().duration(2000)
          .call(d3.axisBottom(xScale));

        svg.selectAll('rect.computer')
          .data(dataset2)
          .enter()
          .append('rect')
          .attr('class', 'computer')
          .attr('x', (d) => xScale(d.race) + 13)
          .attr('y', (d) => yScale(d.percentC))
          .attr('height', (d) => height - yScale(d.percentC))
          .attr('width', 30)
          .attr('fill', '#ff8c00')
          .attr('rx', 5)
          .attr('ry', 5);

        svg.selectAll('rect.internet')
          .data(dataset2)
          .enter()
          .append('rect')
          .attr('class', 'internet')
          .attr('x', (d) => xScale(d.race) + 43)
          .attr('y', (d) => yScale(d.percentI))
          .attr('height', (d) => height - yScale(d.percentI))
          .attr('width', 30)
          .attr('fill', '#a05d56')
          .attr('rx', 5)
          .attr('ry', 5);
      });

    // Change #3
    d3.select('button.change3')
      .on('click', () => {
        dataset2.sort((a, b) => d3.ascending(a.race, b.race));
        xScale.domain(dataset2.map((d) => d.race));

        svg.selectAll('g.xaxis')
          .transition().duration(2000)
          .call(d3.axisBottom(xScale));

        svg.selectAll('rect.computer')
          .data(dataset2)
          .transition()
          .duration(2000)
          .attr('x', (d) => xScale(d.race) + 10)
          .attr('y', (d) => yScale(d.percentC))
          .attr('height', (d) => height - yScale(d.percentC))
          .attr('width', 30)
          .attr('fill', '#ff8c00')
          .attr('rx', 5)
          .attr('ry', 5);

        svg.selectAll('rect.internet')
          .data(dataset2)
          .transition()
          .duration(2000)
          .attr('x', (d) => xScale(d.race) + 40)
          .attr('y', (d) => yScale(d.percentI))
          .attr('height', (d) => height - yScale(d.percentI))
          .attr('width', 30)
          .attr('fill', '#a05d56')
          .attr('rx', 5)
          .attr('ry', 5);
      });

    // Change #4
    d3.select('button.change4')
      .on('click', () => {
        dataset2.sort((a, b) => d3.ascending(a.percentC, b.percentC));
        xScale.domain(dataset2.map((d) => d.race));

        svg.selectAll('g.xaxis')
          .transition().duration(2000)
          .call(d3.axisBottom(xScale));

        svg.selectAll('rect.computer')
          .data(dataset2)
          .transition()
          .duration(2000)
          .attr('x', (d) => xScale(d.race) + 10)
          .attr('y', (d) => yScale(d.percentC))
          .attr('height', (d) => height - yScale(d.percentC))
          .attr('width', 30)
          .attr('fill', '#ff8c00')
          .attr('rx', 5)
          .attr('ry', 5);

        svg.selectAll('rect.internet')
          .data(dataset2)
          .transition()
          .duration(2000)
          .attr('x', (d) => xScale(d.race) + 40)
          .attr('y', (d) => yScale(d.percentI))
          .attr('height', (d) => height - yScale(d.percentI))
          .attr('width', 30)
          .attr('fill', '#a05d56')
          .attr('rx', 5)
          .attr('ry', 5);
      });

    // Change #5
    d3.select('button.change5')
      .on('click', () => {
        dataset2.sort((a, b) => d3.descending(a.percentC, b.percentC));
        xScale.domain(dataset2.map((d) => d.race));

        svg.selectAll('g.xaxis')
          .transition().duration(2000)
          .call(d3.axisBottom(xScale));

        svg.selectAll('rect.computer')
          .data(dataset2)
          .transition()
          .duration(2000)
          .attr('x', (d) => xScale(d.race) + 10)
          .attr('y', (d) => yScale(d.percentC))
          .attr('height', (d) => height - yScale(d.percentC))
          .attr('width', 30)
          .attr('fill', '#ff8c00')
          .attr('rx', 5)
          .attr('ry', 5);

        svg.selectAll('rect.internet')
          .data(dataset2)
          .transition()
          .duration(2000)
          .attr('x', (d) => xScale(d.race) + 40)
          .attr('y', (d) => yScale(d.percentI))
          .attr('height', (d) => height - yScale(d.percentI))
          .attr('width', 30)
          .attr('fill', '#a05d56')
          .attr('rx', 5)
          .attr('ry', 5);
      });

    // Change #2020
    d3.select('button.c2020')
      .on('click', () => {
        d3.select('button.change3').style('visibility', 'hidden');
        d3.select('button.change4').style('visibility', 'hidden');
        d3.select('button.change5').style('visibility', 'hidden');

        d3.selectAll('rect.computer').remove();
        d3.selectAll('rect.internet').remove();

        xScale.domain(dataset.map((d) => d.race));

        svg.selectAll('g.xaxis')
          .transition().duration(2000)
          .call(d3.axisBottom(xScale));

        svg.selectAll('rect.computer')
          .data(dataset)
          .enter()
          .append('rect')
          .attr('class', 'computer')
          .attr('x', (d) => xScale(d.race) + 10)
          .attr('y', (d) => yScale(d.percentC))
          .attr('height', (d) => height - yScale(d.percentC))
          .attr('width', 30)
          .attr('fill', '#ff8c00')
          .attr('rx', 5)
          .attr('ry', 5);

        svg.selectAll('rect.internet')
          .data(dataset)
          .enter()
          .append('rect')
          .attr('class', 'internet')
          .attr('x', (d) => xScale(d.race) + 40)
          .attr('y', (d) => yScale(d.percentI))
          .attr('height', (d) => height - yScale(d.percentI))
          .attr('width', 30)
          .attr('fill', '#a05d56')
          .attr('rx', 5)
          .attr('ry', 5);
      });
  });
});

// Graph #2
d3.csv('finalcensus.csv', d3.autoType).then((dataset) => {
  const svg3 = d3.select('#graph2')
    .attr('width', 1000)
    .attr('height', 600);

  const margin = 90;
  const width = svg3.attr('width') - (margin * 2);
  const height = svg3.attr('height') - (margin * 2);

  const svg = svg3.append('g')
    .attr('transform', `translate(${margin * 1.5}, ${margin})`);

  const yScale = d3.scaleLinear()
    .range([height, 0])
    .domain([0, 100]);

  svg.append('g')
    .call(d3.axisLeft(yScale));

  const xScale = d3.scaleBand()
    .range([0, width])
    .domain(dataset.map((d) => d.month))
    .padding(0.2);

  svg.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(xScale));

  // Axis Labels
  // Title
  svg.append('text')
    .attr('x', width / 2)
    .attr('y', -40)
    .attr('text-anchor', 'middle')
    .attr('font-weight', '400')
    .attr('fill', 'white')
    .text('Students with Access to a Device for Educational Purposes');

  // X Axis
  svg.append('text')
    .attr('x', width / 2)
    .attr('y', height + 50)
    .attr('font-size', '15px')
    .attr('text-anchor', 'middle')
    .attr('fill', 'white')
    .text('Months in 2020');

  // Y Axis
  svg.append('text')
    .attr('x', -height / 2)
    .attr('y', -60)
    .attr('transform', 'rotate(-90)')
    .attr('font-size', '15px')
    .attr('text-anchor', 'middle')
    .attr('fill', 'white')
    .text('Percentage of Students in the US with Access');

  // Legend
  function drawLegend(labels) {
    const xPosition = 620;
    let yPosition = 300;
    for (let i = 0; i < labels.length; i += 1) {
      svg.append('circle').attr('cx', xPosition).attr('cy', yPosition).attr('r', 6)
        .attr('class', 'legend')
        .style('fill', colors[i]);

      svg.append('text').attr('x', xPosition + 20).attr('y', yPosition)
        .text(labels[i])
        .attr('class', 'legend')
        .style('font-size', '15px')
        .attr('fill', 'white')
        .attr('alignment-baseline', 'middle');

      yPosition += 20;
    }
  }

  function drawAge() { // age
    // Loop
    const listlabels = ['18 - 24 years', '25 - 39 years', '40 - 54 years', '55 - 64 years', '65 years and above'];
    drawLegend(listlabels);

    svg.append('path')
      .datum(dataset)
      .attr('class', 'linechart')
      .attr('fill', 'none')
      .attr('stroke', colors[0])
      .attr('stroke-width', 1.5)
      .attr('d', d3.line()
        .x((d) => xScale(d.month) + 40)
        .y((d) => yScale(d.y18 * 100)));

    svg.selectAll()
      .data(dataset)
      .enter()
      .append('circle')
      .attr('class', 'linechart')
      .attr('cx', (d) => xScale(d.month) + 40)
      .attr('cy', (d) => yScale(d.y18 * 100))
      .attr('r', 5)
      .attr('fill', colors[0])
      .on('mouseover', function f1(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('r', 10);
        const xPosition = parseFloat(d.x) - 185;
        const yPosition = parseFloat(d.y) - 100;
        const f = d3.format('.1f');
        svg.append('text')
          .attr('id', 'tooltip')
          .attr('x', xPosition)
          .attr('y', yPosition)
          .attr('text-anchor', 'middle')
          .attr('font-size', '15px')
          .attr('fill', 'white')
          .text(`${f(i.y18 * 100)}%`);
      })
      .on('mouseout', function f2(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('r', 5);
        d3.select('#tooltip').remove();
      });

    svg.append('path')
      .datum(dataset)
      .attr('class', 'linechart')
      .attr('fill', 'none')
      .attr('stroke', colors[1])
      .attr('stroke-width', 1.5)
      .attr('d', d3.line()
        .x((d) => xScale(d.month) + 40)
        .y((d) => yScale(d.y25 * 100)));

    svg.selectAll()
      .data(dataset)
      .enter()
      .append('circle')
      .attr('class', 'linechart')
      .attr('cx', (d) => xScale(d.month) + 40)
      .attr('cy', (d) => yScale(d.y25 * 100))
      .attr('r', 5)
      .attr('fill', colors[1])
      .on('mouseover', function f1(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('r', 10);
        const xPosition = parseFloat(d.x) - 185;
        const yPosition = parseFloat(d.y) - 100;
        const f = d3.format('.1f');
        svg.append('text')
          .attr('id', 'tooltip')
          .attr('x', xPosition)
          .attr('y', yPosition)
          .attr('text-anchor', 'middle')
          .attr('font-size', '15px')
          .attr('fill', 'white')
          .text(`${f(i.y18 * 100)}%`);
      })
      .on('mouseout', function f2(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('r', 5);
        d3.select('#tooltip').remove();
      });

    svg.append('path')
      .datum(dataset)
      .attr('class', 'linechart')
      .attr('fill', 'none')
      .attr('stroke', colors[2])
      .attr('stroke-width', 1.5)
      .attr('d', d3.line()
        .x((d) => xScale(d.month) + 40)
        .y((d) => yScale(d.y40 * 100)));

    svg.selectAll()
      .data(dataset)
      .enter()
      .append('circle')
      .attr('class', 'linechart')
      .attr('cx', (d) => xScale(d.month) + 40)
      .attr('cy', (d) => yScale(d.y40 * 100))
      .attr('r', 5)
      .attr('fill', colors[2])
      .on('mouseover', function f1(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('r', 10);
        const xPosition = parseFloat(d.x) - 185;
        const yPosition = parseFloat(d.y) - 100;
        const f = d3.format('.1f');
        svg.append('text')
          .attr('id', 'tooltip')
          .attr('x', xPosition)
          .attr('y', yPosition)
          .attr('text-anchor', 'middle')
          .attr('font-size', '15px')
          .attr('fill', 'white')
          .text(`${f(i.y18 * 100)}%`);
      })
      .on('mouseout', function f2(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('r', 5);
        d3.select('#tooltip').remove();
      });

    svg.append('path')
      .datum(dataset)
      .attr('class', 'linechart')
      .attr('fill', 'none')
      .attr('stroke', colors[3])
      .attr('stroke-width', 1.5)
      .attr('d', d3.line()
        .x((d) => xScale(d.month) + 40)
        .y((d) => yScale(d.y55 * 100)));

    svg.selectAll()
      .data(dataset)
      .enter()
      .append('circle')
      .attr('class', 'linechart')
      .attr('cx', (d) => xScale(d.month) + 40)
      .attr('cy', (d) => yScale(d.y55 * 100))
      .attr('r', 5)
      .attr('fill', colors[3])
      .on('mouseover', function f1(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('r', 10);
        const xPosition = parseFloat(d.x) - 185;
        const yPosition = parseFloat(d.y) - 100;
        const f = d3.format('.1f');
        svg.append('text')
          .attr('id', 'tooltip')
          .attr('x', xPosition)
          .attr('y', yPosition)
          .attr('text-anchor', 'middle')
          .attr('font-size', '15px')
          .attr('fill', 'white')
          .text(`${f(i.y18 * 100)}%`);
      })
      .on('mouseout', function f2(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('r', 5);
        d3.select('#tooltip').remove();
      });

    svg.append('path')
      .datum(dataset)
      .attr('class', 'linechart')
      .attr('fill', 'none')
      .attr('stroke', colors[4])
      .attr('stroke-width', 1.5)
      .attr('d', d3.line()
        .x((d) => xScale(d.month) + 40)
        .y((d) => yScale(d.y65 * 100)));

    svg.selectAll()
      .data(dataset)
      .enter()
      .append('circle')
      .attr('class', 'linechart')
      .attr('cx', (d) => xScale(d.month) + 40)
      .attr('cy', (d) => yScale(d.y65 * 100))
      .attr('r', 5)
      .attr('fill', colors[4])
      .on('mouseover', function f1(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('r', 10);
        const xPosition = parseFloat(d.x) - 185;
        const yPosition = parseFloat(d.y) - 100;
        const f = d3.format('.1f');
        svg.append('text')
          .attr('id', 'tooltip')
          .attr('x', xPosition)
          .attr('y', yPosition)
          .attr('text-anchor', 'middle')
          .attr('font-size', '15px')
          .attr('fill', 'white')
          .text(`${f(i.y18 * 100)}%`);
      })
      .on('mouseout', function f2(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('r', 5);
        d3.select('#tooltip').remove();
      });
  }

  drawAge();

  // Categories
  const category = document.forms.picker.elements.options;

  category[0].onclick = function age() { // age
    d3.selectAll('path.linechart').remove();
    d3.selectAll('circle.linechart').remove();
    d3.selectAll('circle.legend').remove();
    d3.selectAll('text.legend').remove();

    drawAge();
  };

  category[1].onclick = function gender() { // gender
    d3.selectAll('path.linechart').remove();
    d3.selectAll('circle.linechart').remove();
    d3.selectAll('circle.legend').remove();
    d3.selectAll('text.legend').remove();

    const listlabels = ['Male', 'Female'];
    drawLegend(listlabels);

    svg.append('path')
      .datum(dataset)
      .attr('class', 'linechart')
      .attr('fill', 'none')
      .attr('stroke', colors[0])
      .attr('stroke-width', 1.5)
      .attr('d', d3.line()
        .x((d) => xScale(d.month) + 40)
        .y((d) => yScale(d.male * 100)));

    svg.selectAll()
      .data(dataset)
      .enter()
      .append('circle')
      .attr('class', 'linechart')
      .attr('cx', (d) => xScale(d.month) + 40)
      .attr('cy', (d) => yScale(d.male * 100))
      .attr('r', 5)
      .attr('fill', colors[0])
      .on('mouseover', function f1(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('r', 10);
        const xPosition = parseFloat(d.x) - 185;
        const yPosition = parseFloat(d.y) - 100;
        const f = d3.format('.1f');
        svg.append('text')
          .attr('id', 'tooltip')
          .attr('x', xPosition)
          .attr('y', yPosition)
          .attr('text-anchor', 'middle')
          .attr('font-size', '15px')
          .attr('fill', 'white')
          .text(`${f(i.y18 * 100)}%`);
      })
      .on('mouseout', function f2(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('r', 5);
        d3.select('#tooltip').remove();
      });

    svg.append('path')
      .datum(dataset)
      .attr('class', 'linechart')
      .attr('fill', 'none')
      .attr('stroke', colors[1])
      .attr('stroke-width', 1.5)
      .attr('d', d3.line()
        .x((d) => xScale(d.month) + 40)
        .y((d) => yScale(d.female * 100)));

    svg.selectAll()
      .data(dataset)
      .enter()
      .append('circle')
      .attr('class', 'linechart')
      .attr('cx', (d) => xScale(d.month) + 40)
      .attr('cy', (d) => yScale(d.female * 100))
      .attr('r', 5)
      .attr('fill', colors[1])
      .on('mouseover', function f1(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('r', 10);
        const xPosition = parseFloat(d.x) - 185;
        const yPosition = parseFloat(d.y) - 100;
        const f = d3.format('.1f');
        svg.append('text')
          .attr('id', 'tooltip')
          .attr('x', xPosition)
          .attr('y', yPosition)
          .attr('text-anchor', 'middle')
          .attr('font-size', '15px')
          .attr('fill', 'white')
          .text(`${f(i.y18 * 100)}%`);
      })
      .on('mouseout', function f2(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('r', 5);
        d3.select('#tooltip').remove();
      });
  };

  category[2].onclick = function education() { // education
    d3.selectAll('path.linechart').remove();
    d3.selectAll('circle.linechart').remove();
    d3.selectAll('circle.legend').remove();
    d3.selectAll('text.legend').remove();

    const listlabels = ['Less than High School', 'High School or GED', 'Some college/associate degree', 'Bachelor degree or higher'];
    drawLegend(listlabels);

    svg.append('path')
      .datum(dataset)
      .attr('class', 'linechart')
      .attr('fill', 'none')
      .attr('stroke', colors[0])
      .attr('stroke-width', 1.5)
      .attr('d', d3.line()
        .x((d) => xScale(d.month) + 40)
        .y((d) => yScale(d.kids * 100)));

    svg.selectAll()
      .data(dataset)
      .enter()
      .append('circle')
      .attr('class', 'linechart')
      .attr('cx', (d) => xScale(d.month) + 40)
      .attr('cy', (d) => yScale(d.kids * 100))
      .attr('r', 5)
      .attr('fill', colors[0])
      .on('mouseover', function f1(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('r', 10);
        const xPosition = parseFloat(d.x) - 185;
        const yPosition = parseFloat(d.y) - 100;
        const f = d3.format('.1f');
        svg.append('text')
          .attr('id', 'tooltip')
          .attr('x', xPosition)
          .attr('y', yPosition)
          .attr('text-anchor', 'middle')
          .attr('font-size', '15px')
          .attr('fill', 'white')
          .text(`${f(i.y18 * 100)}%`);
      })
      .on('mouseout', function f2(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('r', 5);
        d3.select('#tooltip').remove();
      });

    svg.append('path')
      .datum(dataset)
      .attr('class', 'linechart')
      .attr('fill', 'none')
      .attr('stroke', colors[1])
      .attr('stroke-width', 1.5)
      .attr('d', d3.line()
        .x((d) => xScale(d.month) + 40)
        .y((d) => yScale(d.high * 100)));

    svg.selectAll()
      .data(dataset)
      .enter()
      .append('circle')
      .attr('class', 'linechart')
      .attr('cx', (d) => xScale(d.month) + 40)
      .attr('cy', (d) => yScale(d.high * 100))
      .attr('r', 5)
      .attr('fill', colors[1])
      .on('mouseover', function f1(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('r', 10);
        const xPosition = parseFloat(d.x) - 185;
        const yPosition = parseFloat(d.y) - 100;
        const f = d3.format('.1f');
        svg.append('text')
          .attr('id', 'tooltip')
          .attr('x', xPosition)
          .attr('y', yPosition)
          .attr('text-anchor', 'middle')
          .attr('font-size', '15px')
          .attr('fill', 'white')
          .text(`${f(i.y18 * 100)}%`);
      })
      .on('mouseout', function f2(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('r', 5);
        d3.select('#tooltip').remove();
      });

    svg.append('path')
      .datum(dataset)
      .attr('class', 'linechart')
      .attr('fill', 'none')
      .attr('stroke', colors[2])
      .attr('stroke-width', 1.5)
      .attr('d', d3.line()
        .x((d) => xScale(d.month) + 40)
        .y((d) => yScale(d.college * 100)));

    svg.selectAll()
      .data(dataset)
      .enter()
      .append('circle')
      .attr('class', 'linechart')
      .attr('cx', (d) => xScale(d.month) + 40)
      .attr('cy', (d) => yScale(d.college * 100))
      .attr('r', 5)
      .attr('fill', colors[2])
      .on('mouseover', function f1(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('r', 10);
        const xPosition = parseFloat(d.x) - 185;
        const yPosition = parseFloat(d.y) - 100;
        const f = d3.format('.1f');
        svg.append('text')
          .attr('id', 'tooltip')
          .attr('x', xPosition)
          .attr('y', yPosition)
          .attr('text-anchor', 'middle')
          .attr('font-size', '15px')
          .attr('fill', 'white')
          .text(`${f(i.y18 * 100)}%`);
      })
      .on('mouseout', function f2(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('r', 5);
        d3.select('#tooltip').remove();
      });

    svg.append('path')
      .datum(dataset)
      .attr('class', 'linechart')
      .attr('fill', 'none')
      .attr('stroke', colors[3])
      .attr('stroke-width', 1.5)
      .attr('d', d3.line()
        .x((d) => xScale(d.month) + 40)
        .y((d) => yScale(d.bachelor * 100)));

    svg.selectAll()
      .data(dataset)
      .enter()
      .append('circle')
      .attr('class', 'linechart')
      .attr('cx', (d) => xScale(d.month) + 40)
      .attr('cy', (d) => yScale(d.bachelor * 100))
      .attr('r', 5)
      .attr('fill', colors[3])
      .on('mouseover', function f1(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('r', 10);
        const xPosition = parseFloat(d.x) - 185;
        const yPosition = parseFloat(d.y) - 100;
        const f = d3.format('.1f');
        svg.append('text')
          .attr('id', 'tooltip')
          .attr('x', xPosition)
          .attr('y', yPosition)
          .attr('text-anchor', 'middle')
          .attr('font-size', '15px')
          .attr('fill', 'white')
          .text(`${f(i.y18 * 100)}%`);
      })
      .on('mouseout', function f2(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('r', 5);
        d3.select('#tooltip').remove();
      });
  };

  category[3].onclick = function race() { // race
    d3.selectAll('path.linechart').remove();
    d3.selectAll('circle.linechart').remove();
    d3.selectAll('circle.legend').remove();
    d3.selectAll('text.legend').remove();

    const listlabels = ['Hispanic or Latino', 'White', 'Black', 'Asian'];
    drawLegend(listlabels);

    svg.append('path')
      .datum(dataset)
      .attr('class', 'linechart')
      .attr('fill', 'none')
      .attr('stroke', colors[0])
      .attr('stroke-width', 1.5)
      .attr('d', d3.line()
        .x((d) => xScale(d.month) + 40)
        .y((d) => yScale(d.latino * 100)));

    svg.selectAll()
      .data(dataset)
      .enter()
      .append('circle')
      .attr('class', 'linechart')
      .attr('cx', (d) => xScale(d.month) + 40)
      .attr('cy', (d) => yScale(d.latino * 100))
      .attr('r', 5)
      .attr('fill', colors[0])
      .on('mouseover', function f1(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('r', 10);
        const xPosition = parseFloat(d.x) - 185;
        const yPosition = parseFloat(d.y) - 100;
        const f = d3.format('.1f');
        svg.append('text')
          .attr('id', 'tooltip')
          .attr('x', xPosition)
          .attr('y', yPosition)
          .attr('text-anchor', 'middle')
          .attr('font-size', '15px')
          .attr('fill', 'white')
          .text(`${f(i.y18 * 100)}%`);
      })
      .on('mouseout', function f2(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('r', 5);
        d3.select('#tooltip').remove();
      });

    svg.append('path')
      .datum(dataset)
      .attr('class', 'linechart')
      .attr('fill', 'none')
      .attr('stroke', colors[1])
      .attr('stroke-width', 1.5)
      .attr('d', d3.line()
        .x((d) => xScale(d.month) + 40)
        .y((d) => yScale(d.white * 100)));

    svg.selectAll()
      .data(dataset)
      .enter()
      .append('circle')
      .attr('class', 'linechart')
      .attr('cx', (d) => xScale(d.month) + 40)
      .attr('cy', (d) => yScale(d.white * 100))
      .attr('r', 5)
      .attr('fill', colors[1])
      .on('mouseover', function f1(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('r', 10);
        const xPosition = parseFloat(d.x) - 185;
        const yPosition = parseFloat(d.y) - 100;
        const f = d3.format('.1f');
        svg.append('text')
          .attr('id', 'tooltip')
          .attr('x', xPosition)
          .attr('y', yPosition)
          .attr('text-anchor', 'middle')
          .attr('font-size', '15px')
          .attr('fill', 'white')
          .text(`${f(i.y18 * 100)}%`);
      })
      .on('mouseout', function f2(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('r', 5);
        d3.select('#tooltip').remove();
      });

    svg.append('path')
      .datum(dataset)
      .attr('class', 'linechart')
      .attr('fill', 'none')
      .attr('stroke', colors[2])
      .attr('stroke-width', 1.5)
      .attr('d', d3.line()
        .x((d) => xScale(d.month) + 40)
        .y((d) => yScale(d.black * 100)));

    svg.selectAll()
      .data(dataset)
      .enter()
      .append('circle')
      .attr('class', 'linechart')
      .attr('cx', (d) => xScale(d.month) + 40)
      .attr('cy', (d) => yScale(d.black * 100))
      .attr('r', 5)
      .attr('fill', colors[2])
      .on('mouseover', function f1(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('r', 10);
        const xPosition = parseFloat(d.x) - 185;
        const yPosition = parseFloat(d.y) - 100;
        const f = d3.format('.1f');
        svg.append('text')
          .attr('id', 'tooltip')
          .attr('x', xPosition)
          .attr('y', yPosition)
          .attr('text-anchor', 'middle')
          .attr('font-size', '15px')
          .attr('fill', 'white')
          .text(`${f(i.y18 * 100)}%`);
      })
      .on('mouseout', function f2(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('r', 5);
        d3.select('#tooltip').remove();
      });

    svg.append('path')
      .datum(dataset)
      .attr('class', 'linechart')
      .attr('fill', 'none')
      .attr('stroke', colors[3])
      .attr('stroke-width', 1.5)
      .attr('d', d3.line()
        .x((d) => xScale(d.month) + 40)
        .y((d) => yScale(d.asian * 100)));

    svg.selectAll()
      .data(dataset)
      .enter()
      .append('circle')
      .attr('class', 'linechart')
      .attr('cx', (d) => xScale(d.month) + 40)
      .attr('cy', (d) => yScale(d.asian * 100))
      .attr('r', 5)
      .attr('fill', colors[3])
      .on('mouseover', function f1(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('r', 10);
        const xPosition = parseFloat(d.x) - 185;
        const yPosition = parseFloat(d.y) - 100;
        const f = d3.format('.1f');
        svg.append('text')
          .attr('id', 'tooltip')
          .attr('x', xPosition)
          .attr('y', yPosition)
          .attr('text-anchor', 'middle')
          .attr('font-size', '15px')
          .attr('fill', 'white')
          .text(`${f(i.y18 * 100)}%`);
      })
      .on('mouseout', function f2(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('r', 5);
        d3.select('#tooltip').remove();
      });
  };

  category[4].onclick = function marriage() { // marriage
    d3.selectAll('path.linechart').remove();
    d3.selectAll('circle.linechart').remove();
    d3.selectAll('circle.legend').remove();
    d3.selectAll('text.legend').remove();

    const listlabels = ['Married', 'Widowed', 'Divorced/Separated', 'Never Married'];
    drawLegend(listlabels);

    svg.append('path')
      .datum(dataset)
      .attr('class', 'linechart')
      .attr('fill', 'none')
      .attr('stroke', colors[0])
      .attr('stroke-width', 1.5)
      .attr('d', d3.line()
        .x((d) => xScale(d.month) + 40)
        .y((d) => yScale(d.married * 100)));

    svg.selectAll()
      .data(dataset)
      .enter()
      .append('circle')
      .attr('class', 'linechart')
      .attr('cx', (d) => xScale(d.month) + 40)
      .attr('cy', (d) => yScale(d.married * 100))
      .attr('r', 5)
      .attr('fill', colors[0])
      .on('mouseover', function f1(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('r', 10);
        const xPosition = parseFloat(d.x) - 185;
        const yPosition = parseFloat(d.y) - 100;
        const f = d3.format('.1f');
        svg.append('text')
          .attr('id', 'tooltip')
          .attr('x', xPosition)
          .attr('y', yPosition)
          .attr('text-anchor', 'middle')
          .attr('font-size', '15px')
          .attr('fill', 'white')
          .text(`${f(i.y18 * 100)}%`);
      })
      .on('mouseout', function f2(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('r', 5);
        d3.select('#tooltip').remove();
      });

    svg.append('path')
      .datum(dataset)
      .attr('class', 'linechart')
      .attr('fill', 'none')
      .attr('stroke', colors[1])
      .attr('stroke-width', 1.5)
      .attr('d', d3.line()
        .x((d) => xScale(d.month) + 40)
        .y((d) => yScale(d.widowed * 100)));

    svg.selectAll()
      .data(dataset)
      .enter()
      .append('circle')
      .attr('class', 'linechart')
      .attr('cx', (d) => xScale(d.month) + 40)
      .attr('cy', (d) => yScale(d.widowed * 100))
      .attr('r', 5)
      .attr('fill', colors[1])
      .on('mouseover', function f1(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('r', 10);
        const xPosition = parseFloat(d.x) - 185;
        const yPosition = parseFloat(d.y) - 100;
        const f = d3.format('.1f');
        svg.append('text')
          .attr('id', 'tooltip')
          .attr('x', xPosition)
          .attr('y', yPosition)
          .attr('text-anchor', 'middle')
          .attr('font-size', '15px')
          .attr('fill', 'white')
          .text(`${f(i.y18 * 100)}%`);
      })
      .on('mouseout', function f2(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('r', 5);
        d3.select('#tooltip').remove();
      });

    svg.append('path')
      .datum(dataset)
      .attr('class', 'linechart')
      .attr('fill', 'none')
      .attr('stroke', colors[2])
      .attr('stroke-width', 1.5)
      .attr('d', d3.line()
        .x((d) => xScale(d.month) + 40)
        .y((d) => yScale(d.divorced * 100)));

    svg.selectAll()
      .data(dataset)
      .enter()
      .append('circle')
      .attr('class', 'linechart')
      .attr('cx', (d) => xScale(d.month) + 40)
      .attr('cy', (d) => yScale(d.divorced * 100))
      .attr('r', 5)
      .attr('fill', colors[2])
      .on('mouseover', function f1(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('r', 10);
        const xPosition = parseFloat(d.x) - 185;
        const yPosition = parseFloat(d.y) - 100;
        const f = d3.format('.1f');
        svg.append('text')
          .attr('id', 'tooltip')
          .attr('x', xPosition)
          .attr('y', yPosition)
          .attr('text-anchor', 'middle')
          .attr('font-size', '15px')
          .attr('fill', 'white')
          .text(`${f(i.y18 * 100)}%`);
      })
      .on('mouseout', function f2(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('r', 5);
        d3.select('#tooltip').remove();
      });

    svg.append('path')
      .datum(dataset)
      .attr('class', 'linechart')
      .attr('fill', 'none')
      .attr('stroke', colors[3])
      .attr('stroke-width', 1.5)
      .attr('d', d3.line()
        .x((d) => xScale(d.month) + 40)
        .y((d) => yScale(d.single * 100)));

    svg.selectAll()
      .data(dataset)
      .enter()
      .append('circle')
      .attr('class', 'linechart')
      .attr('cx', (d) => xScale(d.month) + 40)
      .attr('cy', (d) => yScale(d.single * 100))
      .attr('r', 5)
      .attr('fill', colors[3])
      .on('mouseover', function f1(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('r', 10);
        const xPosition = parseFloat(d.x) - 185;
        const yPosition = parseFloat(d.y) - 100;
        const f = d3.format('.1f');
        svg.append('text')
          .attr('id', 'tooltip')
          .attr('x', xPosition)
          .attr('y', yPosition)
          .attr('text-anchor', 'middle')
          .attr('font-size', '15px')
          .attr('fill', 'white')
          .text(`${f(i.y18 * 100)}%`);
      })
      .on('mouseout', function f2(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('r', 5);
        d3.select('#tooltip').remove();
      });
  };

  category[5].onclick = function children() { // children
    d3.selectAll('path.linechart').remove();
    d3.selectAll('circle.linechart').remove();
    d3.selectAll('circle.legend').remove();
    d3.selectAll('text.legend').remove();

    const listlabels = ['Children in Household', 'No Children in Household'];
    drawLegend(listlabels);

    svg.append('path')
      .datum(dataset)
      .attr('class', 'linechart')
      .attr('fill', 'none')
      .attr('stroke', colors[0])
      .attr('stroke-width', 1.5)
      .attr('d', d3.line()
        .x((d) => xScale(d.month) + 40)
        .y((d) => yScale(d.children * 100)));

    svg.selectAll()
      .data(dataset)
      .enter()
      .append('circle')
      .attr('class', 'linechart')
      .attr('cx', (d) => xScale(d.month) + 40)
      .attr('cy', (d) => yScale(d.children * 100))
      .attr('r', 5)
      .attr('fill', colors[0])
      .on('mouseover', function f1(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('r', 10);
        const xPosition = parseFloat(d.x) - 185;
        const yPosition = parseFloat(d.y) - 100;
        const f = d3.format('.1f');
        svg.append('text')
          .attr('id', 'tooltip')
          .attr('x', xPosition)
          .attr('y', yPosition)
          .attr('text-anchor', 'middle')
          .attr('font-size', '15px')
          .attr('fill', 'white')
          .text(`${f(i.y18 * 100)}%`);
      })
      .on('mouseout', function f2(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('r', 5);
        d3.select('#tooltip').remove();
      });

    svg.append('path')
      .datum(dataset)
      .attr('class', 'linechart')
      .attr('fill', 'none')
      .attr('stroke', colors[1])
      .attr('stroke-width', 1.5)
      .attr('d', d3.line()
        .x((d) => xScale(d.month) + 40)
        .y((d) => yScale(d.nochildren * 100)));

    svg.selectAll()
      .data(dataset)
      .enter()
      .append('circle')
      .attr('class', 'linechart')
      .attr('cx', (d) => xScale(d.month) + 40)
      .attr('cy', (d) => yScale(d.nochildren * 100))
      .attr('r', 5)
      .attr('fill', colors[1])
      .on('mouseover', function f1(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('r', 10);
        const xPosition = parseFloat(d.x) - 185;
        const yPosition = parseFloat(d.y) - 100;
        const f = d3.format('.1f');
        svg.append('text')
          .attr('id', 'tooltip')
          .attr('x', xPosition)
          .attr('y', yPosition)
          .attr('text-anchor', 'middle')
          .attr('font-size', '15px')
          .attr('fill', 'white')
          .text(`${f(i.y18 * 100)}%`);
      })
      .on('mouseout', function f2(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('r', 5);
        d3.select('#tooltip').remove();
      });
  };

  category[6].onclick = function employment() { // employment
    d3.selectAll('path.linechart').remove();
    d3.selectAll('circle.linechart').remove();
    d3.selectAll('circle.legend').remove();
    d3.selectAll('text.legend').remove();

    const listlabels = ['Employed', 'Unemployed'];
    drawLegend(listlabels);

    svg.append('path')
      .datum(dataset)
      .attr('class', 'linechart')
      .attr('fill', 'none')
      .attr('stroke', colors[0])
      .attr('stroke-width', 1.5)
      .attr('d', d3.line()
        .x((d) => xScale(d.month) + 40)
        .y((d) => yScale(d.employed * 100)));

    svg.selectAll()
      .data(dataset)
      .enter()
      .append('circle')
      .attr('class', 'linechart')
      .attr('cx', (d) => xScale(d.month) + 40)
      .attr('cy', (d) => yScale(d.employed * 100))
      .attr('r', 5)
      .attr('fill', colors[0])
      .on('mouseover', function f1(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('r', 10);
        const xPosition = parseFloat(d.x) - 185;
        const yPosition = parseFloat(d.y) - 100;
        const f = d3.format('.1f');
        svg.append('text')
          .attr('id', 'tooltip')
          .attr('x', xPosition)
          .attr('y', yPosition)
          .attr('text-anchor', 'middle')
          .attr('font-size', '15px')
          .attr('fill', 'white')
          .text(`${f(i.y18 * 100)}%`);
      })
      .on('mouseout', function f2(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('r', 5);
        d3.select('#tooltip').remove();
      });

    svg.append('path')
      .datum(dataset)
      .attr('class', 'linechart')
      .attr('fill', 'none')
      .attr('stroke', colors[1])
      .attr('stroke-width', 1.5)
      .attr('d', d3.line()
        .x((d) => xScale(d.month) + 40)
        .y((d) => yScale(d.unemployed * 100)));

    svg.selectAll()
      .data(dataset)
      .enter()
      .append('circle')
      .attr('class', 'linechart')
      .attr('cx', (d) => xScale(d.month) + 40)
      .attr('cy', (d) => yScale(d.unemployed * 100))
      .attr('r', 5)
      .attr('fill', colors[1])
      .on('mouseover', function f1(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('r', 10);
        const xPosition = parseFloat(d.x) - 185;
        const yPosition = parseFloat(d.y) - 100;
        const f = d3.format('.1f');
        svg.append('text')
          .attr('id', 'tooltip')
          .attr('x', xPosition)
          .attr('y', yPosition)
          .attr('text-anchor', 'middle')
          .attr('font-size', '15px')
          .attr('fill', 'white')
          .text(`${f(i.y18 * 100)}%`);
      })
      .on('mouseout', function f2(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('r', 5);
        d3.select('#tooltip').remove();
      });
  };

  category[7].onclick = function food() { // food sufficiency
    d3.selectAll('path.linechart').remove();
    d3.selectAll('circle.linechart').remove();
    d3.selectAll('circle.legend').remove();
    d3.selectAll('text.legend').remove();

    const listlabels = ['Enough food', 'Almost enough food', 'Sometimes not enough to eat', 'Often not enough to eat'];
    drawLegend(listlabels);

    svg.append('path')
      .datum(dataset)
      .attr('class', 'linechart')
      .attr('fill', 'none')
      .attr('stroke', colors[0])
      .attr('stroke-width', 1.5)
      .attr('d', d3.line()
        .x((d) => xScale(d.month) + 40)
        .y((d) => yScale(d.food * 100)));

    svg.selectAll()
      .data(dataset)
      .enter()
      .append('circle')
      .attr('class', 'linechart')
      .attr('cx', (d) => xScale(d.month) + 40)
      .attr('cy', (d) => yScale(d.food * 100))
      .attr('r', 5)
      .attr('fill', colors[0])
      .on('mouseover', function f1(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('r', 10);
        const xPosition = parseFloat(d.x) - 185;
        const yPosition = parseFloat(d.y) - 100;
        const f = d3.format('.1f');
        svg.append('text')
          .attr('id', 'tooltip')
          .attr('x', xPosition)
          .attr('y', yPosition)
          .attr('text-anchor', 'middle')
          .attr('font-size', '15px')
          .attr('fill', 'white')
          .text(`${f(i.y18 * 100)}%`);
      })
      .on('mouseout', function f2(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('r', 5);
        d3.select('#tooltip').remove();
      });

    svg.append('path')
      .datum(dataset)
      .attr('class', 'linechart')
      .attr('fill', 'none')
      .attr('stroke', colors[1])
      .attr('stroke-width', 1.5)
      .attr('d', d3.line()
        .x((d) => xScale(d.month) + 40)
        .y((d) => yScale(d.okfood * 100)));

    svg.selectAll()
      .data(dataset)
      .enter()
      .append('circle')
      .attr('class', 'linechart')
      .attr('cx', (d) => xScale(d.month) + 40)
      .attr('cy', (d) => yScale(d.okfood * 100))
      .attr('r', 5)
      .attr('fill', colors[1])
      .on('mouseover', function f1(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('r', 10);
        const xPosition = parseFloat(d.x) - 185;
        const yPosition = parseFloat(d.y) - 100;
        const f = d3.format('.1f');
        svg.append('text')
          .attr('id', 'tooltip')
          .attr('x', xPosition)
          .attr('y', yPosition)
          .attr('text-anchor', 'middle')
          .attr('font-size', '15px')
          .attr('fill', 'white')
          .text(`${f(i.y18 * 100)}%`);
      })
      .on('mouseout', function f2(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('r', 5);
        d3.select('#tooltip').remove();
      });

    svg.append('path')
      .datum(dataset)
      .attr('class', 'linechart')
      .attr('fill', 'none')
      .attr('stroke', colors[2])
      .attr('stroke-width', 1.5)
      .attr('d', d3.line()
        .x((d) => xScale(d.month) + 40)
        .y((d) => yScale(d.sometimes * 100)));

    svg.selectAll()
      .data(dataset)
      .enter()
      .append('circle')
      .attr('class', 'linechart')
      .attr('cx', (d) => xScale(d.month) + 40)
      .attr('cy', (d) => yScale(d.sometimes * 100))
      .attr('r', 5)
      .attr('fill', colors[2])
      .on('mouseover', function f1(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('r', 10);
        const xPosition = parseFloat(d.x) - 185;
        const yPosition = parseFloat(d.y) - 100;
        const f = d3.format('.1f');
        svg.append('text')
          .attr('id', 'tooltip')
          .attr('x', xPosition)
          .attr('y', yPosition)
          .attr('text-anchor', 'middle')
          .attr('font-size', '15px')
          .attr('fill', 'white')
          .text(`${f(i.y18 * 100)}%`);
      })
      .on('mouseout', function f2(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('r', 5);
        d3.select('#tooltip').remove();
      });

    svg.append('path')
      .datum(dataset)
      .attr('class', 'linechart')
      .attr('fill', 'none')
      .attr('stroke', colors[3])
      .attr('stroke-width', 1.5)
      .attr('d', d3.line()
        .x((d) => xScale(d.month) + 40)
        .y((d) => yScale(d.nofood * 100)));

    svg.selectAll()
      .data(dataset)
      .enter()
      .append('circle')
      .attr('class', 'linechart')
      .attr('cx', (d) => xScale(d.month) + 40)
      .attr('cy', (d) => yScale(d.nofood * 100))
      .attr('r', 5)
      .attr('fill', colors[3])
      .on('mouseover', function f1(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('r', 10);
        const xPosition = parseFloat(d.x) - 185;
        const yPosition = parseFloat(d.y) - 100;
        const f = d3.format('.1f');
        svg.append('text')
          .attr('id', 'tooltip')
          .attr('x', xPosition)
          .attr('y', yPosition)
          .attr('text-anchor', 'middle')
          .attr('font-size', '15px')
          .attr('fill', 'white')
          .text(`${f(i.y18 * 100)}%`);
      })
      .on('mouseout', function f2(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('r', 5);
        d3.select('#tooltip').remove();
      });
  };

  category[8].onclick = function income() { // household income
    d3.selectAll('path.linechart').remove();
    d3.selectAll('circle.linechart').remove();
    d3.selectAll('circle.legend').remove();
    d3.selectAll('text.legend').remove();

    const listlabels = ['Less than $25,000', '$50,000', '$100,000', '$150,000', '$200,000'];
    drawLegend(listlabels);

    svg.append('path')
      .datum(dataset)
      .attr('class', 'linechart')
      .attr('fill', 'none')
      .attr('stroke', colors[0])
      .attr('stroke-width', 1.5)
      .attr('d', d3.line()
        .x((d) => xScale(d.month) + 40)
        .y((d) => yScale(d.k25 * 100)));

    svg.selectAll()
      .data(dataset)
      .enter()
      .append('circle')
      .attr('class', 'linechart')
      .attr('cx', (d) => xScale(d.month) + 40)
      .attr('cy', (d) => yScale(d.k25 * 100))
      .attr('r', 5)
      .attr('fill', colors[0])
      .on('mouseover', function f1(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('r', 10);
        const xPosition = parseFloat(d.x) - 185;
        const yPosition = parseFloat(d.y) - 100;
        const f = d3.format('.1f');
        svg.append('text')
          .attr('id', 'tooltip')
          .attr('x', xPosition)
          .attr('y', yPosition)
          .attr('text-anchor', 'middle')
          .attr('font-size', '15px')
          .attr('fill', 'white')
          .text(`${f(i.y18 * 100)}%`);
      })
      .on('mouseout', function f2(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('r', 5);
        d3.select('#tooltip').remove();
      });

    svg.append('path')
      .datum(dataset)
      .attr('class', 'linechart')
      .attr('fill', 'none')
      .attr('stroke', colors[1])
      .attr('stroke-width', 1.5)
      .attr('d', d3.line()
        .x((d) => xScale(d.month) + 40)
        .y((d) => yScale(d.k50 * 100)));

    svg.selectAll()
      .data(dataset)
      .enter()
      .append('circle')
      .attr('class', 'linechart')
      .attr('cx', (d) => xScale(d.month) + 40)
      .attr('cy', (d) => yScale(d.k50 * 100))
      .attr('r', 5)
      .attr('fill', colors[1])
      .on('mouseover', function f1(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('r', 10);
        const xPosition = parseFloat(d.x) - 185;
        const yPosition = parseFloat(d.y) - 100;
        const f = d3.format('.1f');
        svg.append('text')
          .attr('id', 'tooltip')
          .attr('x', xPosition)
          .attr('y', yPosition)
          .attr('text-anchor', 'middle')
          .attr('font-size', '15px')
          .attr('fill', 'white')
          .text(`${f(i.y18 * 100)}%`);
      })
      .on('mouseout', function f2(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('r', 5);
        d3.select('#tooltip').remove();
      });

    svg.append('path')
      .datum(dataset)
      .attr('class', 'linechart')
      .attr('fill', 'none')
      .attr('stroke', colors[2])
      .attr('stroke-width', 1.5)
      .attr('d', d3.line()
        .x((d) => xScale(d.month) + 40)
        .y((d) => yScale(d.k100 * 100)));

    svg.selectAll()
      .data(dataset)
      .enter()
      .append('circle')
      .attr('class', 'linechart')
      .attr('cx', (d) => xScale(d.month) + 40)
      .attr('cy', (d) => yScale(d.k100 * 100))
      .attr('r', 5)
      .attr('fill', colors[2])
      .on('mouseover', function f1(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('r', 10);
        const xPosition = parseFloat(d.x) - 185;
        const yPosition = parseFloat(d.y) - 100;
        const f = d3.format('.1f');
        svg.append('text')
          .attr('id', 'tooltip')
          .attr('x', xPosition)
          .attr('y', yPosition)
          .attr('text-anchor', 'middle')
          .attr('font-size', '15px')
          .attr('fill', 'white')
          .text(`${f(i.y18 * 100)}%`);
      })
      .on('mouseout', function f2(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('r', 5);
        d3.select('#tooltip').remove();
      });

    svg.append('path')
      .datum(dataset)
      .attr('class', 'linechart')
      .attr('fill', 'none')
      .attr('stroke', colors[3])
      .attr('stroke-width', 1.5)
      .attr('d', d3.line()
        .x((d) => xScale(d.month) + 40)
        .y((d) => yScale(d.k150 * 100)));

    svg.selectAll()
      .data(dataset)
      .enter()
      .append('circle')
      .attr('class', 'linechart')
      .attr('cx', (d) => xScale(d.month) + 40)
      .attr('cy', (d) => yScale(d.k150 * 100))
      .attr('r', 5)
      .attr('fill', colors[3])
      .on('mouseover', function f1(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('r', 10);
        const xPosition = parseFloat(d.x) - 185;
        const yPosition = parseFloat(d.y) - 100;
        const f = d3.format('.1f');
        svg.append('text')
          .attr('id', 'tooltip')
          .attr('x', xPosition)
          .attr('y', yPosition)
          .attr('text-anchor', 'middle')
          .attr('font-size', '15px')
          .attr('fill', 'white')
          .text(`${f(i.y18 * 100)}%`);
      })
      .on('mouseout', function f2(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('r', 5);
        d3.select('#tooltip').remove();
      });

    svg.append('path')
      .datum(dataset)
      .attr('class', 'linechart')
      .attr('fill', 'none')
      .attr('stroke', colors[4])
      .attr('stroke-width', 1.5)
      .attr('d', d3.line()
        .x((d) => xScale(d.month) + 40)
        .y((d) => yScale(d.k200 * 100)));

    svg.selectAll()
      .data(dataset)
      .enter()
      .append('circle')
      .attr('class', 'linechart')
      .attr('cx', (d) => xScale(d.month) + 40)
      .attr('cy', (d) => yScale(d.k200 * 100))
      .attr('r', 5)
      .attr('fill', colors[4])
      .on('mouseover', function f1(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('r', 10);
        const xPosition = parseFloat(d.x) - 185;
        const yPosition = parseFloat(d.y) - 100;
        const f = d3.format('.1f');
        svg.append('text')
          .attr('id', 'tooltip')
          .attr('x', xPosition)
          .attr('y', yPosition)
          .attr('text-anchor', 'middle')
          .attr('font-size', '15px')
          .attr('fill', 'white')
          .text(`${f(i.y18 * 100)}%`);
      })
      .on('mouseout', function f2(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('r', 5);
        d3.select('#tooltip').remove();
      });
  };
});

// Graph #3
// https://gist.github.com/threestory/ed0f322d7bb2e3be8ded#file-cb_2014_us_county_5m-json
// https://data.ca.gov/en/dataset/county-and-zip-code-references/resource/9ca5c737-f08e-46a6-8198-a002483da4e0
// https://www.ers.usda.gov/data-products/county-level-data-sets/download-data/
d3.csv('finalcensus.csv', d3.autoType).then((dataset) => {
  const svg3 = d3.select('#graph3')
    .attr('width', 700)
    .attr('height', 700)
    .attr('transform', 'rotate(-12 0 0)');

  const margin = 40;
  const w = svg3.attr('width') - (margin * 2);
  const h = svg3.attr('height') - (margin * 2);

  const svg = svg3.append('g')
    .attr('transform', `translate(${margin * 1.5}, ${margin})`);

  // Axis Labels
  // Title
  svg.append('text')
    .attr('x', 200)
    .attr('y', -40)
    .attr('text-anchor', 'middle')
    .attr('font-weight', '400')
    .attr('fill', 'white')
    .text('Map of California Divided by County')
    .attr('transform', 'rotate(12 0 0)');

  const projection = d3.geoAlbersUsa()
    .translate([w + 500, h - 220])
    .scale([2800]);

  const path = d3.geoPath()
    .projection(projection);

  const color = d3.scaleLinear()
    .domain([39, 83])
    .range(['lightblue', 'steelblue']);

  d3.csv('county.csv', d3.autoType).then((data) => {
    // From Data Vis Assignment #5
    d3.json('cb_2014_us_county_5m.json').then((json) => {
      d3.csv('household_income.csv', d3.autoType).then((incomedata) => {
        for (let i = 0; i < data.length; i += 1) {
          const dataState = data[i].county;
          const dataValue = parseFloat(data[i].value);
          const dataCovid = data[i].covid;
          const dataIncome = incomedata[i].value;

          for (let j = 0; j < json.features.length; j += 1) {
            const jsonState = json.features[j].properties.NAME;

            if (dataState === jsonState) {
              // eslint-disable-next-line no-param-reassign
              json.features[j].properties.value = dataValue;
              // eslint-disable-next-line no-param-reassign
              json.features[j].properties.covid = dataCovid;
              // eslint-disable-next-line no-param-reassign
              json.features[j].properties.income = dataIncome;

              break;
            }
          }
        }

        const tooltip = d3.select('#tool1')
          .data(json.features)
          .attr('id', 'tooltip1')
          .attr('style', 'position: absolute; opacity: 0;')
          .style('width', '300px')
          .style('height', '30px')
          .append('text')
          .style('font-weight', '500')
          .style('font-size', '25px');

        const toolgraph = d3.select('#toolgraph')
          .attr('width', 600)
          .attr('height', 100);

        svg.selectAll('path')
          .data(json.features)
          .enter()
          .append('path')
          .attr('d', path)
          .style('fill', (d) => {
            const { value } = d.properties;
            if (value) {
              return color(value);
            }
            return 'lightblue';
          })
          .on('mouseover', function f1(d, i) {
            d3.select(this).transition()
              .duration('50')
              .attr('opacity', '.5');
            d3.select('#tooltip1').style('opacity', 1)
              .selectAll('text')
              .text(`${i.properties.NAME} County`);
            d3.selectAll('rect.toolrect').remove();
            d3.select('#toolgraph')
              .append('text')
              .attr('x', 100)
              .attr('y', 20)
              .attr('font-size', '15px')
              .attr('text-anchor', 'middle')
              .attr('fill', 'white')
              .text('Broadband Subscription Rate');

            d3.select('#toolgraph')
              .append('text')
              .attr('x', 100)
              .attr('y', 40)
              .attr('font-size', '15px')
              .attr('text-anchor', 'middle')
              .attr('fill', 'white')
              .text('Covid Cases per 1M');

            d3.select('#toolgraph')
              .append('text')
              .attr('x', 100)
              .attr('y', 60)
              .attr('font-size', '15px')
              .attr('text-anchor', 'middle')
              .attr('fill', 'white')
              .text('Median Household Income');

            d3.select('#toolgraph')
              .style('opacity', 1)
              .append('rect')
              .attr('class', 'toolrect')
              .attr('x', 220)
              .attr('y', 8)
              .attr('height', 20)
              .attr('width', i.properties.value * 2)
              .attr('fill', colors[0]);

            d3.select('#toolgraph')
              .append('rect')
              .attr('class', 'toolrect')
              .attr('x', 220)
              .attr('y', 28)
              .attr('height', 20)
              .attr('width', i.properties.covid / 100)
              .attr('fill', colors[1]);

            d3.select('#toolgraph')
              .append('rect')
              .attr('class', 'toolrect')
              .attr('x', 220)
              .attr('y', 48)
              .attr('height', 20)
              .attr('width', i.properties.income * 2)
              .attr('fill', colors[2]);
          })
          .on('mouseout', function f2(d, i) {
            d3.select(this).transition()
              .duration('50')
              .attr('opacity', '1');
            d3.select('#tooltip1').style('opacity', 0);
            d3.select('#toolgraph').style('opacity', 0);
          });

        // Load in centroids data
        d3.csv('country_centroids.csv', d3.autoType).then((countydata) => {
          svg.selectAll('circle')
            .data(countydata)
            .enter()
            .append('circle')
            .attr('cx', (d) => projection([d.long, d.lat])[0])
            .attr('cy', (d) => projection([d.long, d.lat])[1])
            .attr('r', 5)
            .style('fill', 'orange')
            .style('stroke', 'gray')
            .style('stroke-width', 0.25)
            .style('opacity', 0.75);
        });

        d3.csv('household_income.csv', d3.autoType).then((datas) => {
        // Set input domain for color scale
          svg.selectAll('circle')
            .data(datas)
            .attr('r', (d) => (d.value / 100) * 10);
        });
      });
    });
  });

  // Legend
  svg.append('circle').attr('cx', 430).attr('cy', 50).attr('r', 8)
    .attr('class', 'legend')
    .style('fill', '#98abc5')
    .attr('transform', 'rotate(12 0 0)');

  svg.append('text').attr('x', 450).attr('y', 50).text('Broadband Subscription Rate')
    .attr('class', 'legend')
    .style('font-size', '15px')
    .attr('fill', 'white')
    .attr('alignment-baseline', 'middle')
    .attr('transform', 'rotate(12 0 0)');

  svg.append('circle').attr('cx', 430).attr('cy', 80).attr('r', 8)
    .attr('class', 'legend')
    .style('fill', 'orange')
    .attr('transform', 'rotate(12 0 0)');

  svg.append('text').attr('x', 450).attr('y', 80).text('Median Household Income')
    .attr('class', 'legend')
    .style('font-size', '15px')
    .attr('fill', 'white')
    .attr('alignment-baseline', 'middle')
    .attr('transform', 'rotate(12 0 0)');
});

// Graph #4
// https://statisticalatlas.com/neighborhood/California/San-Francisco/Pacific-Heights/Household-Income
// https://gist.github.com/cdolek/d08cac2fa3f6338d84ea#file-sanfrancisco-neighborhoods-json
// https://sfgov.org/sfc/sites/default/files/San%20Francisco%20WiFi/Free%20Wi-Fi%20Site%20List_30sept2014v3.pdf
d3.csv('visual1a.csv', d3.autoType).then((data) => {
  const svg3 = d3.select('#graph4')
    .attr('width', 600)
    .attr('height', 600);

  const margin = 90;
  const w = svg3.attr('width') - (margin * 2);
  const h = svg3.attr('height') - (margin * 2);

  const svg = svg3.append('g')
    .attr('transform', `translate(${margin * 1.5}, ${margin})`);

  // Axis Labels
  // Title
  svg.append('text')
    .attr('x', w / 2)
    .attr('y', -40)
    .attr('text-anchor', 'middle')
    .attr('font-weight', '400')
    .attr('fill', 'white')
    .text('Map of Wifi Hotspots in San Francisco Neighborhoods');

  // Legend
  svg.append('circle').attr('cx', 20).attr('cy', 420).attr('r', 6)
    .style('fill', 'lightblue');
  svg.append('text').attr('x', 40).attr('y', 420).text('Median Household Income')
    .style('font-size', '15px')
    .attr('fill', 'white')
    .attr('alignment-baseline', 'middle');

  const color = d3.scaleLinear()
    .domain([20000, 120000])
    .range(['lightblue', 'steelblue']);

  d3.csv('sf_income.csv', d3.autoType).then((incomedata) => {
    d3.json('sf.json').then((json) => {
      for (let i = 0; i < incomedata.length; i += 1) {
        const dataState = incomedata[i].name;
        const dataValue = parseFloat(incomedata[i].value);
        const dataEmployment = parseFloat(incomedata[i].employment);

        for (let j = 0; j < json.features.length; j += 1) {
          const jsonState = json.features[j].properties.neighborhood;

          if (dataState === jsonState) {
            // eslint-disable-next-line no-param-reassign
            json.features[j].properties.value = dataValue;
            // eslint-disable-next-line no-param-reassign
            json.features[j].properties.employment = dataEmployment;

            break;
          }
        }
      }

      const projection = d3.geoAlbersUsa()
        .fitExtent([[20, 20], [w, h]], json);

      const path = d3.geoPath()
        .projection(projection);

      const tooltip = d3.select('#tool2')
        .data(json.features)
        .attr('id', 'tooltip2')
        .attr('style', 'opacity: 0;')
        .append('text')
        .style('font-weight', '500')
        .style('font-size', '25px');

      const tooltippark = d3.select('#toolpark')
        .data(json.features)
        .attr('id', 'tooltippark')
        .attr('style', 'opacity: 0;')
        .append('text')
        .style('font-weight', '500')
        .style('font-size', '25px')
        .style('color', '#ff9694');

      const toolgraph2 = d3.select('#toolgraph2')
        .attr('width', 600)
        .attr('height', 100);

      svg.selectAll('path')
        .data(json.features)
        .enter()
        .append('path')
        .attr('d', path)
        .style('fill', (d) => {
          const { value } = d.properties;
          if (value) {
            return color(value);
          }
          return 'lightblue';
        })
        .on('mouseover', function f1(d, i) {
          d3.select(this).transition()
            .duration('50')
            .attr('opacity', '.5');
          d3.select('#tooltip2').style('opacity', 1).selectAll('text').text(`Neighborhood: ${i.properties.neighborhood}`);
          d3.selectAll('rect.toolr').remove();
          d3.select('#toolgraph2')
            .append('text')
            .attr('x', 100)
            .attr('y', 20)
            .attr('font-size', '15px')
            .attr('text-anchor', 'middle')
            .attr('fill', 'white')
            .text('Unemployment Rate');
          d3.select('#toolgraph2')
            .append('text')
            .attr('x', 100)
            .attr('y', 40)
            .attr('font-size', '15px')
            .attr('text-anchor', 'middle')
            .attr('fill', 'white')
            .text('Median Household Income');
          d3.select('#toolgraph2')
            .style('opacity', 1)
            .append('rect')
            .attr('class', 'toolr')
            .attr('x', 220)
            .attr('y', 8)
            .attr('height', 20)
            .attr('width', i.properties.employment * 2)
            .attr('fill', colors[0]);
          d3.select('#toolgraph2')
            .append('rect')
            .attr('class', 'toolr')
            .attr('x', 220)
            .attr('y', 28)
            .attr('height', 20)
            .attr('width', i.properties.value / 1000)
            .attr('fill', colors[1]);
        })
        .on('mouseout', function f2(d, i) {
          d3.select(this).transition()
            .duration('50')
            .attr('opacity', '1');
          d3.select('#tooltip2').style('opacity', 0);
          d3.select('#toolgraph2').style('opacity', 0);
        });

      d3.csv('sfparks.csv', d3.autoType).then((parkdata) => {
        svg.selectAll()
          .data(parkdata)
          .enter()
          .append('image')
          .attr('class', 'mark')
          .attr('width', 20)
          .attr('height', 20)
          .attr('xlink:href', 'parkicon.png')
          .attr('transform', (d) => `translate(${projection([d.long, d.lat])})`)
          .on('mouseover', function f1(d, i) {
            d3.select(this).transition()
              .duration('50')
              .attr('opacity', '.5');
            d3.select('#tooltippark').style('opacity', 1).selectAll('text').text(`WiFi Spot: ${i.park}`);
          })
          .on('mouseout', function f2(d, i) {
            d3.select(this).transition()
              .duration('50')
              .attr('opacity', '1');
            d3.select('#tooltippark').style('opacity', 0);
          });
      });
    });
  });
});
